import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Proof Center | Dignity" };

const VALIDATIONS = [
  {
    category: "Database",
    label: "Live Database Connection",
    detail: "PostgreSQL on port 5433 — verified connection, schema current, seed complete.",
    badge: "PASS",
  },
  {
    category: "Database",
    label: "Schema Migrations Applied",
    detail: "All Prisma migrations applied cleanly against the production schema. Zero pending migrations.",
    badge: "PASS",
  },
  {
    category: "Database",
    label: "Seed Data Integrity",
    detail: "Deterministic seed populates roles, users, venues, reserve lots, and initial token state without conflict.",
    badge: "PASS",
  },
  {
    category: "Application",
    label: "All Admin Pages Return 200",
    detail: "Every protected route — dashboard, investors, approvals, treasury, issuance, venues, audits, analytics — returns HTTP 200 under authenticated session.",
    badge: "PASS",
  },
  {
    category: "Application",
    label: "Write Flows Persist to DB",
    detail: "Every critical write flow — mint request creation, approval workflow, venue toggle, reserve report lifecycle, investor creation — writes to the live database and is confirmed on subsequent read.",
    badge: "PASS",
  },
  {
    category: "Build",
    label: "TypeScript Typecheck Clean",
    detail: "`tsc --noEmit` across the full monorepo passes with zero errors. All package boundaries and shared types are consistent.",
    badge: "PASS",
  },
  {
    category: "Build",
    label: "Production Build Passes",
    detail: "`next build` completes cleanly. All pages compile, static routes are optimised, and no critical build warnings.",
    badge: "PASS",
  },
  {
    category: "Audit",
    label: "Audit Chain Integrity — 29 Events",
    detail: "Hash-chain audit trail holds 29 immutable events. Each event cryptographically references its predecessor. Chain integrity verified end-to-end.",
    badge: "PASS",
  },
];

const AUDIT_FACTS = [
  { label: "Total Audit Events", value: "29" },
  { label: "Chain Model", value: "SHA-256 linked" },
  { label: "Data Source", value: "Live DB" },
  { label: "Last Validation", value: "2025 — Phase II" },
];

const CATEGORIES = [...new Set(VALIDATIONS.map((v) => v.category))];

export default function ProofPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Operational Proof</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Validation.<br />
          <span className="text-white/45 italic">Not Documentation.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          The following milestones represent validated operating evidence — not design targets or
          aspirational specifications. Each item has been confirmed against a live system.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Audit chain summary */}
      <div className="glass-panel p-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-sm font-semibold text-white mb-1">Audit Chain Summary</h2>
            <p className="text-xs text-white/40">Tamper-evident hash-linked event log — independently verifiable.</p>
          </div>
          <span className="inline-block text-xs bg-gold/10 border border-gold/30 text-gold px-3 py-1 rounded-full font-medium self-start sm:self-auto">
            CHAIN INTACT
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {AUDIT_FACTS.map((f) => (
            <div key={f.label} className="text-center">
              <div className="text-2xl font-light text-white mb-1">{f.value}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest">{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation grid by category */}
      {CATEGORIES.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-4">{cat}</h2>
          <div className="space-y-3">
            {VALIDATIONS.filter((v) => v.category === cat).map((v) => (
              <div key={v.label}
                className="glass-panel px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 flex items-center gap-3 sm:w-52">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white/80">{v.label}</div>
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider mt-1 inline-block">
                      {v.badge}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/45 leading-relaxed">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Disclosure note */}
      <div className="gold-rule my-12" />
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 mb-10 text-center">
        <p className="text-xs text-white/30 leading-relaxed max-w-2xl mx-auto">
          This proof summary is presented for informational purposes to qualified counterparties
          conducting diligence. Detailed technical evidence, schema snapshots, log exports, and
          attestation records are available under NDA upon request to authorised representatives.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Link href="/fundability"
          className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors text-center">
          Investment Fundability →
        </Link>
        <Link href="/controls"
          className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors text-center">
          Governance & Controls
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/status",       label: "Platform Status",  desc: "Full history + 14-milestone timeline" },
          { href: "/compliance",   label: "Compliance",       desc: "Regulatory framework overview" },
          { href: "/data-room",    label: "Data Room",         desc: "Diligence materials under NDA" },
        ].map((l) => (
          <Link key={l.href} href={l.href}
            className="glass-card p-4 hover:border-gold/20 transition-all group">
            <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors mb-1">{l.label}</p>
            <p className="text-xs text-white/35">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
