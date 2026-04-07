import { Badge } from "@dignity/ui";

interface ApprovalRow {
  id: string;
  requestType: string;
  status: string;
  title: string;
  description?: string | null;
  requestedByRole?: string | null;
  requestedAt: Date;
  expiresAt?: Date | null;
  decidedAt?: Date | null;
  decisionNote?: string | null;
}

interface ApprovalQueueProps {
  requests: ApprovalRow[];
  emptyMessage?: string;
}

const TYPE_LABEL: Record<string, string> = {
  MINT_REQUEST: "Mint",
  REDEMPTION_APPROVE: "Redemption",
  LP_ONBOARD: "LP Onboard",
  VENUE_TOGGLE: "Venue Toggle",
  RESERVE_REPORT_PUBLISH: "Reserve Report",
  SPREAD_POLICY_CHANGE: "Spread Policy",
  TREASURY_WIRE: "Treasury Wire",
};

const STATUS_VARIANT: Record<string, "gold" | "green" | "red" | "yellow" | "muted" | "blue"> = {
  PENDING: "yellow",
  APPROVED: "green",
  REJECTED: "red",
  CANCELLED: "muted",
};

function daysUntil(d: Date | null | undefined) {
  if (!d) return null;
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
  return diff;
}

export function ApprovalQueue({ requests, emptyMessage = "No pending approvals." }: ApprovalQueueProps) {
  if (requests.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">{emptyMessage}</p>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((req) => {
        const ttl = daysUntil(req.expiresAt);
        return (
          <div
            key={req.id}
            className="rounded-lg border border-border bg-card/50 p-4 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-tight">{req.title}</p>
                {req.description && (
                  <p className="text-xs text-muted-foreground">{req.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="muted">{TYPE_LABEL[req.requestType] ?? req.requestType}</Badge>
                <Badge variant={STATUS_VARIANT[req.status] ?? "muted"}>{req.status}</Badge>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span>
                Requested by{" "}
                <span className="font-medium text-foreground">
                  {req.requestedByRole ?? "—"}
                </span>
              </span>
              <span>
                {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
                  new Date(req.requestedAt)
                )}
              </span>
              {ttl != null && (
                <span className={ttl <= 2 ? "text-yellow-500" : ""}>
                  {ttl > 0 ? `Expires in ${ttl}d` : "Expired"}
                </span>
              )}
              {req.decisionNote && (
                <span className="italic">Note: {req.decisionNote}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
