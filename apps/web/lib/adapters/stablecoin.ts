// Demo adapter for stablecoin rail UI

export interface RailHealthData {
  asset: "USDC" | "USDT";
  chain: string;
  status: "HEALTHY" | "DEGRADED" | "OFFLINE";
  latencyMs?: number;
  lastCheckedAt: string;
  notes?: string;
}

export interface StablecoinPriceData {
  asset: "USDC" | "USDT";
  priceUsd: number;
  deviationBps: number;
  isAnomalous: boolean;
}

export interface PendingSettlementData {
  id: string;
  type: "REDEMPTION" | "MM_RELOAD" | "SUBSCRIPTION_REFUND";
  referenceId: string;
  asset: "USDC" | "USDT";
  chain: string;
  toAddress: string;
  amountHuman: string;
  status: "PENDING" | "CONFIRMED" | "FAILED" | "EXPIRED";
  initiatedAt: string;
}

export interface StablecoinAdminData {
  railHealth: RailHealthData[];
  prices: StablecoinPriceData[];
  pendingSettlements: PendingSettlementData[];
  totalPendingUsd: number;
  allRailsHealthy: boolean;
  dataSource: "DEMO" | "LIVE";
}

export function getDemoStablecoinAdmin(): StablecoinAdminData {
  const now = new Date().toISOString();

  const railHealth: RailHealthData[] = [
    { asset: "USDC", chain: "ethereum", status: "HEALTHY", latencyMs: 120, lastCheckedAt: now },
    { asset: "USDC", chain: "polygon", status: "HEALTHY", latencyMs: 45, lastCheckedAt: now },
    { asset: "USDC", chain: "base", status: "HEALTHY", latencyMs: 28, lastCheckedAt: now },
    { asset: "USDC", chain: "solana", status: "HEALTHY", latencyMs: 15, lastCheckedAt: now },
    { asset: "USDT", chain: "ethereum", status: "HEALTHY", latencyMs: 118, lastCheckedAt: now },
    { asset: "USDT", chain: "polygon", status: "HEALTHY", latencyMs: 42, lastCheckedAt: now },
    { asset: "USDT", chain: "tron", status: "DEGRADED", lastCheckedAt: now, notes: "TronGrid latency elevated" },
  ];

  const prices: StablecoinPriceData[] = [
    { asset: "USDC", priceUsd: 1.0001, deviationBps: 1, isAnomalous: false },
    { asset: "USDT", priceUsd: 0.9998, deviationBps: 2, isAnomalous: false },
  ];

  const pendingSettlements: PendingSettlementData[] = [
    {
      id: "settle-001",
      type: "REDEMPTION",
      referenceId: "redemp-7a8b9c",
      asset: "USDC",
      chain: "ethereum",
      toAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      amountHuman: "12500.00",
      status: "PENDING",
      initiatedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    },
    {
      id: "settle-002",
      type: "MM_RELOAD",
      referenceId: "mm-reload-001",
      asset: "USDC",
      chain: "polygon",
      toAddress: "0x23618e0d4d3bF4Df4eC6E6B14Ef11f9B3B2e2aA",
      amountHuman: "50000.00",
      status: "CONFIRMED",
      initiatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const pending = pendingSettlements.filter((s) => s.status === "PENDING");
  const totalPendingUsd = pending.reduce((s, o) => s + parseFloat(o.amountHuman), 0);
  const allRailsHealthy = railHealth.every((r) => r.status === "HEALTHY");

  return { railHealth, prices, pendingSettlements, totalPendingUsd, allRailsHealthy, dataSource: "DEMO" };
}
