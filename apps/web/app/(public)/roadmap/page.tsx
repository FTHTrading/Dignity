import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Roadmap | Dignity" };

const COMPLETED = [
  { label: "Strategic thesis established", phase: "Phase I" },
  { label: "Institutional board seated — 6 domain experts + Chairman David Weild IV", phase: "Phase I" },
  { label: "14-package monorepo architecture designed and implemented", phase: "Phase I" },
  { label: "PostgreSQL schema with full Prisma ORM — migrations applied", phase: "Phase I" },
  { label: "8-role access control system with permission-scope enforcement", phase: "Phase I" },
  { label: "Hash-chain audit event infrastructure operational", phase: "Phase I" },
  { label: "All admin application pages return HTTP 200", phase: "Phase II" },
  { label: "All critical write flows verified against live database", phase: "Phase II" },
  { label: "Approval workflow engine validated — 5 approval types functional", phase: "Phase II" },
  { label: "Reserve report lifecycle (DRAFT → PUBLISHED) validated", phase: "Phase II" },
  { label: "Audit chain integrity confirmed — 29 events, SHA-256 linked", phase: "Phase II" },
  { label: "TypeScript typecheck clean — zero errors across full monorepo", phase: "Phase II" },
  { label: "Production build passes — all pages compile cleanly", phase: "Phase II" },
  { label: "Compliance engine wired into subscription and transfer flows", phase: "Phase II" },
];

const UPCOMING: { label: string; timing: string; category: string }[] = [
  { label: "Public institutional site at dignity.unykorn.org",                         timing: "In progress", category: "Public Presence" },
  { label: "Investor disclosure package — term sheets, offering documents",             timing: "Near-term",   category: "Legal / Compliance" },
  { label: "Third-party compliance review with board legal advisors",                   timing: "Near-term",   category: "Legal / Compliance" },
  { label: "Regulatory framework documentation aligned to operational evidence",        timing: "Near-term",   category: "Legal / Compliance" },
  { label: "Production environment deployment — hardened configuration",                timing: "Near-term",   category: "Infrastructure" },
  { label: "Cloudflare edge deployment for public site",                                timing: "Near-term",   category: "Infrastructure" },
  { label: "On-chain reserve proof anchoring — ReserveProofAnchor.sol on Base",        timing: "Phase III",   category: "Technical" },
  { label: "External attestation engagement — third-party reserve attestor",           timing: "Phase III",   category: "Legal / Compliance" },
  { label: "Exchange venue onboarding — first ATS engagement",                         timing: "Phase III",   category: "Market Structure" },
  { label: "Investor portal launch — accredited investor onboarding workflow",          timing: "Phase III",   category: "Product" },
  { label: "Initial token issuance — first DIGAU mint under reserve coverage gating",  timing: "Phase III",   category: "Token Lifecycle" },
];

const CATEGORIES = [...new Set(UPCOMING.map((u) => u.category))];

const TIMING_STYLE: Record<string, string> = {
  "In progress": "bg-gold/10 border-gold/30 text-gold/80",
  "Near-term":   "bg-white/5 border-white/15 text-white/50",
  "Phase III":   "bg-white/[0.02] border-white/[0.08] text-white/25",
};

export default function RoadmapPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Roadmap</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Where We Are.<br />
          <span className="text-white/45 italic">What Comes Next.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Dignity has completed two substantive phases of work. Phase II delivered operating evidence
          against a live system. What remains is institutional maturation, not structural rebuilding.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* We Are Here indicator */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span className="text-xs text-gold/80 font-medium">We are here — Phase II to III transition</span>
        </div>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      {/* Phase II → III banner */}
      <div className="glass-panel p-6 mb-14 text-center">
        <p className="text-sm text-white/55 leading-relaxed max-w-2xl mx-auto">
          The operating platform is validated. The board is seated. The architecture is built.
          The audit chain is intact. The work ahead is about institutional presentation, legal
          confirmation, and market engagement — not platform construction.
        </p>
      </div>

      {/* Completed */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">
          Completed — Phase I & II
        </h2>
        <div className="space-y-2">
          {COMPLETED.map((item) => (
            <div key={item.label}
              className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.015]">
              <svg className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
              </svg>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-xs text-white/60">{item.label}</span>
                <span className="text-[9px] text-white/20 font-mono">{item.phase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* Upcoming by category */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">
          Upcoming — Phase III & Beyond
        </h2>
        {CATEGORIES.map((cat) => (
          <div key={cat} className="mb-8">
            <h3 className="text-[10px] text-white/20 uppercase tracking-widest mb-3">{cat}</h3>
            <div className="space-y-2">
              {UPCOMING.filter((u) => u.category === cat).map((item) => (
                <div key={item.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.05] bg-transparent">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-1 w-1 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-white/45">{item.label}</span>
                  </div>
                  <span className={`self-start sm:self-auto text-[9px] px-2 py-0.5 rounded-full border font-medium ${TIMING_STYLE[item.timing]}`}>
                    {item.timing}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Partnership close */}
      <div className="gold-rule mb-12" />
      <div className="glass-panel p-8 text-center mb-12">
        <h2 className="font-serif text-2xl font-light text-white mb-4">
          A Platform Built to Continue Building
        </h2>
        <p className="text-sm text-white/45 leading-relaxed max-w-2xl mx-auto">
          Dignity is not at the beginning of its platform journey. It is at the transition from
          proof of build to proof of institution. The team, board, and infrastructure are in place
          to support the next phase. Qualified counterparties — investors, advisors, partners,
          and service providers — are invited to engage.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/contact"
          className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors text-center">
          Institutional Inquiry →
        </Link>
        <Link href="/fundability"
          className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors text-center">
          Investment Fundability
        </Link>
      </div>
    </div>
  );
}
