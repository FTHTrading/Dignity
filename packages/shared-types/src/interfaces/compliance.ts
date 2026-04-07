// @dignity/shared-types — compliance interfaces

export interface IJurisdictionRule {
  id: string;
  jurisdiction: string;
  allowed: boolean;
  requiresAccreditation: boolean;
  maxHoldingPct?: number | null;
  lockupDays: number;
  notes?: string | null;
  effectiveFrom: Date;
  effectiveTo?: Date | null;
}

export interface ISanctionsCheck {
  id: string;
  investorProfileId: string;
  source: string;
  status: string;
  matchScore?: number | null;
  checkedAt: Date;
  expiresAt?: Date | null;
  rawResponse?: Record<string, unknown> | null;
}

export interface ITransferApprovalDecision {
  id: string;
  requestId: string;
  requestType: string;
  decidedById?: string | null;
  decision: "APPROVED" | "REJECTED" | "DEFERRED";
  reason?: string | null;
  overrideJustification?: string | null;
  decidedAt: Date;
}

export interface IComplianceEvent {
  id: string;
  investorProfileId: string;
  eventType: string;
  severity: string;
  message: string;
  resolved: boolean;
  resolvedAt?: Date | null;
  createdAt: Date;
}

export interface IComplianceSummary {
  totalInvestors: number;
  kycApproved: number;
  kycPending: number;
  kycFailed: number;
  openComplianceEvents: number;
  restrictedJurisdictions: string[];
  hasActiveSanctionsHit: boolean;
  dataSource: "DEMO" | "LIVE";
  asOf: Date;
}
