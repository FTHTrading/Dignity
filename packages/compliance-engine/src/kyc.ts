// @dignity/compliance-engine — KYC/KYB service

import { prisma } from "@dignity/db";
import type { KycCheckResult } from "./types";

export class KycService {
  /** Returns the current KYC status for an investor profile. */
  static async getStatus(investorProfileId: string): Promise<KycCheckResult> {
    const record = await prisma.kycKybRecord.findFirst({
      where: { investorId: investorProfileId },
      orderBy: { submittedAt: "desc" },
    });

    if (!record) {
      return {
        investorId: investorProfileId,
        passed: false,
        status: "NOT_STARTED",
        reason: "No KYC record found",
        checkedAt: new Date(),
      };
    }

    return {
      investorId: investorProfileId,
      passed: record.status === "APPROVED",
      status: record.status,
      reason: record.rejectionReason ?? undefined,
      checkedAt: record.completedAt ?? record.submittedAt,
    };
  }

  /** Returns true if the investor has passed KYC/KYB. */
  static async isApproved(investorProfileId: string): Promise<boolean> {
    const result = await KycService.getStatus(investorProfileId);
    return result.passed;
  }

  /** Issues a KYC approval directly (admin action — must be logged). */
  static async approve(
    investorProfileId: string,
    _approvedById: string,
    _notes?: string
  ): Promise<void> {
    await prisma.kycKybRecord.updateMany({
      where: { investorId: investorProfileId, status: "PENDING_REVIEW" },
      data: {
        status: "APPROVED",
        completedAt: new Date(),
      },
    });
  }

  /** Rejects a pending KYC record. */
  static async reject(
    investorProfileId: string,
    _reviewedById: string,
    reason: string
  ): Promise<void> {
    await prisma.kycKybRecord.updateMany({
      where: { investorId: investorProfileId, status: "PENDING_REVIEW" },
      data: {
        status: "REJECTED",
        completedAt: new Date(),
        rejectionReason: reason,
      },
    });
  }
}
