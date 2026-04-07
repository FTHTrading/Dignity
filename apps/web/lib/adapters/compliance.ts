export interface ComplianceSummaryData {
  totalInvestors: number;
  kycApproved: number;
  kycPending: number;
  kycRejected: number;
  openComplianceEvents: number;
  restrictedJurisdictions: string[];
  sanctionsScreeningEnabled: boolean;
  lastScreeningAt: string;
}

export function getDemoComplianceSummary(): ComplianceSummaryData {
  return {
    totalInvestors: 48,
    kycApproved: 41,
    kycPending: 5,
    kycRejected: 2,
    openComplianceEvents: 3,
    restrictedJurisdictions: ["KP", "IR", "CU"],
    sanctionsScreeningEnabled: true,
    lastScreeningAt: new Date(Date.now() - 12 * 3600_000).toISOString(),
  };
}

export function getDemoKycQueue() {
  return [
    { id: "kyc-001", investorRef: "INV-0044", email: "applicant1@example.com", submittedAt: new Date(Date.now() - 2 * 86400_000).toISOString(), tier: "INDIVIDUAL", status: "PENDING" },
    { id: "kyc-002", investorRef: "INV-0045", email: "entity@corpfund.com", submittedAt: new Date(Date.now() - 86400_000).toISOString(), tier: "ENTITY", status: "PENDING" },
  ];
}
