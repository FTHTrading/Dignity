// @dignity/compliance-engine — transfer rule evaluation engine

import { prisma } from "@dignity/db";
import { KycService } from "./kyc";
import { JurisdictionChecker } from "./jurisdiction";
import type { TransferEvaluation } from "./types";

export class TransferRuleEngine {
  /**
   * Evaluates whether a transfer request should be allowed, blocked,
   * or routed to manual approval.
   */
  static async evaluate(params: {
    investorProfileId: string;
    jurisdiction: string;
    requestType: "SUBSCRIPTION" | "REDEMPTION";
    quantity: number;
    tokenSymbol: string;
  }): Promise<TransferEvaluation> {
    const blocked: string[] = [];
    let requiresManualApproval = false;
    let lockupExpiry: Date | undefined;

    // 1. KYC check
    const kyc = await KycService.isApproved(params.investorProfileId);
    if (!kyc) {
      blocked.push("KYC/KYB not approved");
    }

    // 2. Sanctions check — look for active hits
    const sanctionsHit = await prisma.sanctionsCheck.findFirst({
      where: {
        investorId: params.investorProfileId,
        result: "HIT",
      },
    });
    if (sanctionsHit) {
      blocked.push("Active sanctions match");
    }

    // 3. Jurisdiction check
    const jur = await JurisdictionChecker.check(params.jurisdiction);
    if (!jur.allowed) {
      blocked.push(`Jurisdiction ${params.jurisdiction} is not permitted`);
    } else {
      if (jur.requiresAccreditation) {
        // Check accreditation
        const accrec = await prisma.accreditationRecord.findFirst({
          where: {
            investorId: params.investorProfileId,
            status: "VERIFIED",
            OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
          },
        });
        if (!accrec) {
          blocked.push(`Accreditation required for ${params.jurisdiction}`);
        }
      }
      if (jur.lockupDays > 0) {
        lockupExpiry = new Date(Date.now() + jur.lockupDays * 86_400_000);
      }
    }

    // 4. Active compliance events that haven't been resolved
    const openEvents = await prisma.complianceEvent.count({
      where: {
        investorId: params.investorProfileId,
      },
    });
    if (openEvents > 0) {
      requiresManualApproval = true;
    }

    if (blocked.length > 0) {
      return { allowed: "BLOCKED", blockedReasons: blocked, requiresManualApproval: false };
    }
    if (requiresManualApproval) {
      return { allowed: "REQUIRES_APPROVAL", blockedReasons: [], lockupExpiry, requiresManualApproval: true };
    }
    return { allowed: "ALLOWED", blockedReasons: [], lockupExpiry, requiresManualApproval: false };
  }
}
