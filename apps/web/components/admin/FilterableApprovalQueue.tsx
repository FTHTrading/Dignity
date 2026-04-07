"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@dignity/ui";
import { DecideButtons } from "./forms";

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

interface FilterableApprovalQueueProps {
  requests: ApprovalRow[];
  emptyMessage?: string;
  showDecideButtons?: boolean;
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

const ALL_STATUSES = ["ALL", "PENDING", "APPROVED", "REJECTED", "CANCELLED"];
const ALL_TYPES = ["ALL", ...Object.keys(TYPE_LABEL)];

function daysUntil(d: Date | null | undefined) {
  if (!d) return null;
  return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
}

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(d));
}

export function FilterableApprovalQueue({
  requests,
  emptyMessage = "No approvals found.",
  showDecideButtons = false,
}: FilterableApprovalQueueProps) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filtered = useMemo(
    () =>
      requests.filter(
        (r) =>
          (statusFilter === "ALL" || r.status === statusFilter) &&
          (typeFilter === "ALL" || r.requestType === typeFilter)
      ),
    [requests, statusFilter, typeFilter]
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md bg-white/[0.05] border border-white/10 px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold/40 transition-colors"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s} className="bg-graphite text-white">
              {s === "ALL" ? "All Statuses" : s}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-md bg-white/[0.05] border border-white/10 px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold/40 transition-colors"
        >
          {ALL_TYPES.map((t) => (
            <option key={t} value={t} className="bg-graphite text-white">
              {t === "ALL" ? "All Types" : TYPE_LABEL[t] ?? t}
            </option>
          ))}
        </select>
        {(statusFilter !== "ALL" || typeFilter !== "ALL") && (
          <button
            onClick={() => { setStatusFilter("ALL"); setTypeFilter("ALL"); }}
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Clear
          </button>
        )}
        <span className="ml-auto text-xs text-white/30 self-center">
          {filtered.length} / {requests.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => {
            const ttl = daysUntil(req.expiresAt);
            return (
              <div
                key={req.id}
                className="rounded-lg border border-border bg-card/50 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <Link
                      href={`/admin/approvals/${req.id}`}
                      className="text-sm font-medium leading-tight hover:text-gold transition-colors line-clamp-2"
                    >
                      {req.title}
                    </Link>
                    {req.description && (
                      <p className="text-xs text-muted-foreground truncate">{req.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="muted">{TYPE_LABEL[req.requestType] ?? req.requestType}</Badge>
                    <Badge variant={STATUS_VARIANT[req.status] ?? "muted"}>{req.status}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    By{" "}
                    <span className="text-foreground font-medium">
                      {req.requestedByRole ?? "—"}
                    </span>
                  </span>
                  <span>{fmt(req.requestedAt)}</span>
                  {ttl != null && (
                    <span className={ttl <= 2 ? "text-yellow-500" : ""}>
                      {ttl > 0 ? `Expires in ${ttl}d` : "Expired"}
                    </span>
                  )}
                  {req.decisionNote && (
                    <span className="italic truncate max-w-xs">
                      Note: {req.decisionNote}
                    </span>
                  )}
                </div>

                {showDecideButtons && req.status === "PENDING" && (
                  <DecideButtons requestId={req.id} requestTitle={req.title} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
