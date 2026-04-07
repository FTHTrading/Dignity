import { TopBar } from "@/components/shell";
import { getDemoPortfolio, getDemoReserveSummary } from "@/lib/adapters";
import { StatBlock, CoverageGauge, Card, CardContent, GoldDivider } from "@dignity/ui";

export const metadata = { title: "Investor Dashboard" };

export default function InvestorDashboard() {
  const portfolio = getDemoPortfolio("inv-001");
  const reserve = getDemoReserveSummary();

  return (
    <>
      <TopBar title="Dashboard" subtitle="Your holdings and account overview" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        {/* Portfolio stats */}
        <section>
          <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBlock label="DIGAU Holdings" value={portfolio.holdingsDigau.toLocaleString()} sub="tokens" variant="gold" />
            <StatBlock label="Current Value" value={`$${portfolio.holdingValueUsd.toLocaleString()}`} sub="USD" />
            <StatBlock label="Unrealized P&L" value={`+${portfolio.unrealizedPnlPct.toFixed(2)}%`} sub={`+$${portfolio.unrealizedPnlUsd.toLocaleString()}`} variant="green" />
            <StatBlock label="NAV per Token" value={`$${portfolio.navPerToken}`} sub="Latest" />
          </div>
        </section>

        <GoldDivider />

        {/* Reserve snapshot */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div>
            <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Reserve Coverage</h2>
            <CoverageGauge ratio={reserve.coverageRatio} />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <StatBlock label="Reserve Value" value={`$${(reserve.totalReserveUsd / 1e6).toFixed(1)}M`} sub="Custodied gold" variant="gold" />
            <StatBlock label="Total Supply" value={reserve.totalIssuedTokens.toLocaleString()} sub="DIGAU issued" />
            <StatBlock label="KYC Status" value={portfolio.kycTier} sub="Account tier" />
            <StatBlock label="Pending Subscriptions" value={portfolio.pendingSubscriptions.toLocaleString()} sub="tokens (in review)" />
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Actions</h2>
          <div className="flex gap-3 flex-wrap">
            <a href="/investor/subscribe" className="px-5 py-2.5 rounded-lg bg-gold text-obsidian text-sm font-semibold hover:bg-gold-light transition-colors">
              Subscribe
            </a>
            <a href="/investor/redeem" className="px-5 py-2.5 rounded-lg border border-white/20 text-white/70 text-sm hover:border-white/40 hover:text-white transition-colors">
              Redeem
            </a>
            <a href="/proof-center" className="px-5 py-2.5 rounded-lg border border-white/10 text-white/50 text-sm hover:border-white/25 hover:text-white/80 transition-colors">
              Proof of Reserve
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
