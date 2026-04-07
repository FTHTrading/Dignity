import { Badge } from "@dignity/ui";

interface AuditRow {
  id: string;
  category: string;
  action: string;
  actorRole?: string | null;
  actorId?: string | null;
  description?: string | null;
  occurredAt: Date;
}

interface AuditLogTableProps {
  events: AuditRow[];
  emptyMessage?: string;
}

const CATEGORY_VARIANT: Record<string, "gold" | "green" | "red" | "yellow" | "muted" | "blue"> = {
  AUTH: "blue",
  KYC: "blue",
  TOKEN_ACTION: "gold",
  COMPLIANCE: "yellow",
  TREASURY: "gold",
  RESERVE: "green",
  ATTESTATION: "green",
  MARKET_OPS: "muted",
  SYSTEM: "muted",
  ADMIN_ACTION: "red",
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(d));
}

export function AuditLogTable({ events, emptyMessage = "No audit events." }: AuditLogTableProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">{emptyMessage}</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wide">
            <th className="py-2 pr-4 font-medium">Time</th>
            <th className="py-2 pr-4 font-medium">Category</th>
            <th className="py-2 pr-4 font-medium">Action</th>
            <th className="py-2 pr-4 font-medium">Actor</th>
            <th className="py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
              <td className="py-2 pr-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(ev.occurredAt)}
              </td>
              <td className="py-2 pr-4">
                <Badge variant={CATEGORY_VARIANT[ev.category] ?? "muted"}>
                  {ev.category.replace("_", " ")}
                </Badge>
              </td>
              <td className="py-2 pr-4 font-mono text-xs">{ev.action}</td>
              <td className="py-2 pr-4 text-xs text-muted-foreground">
                {ev.actorRole ?? ev.actorId ?? "—"}
              </td>
              <td className="py-2 text-xs text-muted-foreground max-w-xs truncate">
                {ev.description ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
