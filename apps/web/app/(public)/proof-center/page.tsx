import Link from "next/link";
import { getDemoReserveSummary } from "@/lib/adapters";
import { CoverageGauge, StatBlock, GoldDivider, Card, CardContent } from "@dignity/ui";

export const metadata = { title: "Proof of Reserve" };

export default function ProofCenterPage() {
  const data = getDemoReserveSummary();
  const coveragePct = (data.coverageRatio * 100).toFixed(1);

  return (
    <main className="min-h-screen bg-obsidian text-white">
      {/* Header strip */}
      <div className="border-b border-white/[0.06] px-8 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">← Dignity</Link>
        <span className="text-xs text-white/30 uppercase tracking-widest">Public Proof Center</span>
        <div className="w-20" />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="font-serif text-4xl font-light text-white">Proof of Reserve</h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Every DIGAU token is backed by audited, custodied physical gold. Coverage data is updated
            with each independent attestation and anchored on-chain.
          </p>
        </div>

        <GoldDivider />

        {/* Coverage hero */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <CoverageGauge ratio={data.coverageRatio} />
          </div>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <StatBlock label="Total Reserve Value" value={`$${(data.totalReserveUsd / 1e6).toFixed(1)}M`} sub="USD equivalent" variant="gold" />
            <StatBlock label="Tokens Issued" value={data.totalIssuedTokens.toLocaleString()} sub="DIGAU circulating" />
            <StatBlock label="NAV per Token" value={`$${data.navPerToken.toFixed(2)}`} sub="Updated daily" variant="green" />
            <StatBlock label="Last Audit" value={new Date(data.lastAuditDate).toLocaleDateString()} sub="Independent auditor" />
          </div>
        </div>

        <GoldDivider />

        {/* Reserve lots */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Reserve Lots</h2>
          <div className="space-y-3">
            {data.lots.map((lot) => (
              <Card key={lot.id}>
                <CardContent className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">{lot.custodian}</p>
                    <p className="text-xs text-white/40">
                      {lot.units} {lot.unit} · {lot.locationCode} · {lot.assetType.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      ${lot.latestValuationUsd.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/30">Latest valuation</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Attestation note */}
        <Card>
          <CardContent className="py-6 text-center space-y-2">
            <p className="text-xs text-white/30 uppercase tracking-widest">On-Chain Anchor</p>
            <p className="text-sm text-white/60">
              Attestation proof hashes are anchored to Base Sepolia (chain 84532) via{" "}
              <code className="text-gold/70">ReserveProofAnchor.sol</code>.
              Verify proofs independently using the contract address in the legal disclosures.
            </p>
            <Link
              href="/disclosures"
              className="inline-block mt-2 text-xs text-gold hover:text-gold-light transition-colors"
            >
              View Disclosures &amp; Contract Addresses →
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
