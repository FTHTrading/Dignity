// @dignity/shared-types — market-ops interfaces

import type { OtcRfqStatus, CircuitBreakerTrigger } from "../enums";

export interface IVenue {
  id: string;
  name: string;
  venueType: string;
  status: string;
  jurisdiction?: string | null;
  approvedAt?: Date | null;
}

export interface IVenueHealth {
  id: string;
  venueId: string;
  checkedAt: Date;
  online: boolean;
  bidLiquidity?: number | null;
  askLiquidity?: number | null;
  midPrice?: number | null;
  spread?: number | null;
  spreadBps?: number | null;
  volume24h?: number | null;
  latencyMs?: number | null;
}

export interface IMarketMaker {
  id: string;
  name: string;
  entityType?: string | null;
  status: string;
  approvedAt?: Date | null;
}

export interface ILiquiditySnapshot {
  id: string;
  securityId: string;
  totalBidDepthUsd?: number | null;
  totalAskDepthUsd?: number | null;
  weightedMid?: number | null;
  navReference?: number | null;
  premiumDiscountBps?: number | null;
  activeMMs: number;
  activeVenues: number;
  snapshotAt: Date;
}

export interface ILiquiditySummary {
  latestSnapshot?: ILiquiditySnapshot | null;
  nav: number;
  activeMMs: number;
  activeVenues: number;
  premiumDiscountBps?: number | null;
  spreadBps?: number | null;
  hasAnomaly: boolean;
  hasActiveBreaker: boolean;
  dataSource: "DEMO" | "LIVE";
  asOf: Date;
}

export interface IPricingAnomaly {
  id: string;
  tokenSymbol: string;
  anomalyType: string;
  severity: string;
  detectedAt: Date;
  resolvedAt?: Date | null;
  autoResolved: boolean;
}

export interface ICircuitBreakerEvent {
  id: string;
  tokenSymbol: string;
  trigger: CircuitBreakerTrigger;
  severity: string;
  triggeredAt: Date;
  resolvedAt?: Date | null;
  resolution?: string | null;
}

export interface IOtcRfq {
  id: string;
  initiator: string;
  tokenSymbol: string;
  side: "BUY" | "SELL";
  quantity: string;
  status: OtcRfqStatus;
  expiresAt: Date;
  createdAt: Date;
}
