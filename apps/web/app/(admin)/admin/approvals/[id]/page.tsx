import { notFound } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/shell";
import { Card, CardContent, Badge, GoldDivider } from "@dignity/ui";
import { DecideButtons } from "@/components/admin/forms";
import { prisma } from "@dignity/db";

export const metadata = { title: "Approval Request" };

const TYPE_LABEL: Record<string, string> = {
  MINT_REQUEST: "Mint Request",
  REDEMPTION_APPROVE: "Redemption Approval",
  LP_ONBOARD: "LP Onboarding",
  VENUE_TOGGLE: "Venue Toggle",
  RESERVE_REPORT_PUBLISH: "Reserve Report Publish",
  SPREAD_POLICY_CHANGE: "Spread Policy Change",
  TREASURY_WIRE: "Treasury Wire",
};

const STATUS_VARIANT: Record<string, "gold" | "green" | "red" | "yellow" | "muted" | "blue"> = {
  PENDING: "yellow",
  APPROVED: "green",
  REJECTED: "red",
  CANCELLED: "muted",
};

function fmt(d: Date | null | undefined, opts?: Intl.DateTimeFormatOptions) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...opts,
  }).format(new Date(d));
}

export default async function ApprovalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let request;
  try {
    request = await prisma.approvalRequest.findUnique({ where: { id } });
  } catch {
    request = null;
  }

  if (!request) notFound();

  const isPending = request.status === "PENDING";

  return (
    <>
      <TopBar
        title={TYPE_LABEL[request.requestType] ?? request.requestType}
        subtitle={`#${request.id.slice(-8)} · ${request.requestType}`}
      />
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Link href="/admin/stablecoin" className="hover:text-gold transition-colors">
            Admin
          </Link>
          <span>›</span>
          <span>Approval #{request.id.slice(-8)}</span>
        </div>

        <Card>
          <CardContent className="py-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold text-white leading-tight">{request.title}</h2>
              <Badge variant={STATUS_VARIANT[request.status] ?? "muted"}>{request.status}</Badge>
            </div>

            {request.description && (
              <p className="text-sm text-white/60">{request.description}</p>
            )}

            <GoldDivider />

            <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["Type", TYPE_LABEL[request.requestType] ?? request.requestType],
                ["Requested By", request.requestedByRole ?? "—"],
                ["Requested At", fmt(request.requestedAt)],
                ["Expires", request.expiresAt ? fmt(request.expiresAt) : "No expiry"],
                ["Decided At", fmt(request.decidedAt)],
                ["Decision Note", request.decisionNote ?? "—"],
              ].map(([label, value]) => (
                <div key={label} className="space-y-0.5">
                  <dt className="text-xs text-white/40 uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm text-white/80">{value}</dd>
                </div>
              ))}
            </dl>

            {request.payload && (
              <>
                <GoldDivider />
                <div className="space-y-1">
                  <p className="text-xs text-white/40 uppercase tracking-wide">Payload</p>
                  <pre className="text-xs text-white/60 bg-white/[0.03] rounded p-3 overflow-x-auto border border-white/[0.06]">
                    {JSON.stringify(request.payload, null, 2)}
                  </pre>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {isPending && (
          <Card>
            <CardContent className="py-5 space-y-3">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Decision
              </h3>
              <p className="text-xs text-white/40">
                Approving or rejecting this request will be logged to the audit trail and cannot be undone.
              </p>
              <DecideButtons requestId={request.id} requestTitle={request.title} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
