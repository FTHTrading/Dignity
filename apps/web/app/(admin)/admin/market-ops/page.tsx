import { TopBar } from "@/components/shell";
import { getDemoLiquiditySummary, getDemoVenues, getDemoMarketMakers } from "@/lib/adapters";
import { StatBlock, Card, CardContent, Badge, GoldDivider } from "@dignity/ui";

export const metadata = { title: "Market Ops" };

export default function AdminMarketOpsPage() {
  const summary = getDemoLiquiditySummary();
  const venues = getDemoVenues();
  const mms = getDemoMarketMakers();

  return (
    <>
      <TopBar
        title="Market Ops"
        subtitle="Venues, market makers, and liquidity monitoring"
        actions={
          <button className="px-4 py-2 text-sm rounded-lg bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500/20 transition-colors">
            Trigger Circuit Breaker
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="Best Bid" value={`$${summary.bestBid?.toFixed(2) ?? "—"}`} />
          <StatBlock label="Best Ask" value={`$${summary.bestAsk?.toFixed(2) ?? "—"}`} />
          <StatBlock label="Spread" value={`${summary.spreadBps} bps`} variant={summary.spreadBps < 20 ? "green" : "yellow"} />
          <StatBlock label="Data Source" value={summary.dataSource} sub={summary.hasAnomaly ? "Anomaly detected" : "Normal"} variant={summary.hasAnomaly ? "red" : "green"} />
        </div>

        <GoldDivider />

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70">Venues</h2>
          {venues.map((v) => (
            <Card key={v.id}>
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">{v.name}</p>
                  <p className="text-xs text-white/40">{v.type} · last heartbeat {new Date(v.lastHeartbeat).toLocaleTimeString()}</p>
                </div>
                <Badge variant={v.status === "ACTIVE" ? "green" : "red"}>{v.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70">Market Makers</h2>
          {mms.map((mm) => (
            <Card key={mm.id}>
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">{mm.name}</p>
                  <p className="text-xs text-white/40">{mm.tier} tier · spread target {mm.spreadTarget} bps</p>
                </div>
                <Badge variant={mm.status === "ACTIVE" ? "green" : "muted"}>{mm.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </section>

      </div>
    </>
  );
}
