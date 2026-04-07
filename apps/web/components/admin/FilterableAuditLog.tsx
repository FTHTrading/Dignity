"use client";

import { useState, useMemo } from "react";
import { AuditLogTable } from "./AuditLogTable";

interface AuditRow {
  id: string;
  category: string;
  action: string;
  actorRole?: string | null;
  actorId?: string | null;
  description?: string | null;
  occurredAt: Date;
}

interface FilterableAuditLogProps {
  events: AuditRow[];
  emptyMessage?: string;
}

const CATEGORIES = [
  "ALL",
  "AUTH",
  "KYC",
  "TOKEN_ACTION",
  "COMPLIANCE",
  "TREASURY",
  "RESERVE",
  "ATTESTATION",
  "MARKET_OPS",
  "SYSTEM",
  "ADMIN_ACTION",
];

export function FilterableAuditLog({ events, emptyMessage }: FilterableAuditLogProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return events.filter((ev) => {
      const matchCat = category === "ALL" || ev.category === category;
      const matchQ =
        !q ||
        ev.action.toLowerCase().includes(q) ||
        (ev.description ?? "").toLowerCase().includes(q) ||
        (ev.actorRole ?? "").toLowerCase().includes(q) ||
        (ev.actorId ?? "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [events, search, category]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search action, actor, description…"
          className="rounded-md bg-white/[0.05] border border-white/10 px-3 py-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors w-64"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md bg-white/[0.05] border border-white/10 px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold/40 transition-colors"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-graphite text-white">
              {c === "ALL" ? "All Categories" : c.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        {(search || category !== "ALL") && (
          <button
            onClick={() => { setSearch(""); setCategory("ALL"); }}
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Clear
          </button>
        )}
        <span className="ml-auto text-xs text-white/30 self-center">
          {filtered.length} / {events.length}
        </span>
      </div>
      <AuditLogTable events={filtered} emptyMessage={search || category !== "ALL" ? "No events match your filters." : emptyMessage} />
    </div>
  );
}
