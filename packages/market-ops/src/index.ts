// @dignity/market-ops — venue health, liquidity snapshots, OTC/RFQ, circuit breakers

import { prisma } from "@dignity/db";
import type { ILiquiditySummary } from "@dignity/shared-types";

export class MarketOpsService {
  /** Returns a rich liquidity summary for a token. */
  static async getLiquiditySummary(tokenSymbol: string): Promise<ILiquiditySummary> {
    const security = await prisma.securityClass.findFirstOrThrow({
      where: { symbol: tokenSymbol },
      include: {
        navHistory: { orderBy: { effectiveDate: "desc" }, take: 1 },
      },
    });

    const nav = security.navHistory[0]?.navPerToken ?? 0;

    const snapshot = await prisma.liquiditySnapshot.findFirst({
      where: { securityId: security.id },
      orderBy: { snapshotAt: "desc" },
    });

    const activeMMs = await prisma.marketMaker.count({ where: { status: "ACTIVE" } });
    const activeVenues = await prisma.venue.count({ where: { status: "ACTIVE" } });

    const anomaly = await prisma.pricingAnomaly.findFirst({
      where: { tokenSymbol, resolvedAt: null },
    });

    const breaker = await prisma.circuitBreakerEvent.findFirst({
      where: { tokenSymbol, resolvedAt: null },
    });

    const latestHealth = await prisma.venueHealth.findFirst({
      orderBy: { checkedAt: "desc" },
    });

    return {
      latestSnapshot: snapshot
        ? {
            id: snapshot.id,
            securityId: snapshot.securityId,
            totalBidDepthUsd: snapshot.totalBidDepthUsd ?? null,
            totalAskDepthUsd: snapshot.totalAskDepthUsd ?? null,
            weightedMid: snapshot.weightedMid ?? null,
            navReference: snapshot.navReference ?? null,
            premiumDiscountBps: snapshot.premiumDiscountBps ?? null,
            activeMMs: snapshot.activeMMs,
            activeVenues: snapshot.activeVenues,
            snapshotAt: snapshot.snapshotAt,
          }
        : null,
      nav,
      activeMMs,
      activeVenues,
      premiumDiscountBps: snapshot?.premiumDiscountBps ?? null,
      spreadBps: latestHealth?.spreadBps ?? null,
      hasAnomaly: !!anomaly,
      hasActiveBreaker: !!breaker,
      dataSource: "LIVE",
      asOf: snapshot?.snapshotAt ?? new Date(),
    };
  }

  /** Polls all active venues and writes VenueHealth rows. */
  static async pollVenueHealth(): Promise<void> {
    const venues = await prisma.venue.findMany({ where: { status: "ACTIVE" } });
    for (const venue of venues) {
      // Production: call venue.endpoint to fetch live metrics
      // Demo: write synthetic health data
      await prisma.venueHealth.create({
        data: {
          venueId: venue.id,
          online: true,
          bidLiquidity: 500_000,
          askLiquidity: 500_000,
          midPrice: 62.4,
          spread: 0.12,
          spreadBps: 19,
          volume24h: 1_200_000,
          latencyMs: 42,
          checkedAt: new Date(),
        },
      });
    }
  }

  /** Triggers a circuit breaker for a token. */
  static async triggerCircuitBreaker(params: {
    tokenSymbol: string;
    trigger: string;
    severity: string;
    notes?: string;
  }): Promise<string> {
    const event = await prisma.circuitBreakerEvent.create({
      data: {
        tokenSymbol: params.tokenSymbol,
        trigger: params.trigger as never,
        severity: params.severity,
        triggeredAt: new Date(),
      },
    });
    return event.id;
  }
}
