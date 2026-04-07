export interface ReserveSummaryData {
  coverageRatio: number;
  totalReserveUsd: number;
  totalIssuedTokens: number;
  navPerToken: number;
  lastAuditDate: string;
  lots: Array<{
    id: string;
    assetType: string;
    units: number;
    unit: string;
    custodian: string;
    latestValuationUsd: number;
    locationCode: string;
  }>;
}

export function getDemoReserveSummary(): ReserveSummaryData {
  return {
    coverageRatio: 1.04,
    totalReserveUsd: 31_200_000,
    totalIssuedTokens: 500_000,
    navPerToken: 62.4,
    lastAuditDate: new Date(Date.now() - 7 * 86400_000).toISOString(),
    lots: [
      { id: "lot-001", assetType: "LBMA_GOLD_BAR", units: 400, unit: "oz", custodian: "Brinks London", latestValuationUsd: 25_600_000, locationCode: "GB-LHR" },
      { id: "lot-002", assetType: "LBMA_GOLD_BAR", units: 37, unit: "kg", custodian: "Malca-Amit Zurich", latestValuationUsd: 5_600_000, locationCode: "CH-ZRH" },
    ],
  };
}
