import Link from "next/link";
import { TopBar } from "@/components/shell";
import { getDemoStablecoinAdmin } from "@/lib/adapters";
import { StatBlock, Card, CardContent, GoldDivider, Badge } from "@dignity/ui";
import { FilterableAuditLog, FilterableApprovalQueue } from "@/components/admin";
import { MintRequestForm, RedemptionRequestForm } from "@/components/admin/forms";
import { prisma } from "@dignity/db";

export const metadata = { title: "Stablecoin Rails" };

async function getDbData() {
  try {
    const [auditEvents, approvalRequests] = await Promise.all([
      prisma.auditEvent.findMany({
        where: { category: { in: ["TOKEN_ACTION", "TREASURY"] } },
        orderBy: { occurredAt: "desc" },
        take: 10,
      }),
      prisma.approvalRequest.findMany({
        where: { requestType: { in: ["MINT_REQUEST", "REDEMPTION_APPROVE"] } },
        orderBy: { requestedAt: "desc" },
        take: 10,
      }),
    ]);
    return { auditEvents, approvalRequests };
  } catch {
    return { auditEvents: [], approvalRequests: [] };
  }
}

export default async function AdminStablecoinPage() {
  const data = getDemoStablecoinAdmin();
  const { auditEvents, approvalRequests } = await getDbData();

  return (
    <>
      <TopBar
        title="Stablecoin Rails"
        subtitle="USDC and USDT settlement rail health and pending operations"
      />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock
            label="Rail Status"
            value={data.allRailsHealthy ? "All Healthy" : "Degraded"}
            variant={data.allRailsHealthy ? "gold" : "default"}
          />
          <StatBlock
            label="USDC Price"
            value={`$${data.prices.find((p) => p.asset === "USDC")?.priceUsd.toFixed(4) ?? "â€”"}`}
          />
          <StatBlock
            label="USDT Price"
            value={`$${data.prices.find((p) => p.asset === "USDT")?.priceUsd.toFixed(4) ?? "â€”"}`}
          />
          <StatBlock
            label="Pending Settlements"
            value={`$${data.totalPendingUsd.toLocaleString()}`}
          />
        </div>

        <GoldDivider />

        {/* Rail health grid */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
            Rail Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {data.railHealth.map((rail) => (
              <Card key={`${rail.asset}-${rail.chain}`}>
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {rail.asset} â€“ {rail.chain.toUpperCase()}
                    </p>
                    {rail.notes && (
                      <p className="text-xs text-white/40 mt-0.5">{rail.notes}</p>
                    )}
                    {rail.latencyMs != null && (
                      <p className="text-xs text-white/30 mt-0.5">{rail.latencyMs}ms</p>
                    )}
                  </div>
                  <Badge
                    variant={
                      rail.status === "HEALTHY"
                        ? "green"
                        : rail.status === "DEGRADED"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {rail.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* Pending settlements */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
            Settlement Queue
          </h2>
          {data.pendingSettlements.map((s) => (
            <Card key={s.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-white font-medium">
                    {s.type.replace(/_/g, " ")} Â· {s.asset} on {s.chain.toUpperCase()}
                  </p>
                  <p className="text-xs text-white/40">
                    Ref: {s.referenceId} Â· To: {s.toAddress.slice(0, 10)}â€¦
                  </p>
                  <p className="text-xs text-white/30">
                    Initiated: {new Date(s.initiatedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-white">
                    ${parseFloat(s.amountHuman).toLocaleString()} {s.asset}
                  </span>
                  <Badge
                    variant={
                      s.status === "CONFIRMED"
                        ? "green"
                        : s.status === "PENDING"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {s.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <GoldDivider />

        {/* New mint/redemption request forms */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="py-5 space-y-3">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                New Mint Request
              </h2>
              <MintRequestForm />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-5 space-y-3">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                New Redemption Request
              </h2>
              <RedemptionRequestForm />
            </CardContent>
          </Card>
        </section>

        <GoldDivider />

        {/* Approval queue — mint & redemption */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Mint & Redemption Approvals
            </h2>
            <Link
              href="/docs/policies/APPROVAL_WORKFLOWS.md"
              className="text-xs text-gold/70 hover:text-gold underline"
            >
              Approval workflow policy ↗
            </Link>
          </div>
          <FilterableApprovalQueue
            requests={approvalRequests}
            emptyMessage="No pending mint or redemption requests."
            showDecideButtons
          />
        </section>

        <GoldDivider />

        {/* Audit log */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Recent Audit Events
            </h2>
            <Link
              href="/docs/policies/AUDIT_EVENT_TAXONOMY.md"
              className="text-xs text-gold/70 hover:text-gold underline"
            >
              Audit taxonomy â†—
            </Link>
          </div>
          <Card>
            <CardContent className="py-4">
              <FilterableAuditLog
                events={auditEvents}
                emptyMessage="No token or treasury events recorded yet."
              />
            </CardContent>
          </Card>
        </section>

        <GoldDivider />

        {/* Compliance note */}
        <section>
          <Card>
            <CardContent className="py-5 space-y-2">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Compliance Note
              </p>
              <p className="text-sm text-white/70">
                USDC and USDT rails operate under a separate compliance track from DIGau securities compliance.
                OFAC wallet screening and transaction monitoring are required before any rail is connected to
                live settlement. All outbound settlements â‰¥ $3,000 are subject to Travel Rule assessment.
              </p>
              <div className="flex gap-4 pt-1">
                <Link href="/public/disclosures" className="text-xs text-gold/70 hover:text-gold underline">
                  View disclosures
                </Link>
                <Link href="/docs/policies/ROLE_MATRIX.md" className="text-xs text-gold/70 hover:text-gold underline">
                  Role matrix
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </>
  );
}
