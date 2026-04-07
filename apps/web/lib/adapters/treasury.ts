export interface TreasurySummaryData {
  totalReserveBalance: number;
  totalOperatingBalance: number;
  totalMmPoolBalance: number;
  totalEscrowBalance: number;
  lastReconciliationAt: string;
  isReconciled: boolean;
}

export function getDemoTreasurySummary(): TreasurySummaryData {
  return {
    totalReserveBalance: 31_200_000,
    totalOperatingBalance: 850_000,
    totalMmPoolBalance: 2_400_000,
    totalEscrowBalance: 380_000,
    lastReconciliationAt: new Date(Date.now() - 3 * 86400_000).toISOString(),
    isReconciled: true,
  };
}

export function getDemoMovements() {
  return [
    { id: "mv-001", type: "RESERVE_CREDIT", amount: 5_000_000, currency: "USD", description: "Q1 reserve contribution", createdAt: new Date(Date.now() - 30 * 86400_000).toISOString() },
    { id: "mv-002", type: "OPERATING_DEBIT", amount: 12_500, currency: "USD", description: "Custody fees — March", createdAt: new Date(Date.now() - 15 * 86400_000).toISOString() },
    { id: "mv-003", type: "MM_POOL_CREDIT", amount: 500_000, currency: "USD", description: "MM pool top-up", createdAt: new Date(Date.now() - 5 * 86400_000).toISOString() },
  ];
}
