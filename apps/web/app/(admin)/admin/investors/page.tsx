import { TopBar } from "@/components/shell";
import { getDemoInvestorList } from "@/lib/adapters";
import { Badge, Card, CardContent } from "@dignity/ui";

export const metadata = { title: "Investors" };

export default function AdminInvestorsPage() {
  const investors = getDemoInvestorList();

  return (
    <>
      <TopBar title="Investors" subtitle="Enrolled investor directory" />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-white/30 border-b border-white/[0.06] text-left">
                <th className="py-3 pr-4">ID</th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Jurisdiction</th>
                <th className="py-3 pr-4">DIGAU</th>
                <th className="py-3 pr-4">Enrolled</th>
                <th className="py-3">KYC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {investors.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4 font-mono text-xs text-white/40">{inv.id}</td>
                  <td className="py-3 pr-4 text-white">{inv.name}</td>
                  <td className="py-3 pr-4 text-white/60">{inv.email}</td>
                  <td className="py-3 pr-4 text-white/50">{inv.jurisdiction}</td>
                  <td className="py-3 pr-4 text-white tabular-nums">{inv.holdingsDigau.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-white/40 text-xs">{new Date(inv.enrolledAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <Badge variant={inv.kycStatus === "APPROVED" ? "green" : inv.kycStatus === "PENDING" ? "yellow" : "red"} className="text-xs">
                      {inv.kycStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
