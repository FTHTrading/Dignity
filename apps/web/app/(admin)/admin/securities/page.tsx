import { TopBar } from "@/components/shell";
import { Card, CardContent, StatBlock } from "@dignity/ui";

export const metadata = { title: "Securities" };

// Demo DIGAU security data
const DIGAU = {
  id: "sec-001",
  name: "Dignity Gold Token",
  symbol: "DIGAU",
  tokenAddress: "0x0000…demo",
  decimals: 18,
  totalSupply: 500_000,
  nav: 62.4,
  status: "ACTIVE",
  jurisdiction: "Multiple (KYC-gated)",
  custodian: "Brinks / Malca-Amit",
  auditor: "Independent Third Party",
  lastAuditDate: "2025-04-01",
  issuedDate: "2024-10-01",
};

export default function AdminSecuritiesPage() {
  return (
    <>
      <TopBar title="Securities" subtitle="Issued security instruments" />
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        <Card>
          <CardContent className="py-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{DIGAU.name}</h3>
                <p className="text-sm text-gold font-medium mt-0.5">{DIGAU.symbol}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                {DIGAU.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatBlock label="Total Supply" value={DIGAU.totalSupply.toLocaleString()} sub="DIGAU tokens" />
              <StatBlock label="NAV per Token" value={`$${DIGAU.nav}`} variant="gold" />
              <StatBlock label="Decimals" value={String(DIGAU.decimals)} />
              <StatBlock label="Issued" value={DIGAU.issuedDate} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-white/[0.06] pt-4">
              {[
                ["Contract Address", DIGAU.tokenAddress],
                ["Custodian", DIGAU.custodian],
                ["Auditor", DIGAU.auditor],
                ["Jurisdiction", DIGAU.jurisdiction],
                ["Last Audit", DIGAU.lastAuditDate],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-white/30 shrink-0">{k}:</span>
                  <span className="text-white/70">{v}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-sm text-white/40">Additional security classes will appear here when issued.</p>
          </CardContent>
        </Card>

      </div>
    </>
  );
}
