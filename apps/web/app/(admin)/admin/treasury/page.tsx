import { TopBar } from "@/components/shell";
import { getDemoTreasurySummary, getDemoMovements } from "@/lib/adapters";
import { StatBlock, Card, CardContent, GoldDivider } from "@dignity/ui";

export const metadata = { title: "Treasury" };

export default function AdminTreasuryPage() {
  const summary = getDemoTreasurySummary();
  const movements = getDemoMovements();

  return (
    <>
      <TopBar title="Treasury" subtitle="Account balances and fund movements" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="Reserve Account" value={`$${(summary.totalReserveBalance / 1e6).toFixed(1)}M`} variant="gold" />
          <StatBlock label="Operating" value={`$${(summary.totalOperatingBalance / 1000).toFixed(0)}K`} />
          <StatBlock label="MM Pool" value={`$${(summary.totalMmPoolBalance / 1e6).toFixed(1)}M`} />
          <StatBlock label="Escrow" value={`$${(summary.totalEscrowBalance / 1000).toFixed(0)}K`} />
        </div>

        <GoldDivider />

        <div className="flex items-center gap-3 text-sm">
          <span className="text-white/40">Last reconciliation:</span>
          <span className="text-white/70">{new Date(summary.lastReconciliationAt).toLocaleString()}</span>
          <span className={`px-2 py-0.5 rounded text-xs ${summary.isReconciled ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
            {summary.isReconciled ? "Reconciled" : "Needs Review"}
          </span>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70">Recent Movements</h2>
          {movements.map((mv) => (
            <Card key={mv.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white">{mv.description}</p>
                  <p className="text-xs text-white/30">{mv.type} · {new Date(mv.createdAt).toLocaleDateString()}</p>
                </div>
                <p className={`text-sm font-semibold ${mv.type.includes("DEBIT") ? "text-red-400" : "text-green-400"}`}>
                  {mv.type.includes("DEBIT") ? "-" : "+"}${mv.amount.toLocaleString()} {mv.currency}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

      </div>
    </>
  );
}
