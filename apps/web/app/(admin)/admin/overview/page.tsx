import { TopBar } from "@/components/shell";
import { getDemoReserveSummary, getDemoTreasurySummary, getDemoComplianceSummary, getDemoLiquiditySummary } from "@/lib/adapters";
import { StatBlock, GoldDivider, Badge, Card, CardContent } from "@dignity/ui";
import { OverviewCharts } from "@/components/admin/OverviewCharts";
import { prisma } from "@dignity/db";

export const metadata = { title: "Issuer Overview" };

async function getDbOverview() {
  try {
    const [approvalGroups, lastReport, pendingCount] = await Promise.all([
      prisma.approvalRequest.groupBy({
        by: ["requestType"],
        _count: { id: true },
      }),
      prisma.reserveReport.findFirst({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        select: { coverageRatio: true, navPerToken: true },
      }),
      prisma.approvalRequest.count({ where: { status: "PENDING" } }),
    ]);
    return {
      approvalsByType: approvalGroups.map((g) => ({
        type: g.requestType,
        count: g._count.id,
      })),
      coverageRatio: lastReport?.coverageRatio ? Number(lastReport.coverageRatio) : 1.0,
      navPerToken: lastReport?.navPerToken ? Number(lastReport.navPerToken) : 1.0,
      pendingApprovals: pendingCount,
    };
  } catch {
    return { approvalsByType: [], coverageRatio: 1.0, navPerToken: 1.0, pendingApprovals: 0 };
  }
}

export default async function AdminOverviewPage() {
  const reserve = getDemoReserveSummary();
  const treasury = getDemoTreasurySummary();
  const compliance = getDemoComplianceSummary();
  const market = getDemoLiquiditySummary();
  const dbOverview = await getDbOverview();

  const coveragePct = (reserve.coverageRatio * 100).toFixed(1);

  return (
    <>
      <TopBar title="Issuer Overview" subtitle="Platform-wide operational summary" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        <section>
          <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Reserve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBlock label="Coverage Ratio" value={`${coveragePct}%`} sub="1:1 target" variant={reserve.coverageRatio >= 1 ? "green" : "red"} />
            <StatBlock label="Reserve Value" value={`$${(reserve.totalReserveUsd / 1e6).toFixed(1)}M`} sub="USD" variant="gold" />
            <StatBlock label="Issued DIGAU" value={reserve.totalIssuedTokens.toLocaleString()} />
            <StatBlock label="NAV per Token" value={`$${reserve.navPerToken}`} />
          </div>
        </section>

        <GoldDivider />

        <section>
          <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Treasury &amp; Compliance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBlock label="Reserve Balance" value={`$${(treasury.totalReserveBalance / 1e6).toFixed(1)}M`} />
            <StatBlock label="Operating Balance" value={`$${(treasury.totalOperatingBalance / 1000).toFixed(0)}K`} />
            <StatBlock label="KYC Approved" value={`${compliance.kycApproved}/${compliance.totalInvestors}`} sub="investors" variant="green" />
            <StatBlock label="Open Events" value={String(compliance.openComplianceEvents)} sub="compliance flags" variant={compliance.openComplianceEvents > 0 ? "red" : "green"} />
          </div>
        </section>

        <GoldDivider />

        <section>
          <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Market Ops</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBlock label="Active MMs" value={String(market.activeMMs)} />
            <StatBlock label="Active Venues" value={String(market.activeVenues)} />
            <StatBlock label="Spread" value={`${market.spreadBps} bps`} variant={market.spreadBps < 20 ? "green" : "yellow"} />
            <div className="flex items-center gap-2">
              <Badge variant={market.hasActiveBreaker ? "red" : "green"}>
                {market.hasActiveBreaker ? "Breaker Active" : "No Breakers"}
              </Badge>
            </div>
          </div>
        </section>

        <GoldDivider />

        <section className="space-y-3">
          <h2 className="text-xs text-white/30 uppercase tracking-widest">Live Activity</h2>
          <Card>
            <CardContent className="py-5">
              <OverviewCharts
                approvalsByType={dbOverview.approvalsByType}
                coverageRatio={dbOverview.coverageRatio}
                navPerToken={dbOverview.navPerToken}
                pendingApprovals={dbOverview.pendingApprovals}
              />
            </CardContent>
          </Card>
        </section>

      </div>
    </>
  );
}
