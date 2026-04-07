// @dignity/token-engine — subscription issuance service

import { prisma } from "@dignity/db";
import { TransferRuleEngine } from "@dignity/compliance-engine";
import type { IssuanceResult } from "./types";

export class IssuanceService {
  /**
   * Evaluates and approves a subscription issuance request.
   * On approval, transitions the request status to APPROVED and
   * queues a mint operation.
   */
  static async process(subscriptionId: string): Promise<IssuanceResult> {
    const sub = await prisma.subscriptionRequest.findUniqueOrThrow({
      where: { id: subscriptionId },
      include: {
        investor: true,
        security: { include: { program: true } },
      },
    });

    if (sub.status !== "SUBMITTED") {
      return {
        subscriptionId,
        approved: false,
        tokensToMint: 0,
        blockedReasons: [`Invalid status transition from ${sub.status}`],
      };
    }

    const evaluation = await TransferRuleEngine.evaluate({
      investorProfileId: sub.investorId,
      jurisdiction: sub.investor.countryCode,
      requestType: "SUBSCRIPTION",
      quantity: parseFloat(sub.tokenAmount),
      tokenSymbol: sub.security.symbol,
    });

    if (evaluation.allowed === "BLOCKED") {
      await prisma.subscriptionRequest.update({
        where: { id: subscriptionId },
        data: { status: "REJECTED" },
      });
      return {
        subscriptionId,
        approved: false,
        tokensToMint: 0,
        blockedReasons: evaluation.blockedReasons,
      };
    }

    const newStatus =
      evaluation.allowed === "REQUIRES_APPROVAL" ? "PENDING_KYC" : "APPROVED";

    await prisma.subscriptionRequest.update({
      where: { id: subscriptionId },
      data: { status: newStatus, approvedAt: newStatus === "APPROVED" ? new Date() : null },
    });

    return {
      subscriptionId,
      approved: newStatus === "APPROVED",
      tokensToMint: newStatus === "APPROVED" ? parseFloat(sub.tokenAmount) : 0,
      blockedReasons: [],
    };
  }
}
