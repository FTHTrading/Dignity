// @dignity/analytics — dashboard KPI aggregators

import { prisma } from "@dignity/db";

export interface IssuancKpiRow {
  date: string;
  subscriptions: number;
  subscriptionValueUsd: number;
  redemptions: number;
  redemptionValueUsd: number;
}

export class AnalyticsService {
  /** Returns weekly issuance KPIs for the last N weeks. */
  static async getIssuanceTimeSeries(programId: string, weeks = 12): Promise<IssuancKpiRow[]> {
    const securities = await prisma.securityClass.findMany({
      where: { programId },
      select: { id: true },
    });
    const secIds = securities.map((s: { id: string }) => s.id);

    // Aggregate subscriptions by week
    const subs = await prisma.subscriptionRequest.findMany({
      where: { securityId: { in: secIds }, status: "SETTLED" },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true, amountFiat: true },
    });

    const reds = await prisma.redemptionRequest.findMany({
      where: { securityId: { in: secIds }, status: "SETTLED" },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true, actualFiat: true },
    });

    const buckets = new Map<string, IssuancKpiRow>();

    function weekKey(d: Date): string {
      const start = new Date(d);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - start.getDay());
      return start.toISOString().split("T")[0];
    }

    for (const s of subs) {
      const k = weekKey(s.createdAt);
      if (!buckets.has(k)) {
        buckets.set(k, { date: k, subscriptions: 0, subscriptionValueUsd: 0, redemptions: 0, redemptionValueUsd: 0 });
      }
      const b = buckets.get(k)!;
      b.subscriptions++;
      b.subscriptionValueUsd += s.amountFiat ?? 0;
    }

    for (const r of reds) {
      const k = weekKey(r.createdAt);
      if (!buckets.has(k)) {
        buckets.set(k, { date: k, subscriptions: 0, subscriptionValueUsd: 0, redemptions: 0, redemptionValueUsd: 0 });
      }
      const b = buckets.get(k)!;
      b.redemptions++;
      b.redemptionValueUsd += r.actualFiat ?? 0;
    }

    return Array.from(buckets.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-weeks);
  }
}
