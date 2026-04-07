// @dignity/token-engine — redemption service

import { prisma } from "@dignity/db";
import { TransferRuleEngine } from "@dignity/compliance-engine";
import type { RedemptionResult } from "./types";

export class RedemptionService {
  static async process(redemptionId: string): Promise<RedemptionResult> {
    const redeem = await prisma.redemptionRequest.findUniqueOrThrow({
      where: { id: redemptionId },
      include: {
        investor: true,
        security: true,
      },
    });

    if (redeem.status !== "REQUESTED") {
      return {
        redemptionId,
        approved: false,
        tokensToBurn: 0,
        blockedReasons: [`Invalid status transition from ${redeem.status}`],
      };
    }

    const evaluation = await TransferRuleEngine.evaluate({
      investorProfileId: redeem.investorId,
      jurisdiction: redeem.investor.countryCode,
      requestType: "REDEMPTION",
      quantity: parseFloat(redeem.tokenAmount),
      tokenSymbol: redeem.security.symbol,
    });

    if (evaluation.allowed === "BLOCKED") {
      await prisma.redemptionRequest.update({
        where: { id: redemptionId },
        data: { status: "REJECTED" },
      });
      return {
        redemptionId,
        approved: false,
        tokensToBurn: 0,
        blockedReasons: evaluation.blockedReasons,
      };
    }

    const newStatus =
      evaluation.allowed === "REQUIRES_APPROVAL" ? "PENDING_APPROVAL" : "APPROVED";

    await prisma.redemptionRequest.update({
      where: { id: redemptionId },
      data: { status: newStatus, approvedAt: newStatus === "APPROVED" ? new Date() : null },
    });

    return {
      redemptionId,
      approved: newStatus === "APPROVED",
      tokensToBurn: newStatus === "APPROVED" ? parseFloat(redeem.tokenAmount) : 0,
      blockedReasons: [],
    };
  }
}
