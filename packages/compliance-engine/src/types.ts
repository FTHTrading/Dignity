// @dignity/compliance-engine — shared types

export interface KycCheckResult {
  investorId: string;
  passed: boolean;
  status: string;
  reason?: string;
  checkedAt: Date;
}

export type TransferAllowed = "ALLOWED" | "BLOCKED" | "REQUIRES_APPROVAL";

export interface TransferEvaluation {
  allowed: TransferAllowed;
  blockedReasons: string[];
  lockupExpiry?: Date;
  requiresManualApproval: boolean;
}
