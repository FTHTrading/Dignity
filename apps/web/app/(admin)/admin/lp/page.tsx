import Link from "next/link";
import { TopBar } from "@/components/shell";
import { getDemoLpDashboard } from "@/lib/adapters";
import { StatBlock, Card, CardContent, GoldDivider, Badge } from "@dignity/ui";
import { FilterableAuditLog, FilterableApprovalQueue } from "@/components/admin";
import { VenueToggleButton, SpreadPolicyForm } from "@/components/admin/forms";
import { prisma } from "@dignity/db";

export const metadata = { title: "LP Dashboard" };

async function getDbData() {
  try {
    const [venues, auditEvents, approvalRequests, marketMakers] = await Promise.all([
      prisma.venue.findMany({ orderBy: { name: "asc" } }),
      prisma.auditEvent.findMany({
        where: { category: "MARKET_OPS" },
        orderBy: { occurredAt: "desc" },
        take: 10,
      }),
      prisma.approvalRequest.findMany({
        where: { requestType: { in: ["VENUE_TOGGLE", "SPREAD_POLICY_CHANGE", "LP_ONBOARD"] } },
        orderBy: { requestedAt: "desc" },
        take: 10,
      }),
      prisma.marketMaker.findMany({ where: { status: "ACTIVE" }, take: 1 }),
    ]);
    const primaryMm = marketMakers[0];
    const spreadPolicy = primaryMm
      ? await prisma.spreadPolicy.findFirst({
          where: { marketMakerId: primaryMm.id, active: true },
          orderBy: { effectiveFrom: "desc" },
        })
      : null;
    return { venues, auditEvents, approvalRequests, primaryMm, spreadPolicy };
  } catch {
    return { venues: [], auditEvents: [], approvalRequests: [], primaryMm: undefined, spreadPolicy: null };
  }
}

const VENUE_STATUS_VARIANT: Record<string, "gold" | "green" | "red" | "yellow" | "muted" | "blue"> = {
  ACTIVE: "green",
  PENDING_APPROVAL: "yellow",
  UNDER_REVIEW: "blue",
  SUSPENDED: "red",
  TERMINATED: "muted",
};

