// @dignity/reserve-registry — reserve queries, NAV, coverage ratios

import { prisma } from "@dignity/db";

export interface NavSummary {
  securityId: string;
  symbol: string;
  nav: number;
  circulatingSupply: number;
  totalReserveValueUsd: number;
  coverageRatio: number;
  coveragePercent: number;
  dataSource: "LIVE" | "DEMO";
  asOf: Date;
}

export class ReserveRegistry {
  /** Computes live NAV for a security class, based on latest valuation. */
  static async getNavSummary(securityId: string): Promise<NavSummary> {
    const security = await prisma.securityClass.findUniqueOrThrow({
      where: { id: securityId },
      include: {
        navHistory: { orderBy: { effectiveDate: "desc" }, take: 1 },
        program: true,
      },
    });

    const latestNav = security.navHistory[0];

    // Sum reserve values via ReserveAsset → lots + valuations
    const assets = await prisma.reserveAsset.findMany({
      where: { programId: security.programId, active: true },
      include: {
        lots: { where: { status: "ACTIVE" } },
        valuations: { orderBy: { valuedAt: "desc" }, take: 1 },
      },
    });

    let totalReserveValueUsd = 0;
    for (const asset of assets) {
      const val = asset.valuations[0];
      if (val) {
        for (const lot of asset.lots) {
          totalReserveValueUsd += lot.quantity * val.pricePerUnit;
        }
      }
    }

    const nav = latestNav?.navPerToken ?? 0;
    const circulatingSupply = parseFloat(security.circulatingSupply);
    const tokenValueTotal = nav * circulatingSupply;
    const coverageRatio = tokenValueTotal > 0 ? totalReserveValueUsd / tokenValueTotal : 0;

    return {
      securityId,
      symbol: security.symbol,
      nav,
      circulatingSupply,
      totalReserveValueUsd,
      coverageRatio,
      coveragePercent: coverageRatio * 100,
      dataSource: "LIVE",
      asOf: latestNav?.effectiveDate ?? new Date(),
    };
  }

  /** Returns all active reserve lots for a program. */
  static async getActiveLots(programId: string) {
    return prisma.reserveLot.findMany({
      where: { asset: { programId }, status: "ACTIVE" },
      include: {
        asset: {
          include: { valuations: { orderBy: { valuedAt: "desc" }, take: 1 } },
        },
        custodyRecords: { where: { transferredOut: null }, take: 1 },
      },
    });
  }

  /** Returns the latest reserve coverage snapshot. */
  static async getLatestCoverage(_securityId: string) {
    return prisma.reserveCoverageSnapshot.findFirst({
      orderBy: { snapshotAt: "desc" },
    });
  }

  /** Appends a new coverage snapshot. */
  static async recordCoverageSnapshot(securityId: string): Promise<void> {
    const summary = await ReserveRegistry.getNavSummary(securityId);
    await prisma.reserveCoverageSnapshot.create({
      data: {
        totalReserveUsd: summary.totalReserveValueUsd,
        totalTokenSupply: String(Math.round(summary.circulatingSupply)),
        navPerToken: summary.nav,
        coverageRatio: summary.coverageRatio,
        netAssetValue: summary.totalReserveValueUsd,
        snapshotAt: new Date(),
      },
    });
  }
}

export { ReserveRegistry as default };
