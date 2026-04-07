export interface LiquiditySummaryData {
  tokenSymbol: string;
  currentNav: number;
  activeMMs: number;
  activeVenues: number;
  bestBid: number;
  bestAsk: number;
  spreadBps: number;
  hasAnomaly: boolean;
  hasActiveBreaker: boolean;
  dataSource: "DEMO" | "LIVE";
}

export function getDemoLiquiditySummary(): LiquiditySummaryData {
  return {
    tokenSymbol: "DIGAU",
    currentNav: 62.4,
    activeMMs: 2,
    activeVenues: 3,
    bestBid: 62.1,
    bestAsk: 62.7,
    spreadBps: 10,
    hasAnomaly: false,
    hasActiveBreaker: false,
    dataSource: "DEMO",
  };
}

export function getDemoVenues() {
  return [
    { id: "venue-001", name: "InternalOB", type: "INTERNAL_OB", status: "ACTIVE", lastHeartbeat: new Date().toISOString() },
    { id: "venue-002", name: "QuickFX", type: "ECN", status: "ACTIVE", lastHeartbeat: new Date().toISOString() },
    { id: "venue-003", name: "OTC Desk", type: "OTC", status: "ACTIVE", lastHeartbeat: new Date().toISOString() },
  ];
}

export function getDemoMarketMakers() {
  return [
    { id: "mm-001", name: "Alpha Capital MM", status: "ACTIVE", spreadTarget: 15, tier: "PRIMARY" },
    { id: "mm-002", name: "Beta Liquidity", status: "ACTIVE", spreadTarget: 25, tier: "SECONDARY" },
  ];
}