export default async function AdminLpPage() {
  const data = getDemoLpDashboard();
  const { venues, auditEvents, approvalRequests, primaryMm, spreadPolicy } = await getDbData();

  return (
    <>
      <TopBar
        title="LP Dashboard"
        subtitle="Market maker inventory, OTC quotes, and liquidity structure"
      />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="MM Inventory" value={`$${(data.totalMmInventoryUsd / 1000).toFixed(0)}K`} variant="gold" />
          <StatBlock label="Active MMs" value={data.activeMms.toString()} />
          <StatBlock label="Open OTC Quotes" value={data.openOtcQuotes.toString()} />
          <StatBlock
            label="Circuit Breaker"
            value={data.circuitBreakerActive ? "ACTIVE" : "Clear"}
            variant={data.circuitBreakerActive ? "default" : "gold"}
          />
        </div>

        {/* NAV / spread row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="NAV Reference" value={`$${data.navReference.toFixed(2)}`} />
          <StatBlock label="Best Bid" value={`$${data.bestBid.toFixed(2)}`} />
          <StatBlock label="Best Ask" value={`$${data.bestAsk.toFixed(2)}`} />
          <StatBlock label="Spread" value={`${data.spreadBps} bps`} />
        </div>

        <GoldDivider />

        {/* Venue registry — from DB */}
        {venues.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Venue Registry
              </h2>
              <Link
                href="/docs/policies/LP_ONBOARDING_CHECKLIST.md"
                className="text-xs text-gold/70 hover:text-gold underline"
              >
                LP onboarding checklist ↗
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {venues.map((venue) => (
                <Card key={venue.id}>
                  <CardContent className="py-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <Link
                          href={`/admin/venues/${venue.id}`}
                          className="text-sm font-semibold text-white hover:text-gold transition-colors"
                        >
                          {venue.name}
                        </Link>
                        <p className="text-xs text-white/40 mt-0.5">
                          {venue.venueType.replace(/_/g, " ")} · {venue.jurisdiction}
                        </p>
                        {venue.notes && (
                          <p className="text-xs text-white/30">{venue.notes}</p>
                        )}
                      </div>
                      <Badge variant={VENUE_STATUS_VARIANT[venue.status] ?? "muted"}>
                        {venue.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <VenueToggleButton
                      venueId={venue.id}
                      venueName={venue.name}
                      currentStatus={venue.status}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <GoldDivider />

        {/* MM Inventory */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
            Market Maker Inventory
          </h2>
          {data.mmInventory.map((mm, i) => (
            <Card key={`${mm.mmId}-${i}`}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{mm.mmName}</p>
                  <p className="text-xs text-white/40">
                    {mm.asset} on {mm.chain.toUpperCase()} · Threshold: ${mm.thresholdUsd.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/30">
                    Updated: {new Date(mm.lastUpdated).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-white">
                    ${mm.inventoryUsd.toLocaleString()} {mm.asset}
                  </span>
                  {mm.belowThreshold && (
                    <Badge variant="yellow">Below Threshold</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <GoldDivider />

        {/* OTC Quote Queue */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
            OTC Quote Queue
          </h2>
          {data.otcQuotes.map((q) => (
            <Card key={q.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {q.direction} {q.tokenQty.toLocaleString()} {q.tokenSymbol} @ ${q.pricePerToken.toFixed(2)}
                  </p>
                  <p className="text-xs text-white/40">
                    Total: ${q.totalValueUsd.toLocaleString()} {q.stablecoinAsset} · Investor: {q.requestedBy}
                  </p>
                  <p className="text-xs text-white/30">
                    Created: {new Date(q.createdAt).toLocaleString()} · Expires: {new Date(q.expiresAt).toLocaleString()}
                  </p>
                </div>
                <Badge
                  variant={
                    q.status === "FILLED"
                      ? "green"
                      : q.status === "OPEN"
                      ? "yellow"
                      : "red"
                  }
                >
                  {q.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </section>

        <GoldDivider />

        {/* Spread Policy */}
        {primaryMm && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Spread Policy
            </h2>
            <Card>
              <CardContent className="py-5">
                <SpreadPolicyForm
                  marketMakerId={primaryMm.id}
                  currentMaxBps={spreadPolicy?.maxSpreadBps}
                  currentTargetBps={spreadPolicy?.targetSpreadBps}
                />
              </CardContent>
            </Card>
          </section>
        )}

        <GoldDivider />

        {/* Venue & spread approvals */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Approval Queue
            </h2>
            <Link
              href="/docs/policies/APPROVAL_WORKFLOWS.md"
              className="text-xs text-gold/70 hover:text-gold underline"
            >
              Approval workflows ↗
            </Link>
          </div>
          <FilterableApprovalQueue
            requests={approvalRequests}
            emptyMessage="No pending venue or spread policy requests."
            showDecideButtons
          />
        </section>

        <GoldDivider />

        {/* Market ops audit log */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Market Ops Audit Log
            </h2>
            <Link
              href="/docs/policies/MONTHLY_REPORTING_TEMPLATE.md"
              className="text-xs text-gold/70 hover:text-gold underline"
            >
              Reporting template ↗
            </Link>
          </div>
          <Card>
            <CardContent className="py-4">
              <FilterableAuditLog
                events={auditEvents}
                emptyMessage="No market ops events recorded yet."
              />
            </CardContent>
          </Card>
        </section>

        <GoldDivider />

        {/* Liquidity integrity note */}
        <section>
          <Card>
            <CardContent className="py-5 space-y-2">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Liquidity Integrity Policy
              </p>
              <p className="text-sm text-white/70">
                All market maker inventory counts as institutional liquidity only when backed by an executed MM
                agreement with spread obligations. MM inventory below threshold triggers an automatic reload
                review. Circuit breaker activation pauses all OTC quote execution and triggers board notification.
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
