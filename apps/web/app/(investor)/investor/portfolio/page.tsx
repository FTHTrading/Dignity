import { TopBar } from "@/components/shell";
import { getDemoPortfolio } from "@/lib/adapters";
import { StatBlock, Card, CardContent } from "@dignity/ui";

export const metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  const portfolio = getDemoPortfolio("inv-001");

  return (
    <>
      <TopBar title="Portfolio" subtitle="Token holdings and transaction history" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="DIGAU Held" value={portfolio.holdingsDigau.toLocaleString()} variant="gold" />
          <StatBlock label="Value" value={`$${portfolio.holdingValueUsd.toLocaleString()}`} />
          <StatBlock label="Invested" value={`$${portfolio.investedUsd.toLocaleString()}`} />
          <StatBlock label="P&L" value={`+$${portfolio.unrealizedPnlUsd.toLocaleString()}`} variant="green" />
        </div>

        <Card>
          <CardContent className="py-6">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Allocation</p>
            <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${Math.min((portfolio.holdingsDigau / 5000) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/30">
              <span>{portfolio.holdingsDigau.toLocaleString()} DIGAU held</span>
              <span>5,000 DIGAU target tier</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-sm text-white/40">Transaction history will appear here once live data is connected.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
