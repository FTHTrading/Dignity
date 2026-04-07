import { TopBar } from "@/components/shell";
import { getDemoComplianceSummary, getDemoKycQueue, getDemoInvestorList } from "@/lib/adapters";
import { StatBlock, Card, CardContent, Badge, GoldDivider } from "@dignity/ui";

export const metadata = { title: "Compliance" };

export default function AdminCompliancePage() {
  const summary = getDemoComplianceSummary();
  const kycQueue = getDemoKycQueue();
  const investors = getDemoInvestorList();

  return (
    <>
      <TopBar title="Compliance" subtitle="KYC queue, jurisdictions, and sanctions screening" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="Total Investors" value={String(summary.totalInvestors)} />
          <StatBlock label="KYC Approved" value={String(summary.kycApproved)} variant="green" />
          <StatBlock label="KYC Pending" value={String(summary.kycPending)} sub="action required" variant={summary.kycPending > 0 ? "yellow" : "green"} />
          <StatBlock label="Open Events" value={String(summary.openComplianceEvents)} variant={summary.openComplianceEvents > 0 ? "red" : "green"} />
        </div>

        <GoldDivider />

        {kycQueue.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white/70">KYC Review Queue</h2>
            {kycQueue.map((item) => (
              <Card key={item.id}>
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white">{item.email}</p>
                    <p className="text-xs text-white/40">{item.investorRef} · {item.tier} · submitted {new Date(item.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs rounded bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">Approve</button>
                    <button className="px-3 py-1.5 text-xs rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">Reject</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70">Investors</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-white/30 border-b border-white/[0.06]">
                  <th className="text-left py-2 pr-4">Ref</th>
                  <th className="text-left py-2 pr-4">Jurisdiction</th>
                  <th className="text-left py-2 pr-4">DIGAU</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {investors.map((inv) => (
                  <tr key={inv.id}>
                    <td className="py-2.5 pr-4 text-white/70">{inv.id}</td>
                    <td className="py-2.5 pr-4 text-white/50">{inv.jurisdiction}</td>
                    <td className="py-2.5 pr-4 text-white tabular-nums">{inv.holdingsDigau.toLocaleString()}</td>
                    <td className="py-2.5">
                      <Badge variant={inv.kycStatus === "APPROVED" ? "green" : inv.kycStatus === "PENDING" ? "yellow" : "red"}>
                        {inv.kycStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-white/70 mb-3">Restricted Jurisdictions</h2>
          <div className="flex gap-2 flex-wrap">
            {summary.restrictedJurisdictions.map((j) => (
              <Badge key={j} variant="red">{j}</Badge>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
