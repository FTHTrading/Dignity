import { TopBar } from "@/components/shell";
import { getDemoReserveSummary } from "@/lib/adapters";
import { StatBlock, CoverageGauge, Card, CardContent, GoldDivider } from "@dignity/ui";

export const metadata = { title: "Reserve Management" };

export default function AdminReservePage() {
  const data = getDemoReserveSummary();

  return (
    <>
      <TopBar
        title="Reserve"
        subtitle="Custodied assets and attestation records"
        actions={
          <button className="px-4 py-2 text-sm rounded-lg bg-gold/10 text-gold border border-gold/25 hover:bg-gold/20 transition-colors">
            Trigger Attestation
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <CoverageGauge ratio={data.coverageRatio} />
          <div className="grid grid-cols-2 gap-4 flex-1">
            <StatBlock label="Total Reserve" value={`$${(data.totalReserveUsd / 1e6).toFixed(1)}M`} variant="gold" />
            <StatBlock label="DIGAU Issued" value={data.totalIssuedTokens.toLocaleString()} />
            <StatBlock label="NAV" value={`$${data.navPerToken}`} variant="green" />
            <StatBlock label="Last Audit" value={new Date(data.lastAuditDate).toLocaleDateString()} />
          </div>
        </div>

        <GoldDivider />

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70">Reserve Lots</h2>
          {data.lots.map((lot) => (
            <Card key={lot.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{lot.custodian}</p>
                  <p className="text-xs text-white/40">{lot.units} {lot.unit} · {lot.locationCode} · {lot.assetType.replace(/_/g, " ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">${lot.latestValuationUsd.toLocaleString()}</p>
                  <p className="text-xs text-white/30">Valuation USD</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-xs text-white/30 mb-1 uppercase tracking-widest">Attestation History</p>
            <p className="text-sm text-white/40">Connect live Prisma data to populate attestation records.</p>
          </CardContent>
        </Card>

      </div>
    </>
  );
}
