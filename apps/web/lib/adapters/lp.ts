// Demo adapter for LP / liquidity dashboard UI

export interface MmInventoryData {
  mmId: string;
  mmName: string;
  asset: string;
  chain: string;
  inventoryUsd: number;
  thresholdUsd: number;
  belowThreshold: boolean;
  lastUpdated: string;
}

export interface OtcQuoteData {
  id: string;
  direction: "BUY" | "SELL";
  tokenSymbol: string;
  tokenQty: number;
  pricePerToken: number;
  totalValueUsd: number;
  stablecoinAsset: string;
  requestedBy: string;
  status: "OPEN" | "FILLED" | "EXPIRED" | "CANCELLED";
  expiresAt: string;
  createdAt: string;
}

export interface LpDashboardData {
  mmInventory: MmInventoryData[];
  otcQuotes: OtcQuoteData[];
  totalMmInventoryUsd: number;
  activeMms: number;
  openOtcQuotes: number;
  circuitBreakerActive: boolean;
  navReference: number;
  bestBid: number;
  bestAsk: number;
  spreadBps: number;
  dataSource: "DEMO" | "LIVE";
}

export function getDemoLpDashboard(): LpDashboardData {
  const now = new Date().toISOString();

  const mmInventory: MmInventoryData[] = [
    {
      mmId: "mm-001",
      mmName: "Institutional MM Alpha",
      asset: "USDC",
      chain: "ethereum",
      inventoryUsd: 350_000,
      thresholdUsd: 200_000,
      belowThreshold: false,
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      mmId: "mm-001",
      mmName: "Institutional MM Alpha",
      asset: "USDC",
      chain: "polygon",
      inventoryUsd: 75_000,
      thresholdUsd: 100_000,
      belowThreshold: true,
      lastUpdated: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    },
    {
      mmId: "mm-002",
      mmName: "Digital Asset Partners",
      asset: "USDT",
      chain: "ethereum",
      inventoryUsd: 180_000,
      thresholdUsd: 100_000,
      belowThreshold: false,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ];

  const otcQuotes: OtcQuoteData[] = [
    {
      id: "otc-001",
      direction: "BUY",
      tokenSymbol: "DIGAU",
      tokenQty: 500,
      pricePerToken: 62.1,
      totalValueUsd: 31_050,
      stablecoinAsset: "USDC",
      requestedBy: "inv-0041",
      status: "OPEN",
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
    {
      id: "otc-002",
      direction: "SELL",
      tokenSymbol: "DIGAU",
      tokenQty: 1200,
      pricePerToken: 62.6,
      totalValueUsd: 75_120,
      stablecoinAsset: "USDC",
      requestedBy: "inv-0012",
      status: "FILLED",
      expiresAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const totalMmInventoryUsd = mmInventory.reduce((s, m) => s + m.inventoryUsd, 0);
  const openOtcQuotes = otcQuotes.filter((q) => q.status === "OPEN").length;
  const activeMms = new Set(mmInventory.map((m) => m.mmId)).size;

  return {
    mmInventory,
    otcQuotes,
    totalMmInventoryUsd,
    activeMms,
    openOtcQuotes,
    circuitBreakerActive: false,
    navReference: 62.4,
    bestBid: 62.1,
    bestAsk: 62.7,
    spreadBps: 10,
    dataSource: "DEMO",
  };
}
