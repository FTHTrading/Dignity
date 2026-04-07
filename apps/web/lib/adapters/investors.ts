export function getDemoPortfolio(investorId: string) {
  return {
    investorId,
    holdingsDigau: 1_200,
    holdingValueUsd: 74_880,
    navPerToken: 62.4,
    pendingSubscriptions: 300,
    pendingRedemptions: 0,
    kycTier: "KYC_FULL",
    investedUsd: 70_000,
    unrealizedPnlUsd: 4_880,
    unrealizedPnlPct: 6.97,
  };
}

export function getDemoInvestorList() {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `inv-${String(i + 1).padStart(3, "0")}`,
    name: `Investor ${i + 1}`,
    email: `investor${i + 1}@example.com`,
    kycStatus: i < 6 ? "APPROVED" : i === 6 ? "PENDING" : "REJECTED",
    holdingsDigau: Math.round(Math.random() * 5000),
    jurisdiction: ["US", "UK", "SG", "CH", "CA", "AU"][i % 6],
    enrolledAt: new Date(Date.now() - (i + 1) * 30 * 86400_000).toISOString(),
  }));
}
