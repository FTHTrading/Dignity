import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Path Forward | Dignity" };

const CURRENT_STATE = [
  { label: "Token supply minted",        value: "3,000,000,000 DIGau",  status: "caution" },
  { label: "Physical gold vaulted",      value: "0 oz on record",        status: "gap"     },
  { label: "Governance structure",       value: "Single EOA — no multisig", status: "gap"  },
  { label: "QP attestation",            value: "Not yet engaged",        status: "gap"     },
  { label: "Supply reconciliation",      value: "Unreconciled",          status: "gap"     },
  { label: "Custody statements",        value: "None on file",           status: "gap"     },
  { label: "Platform build",            value: "Clean — 0 TS errors",    status: "done"    },
  { label: "Audit chain",               value: "29 events, SHA-256 linked", status: "done" },
  { label: "Board composition",         value: "7 directors seated",     status: "done"    },
  { label: "Compliance engine",         value: "Operational",            status: "done"    },
];

const STATUS_STYLE: Record<string, { dot: string; badge: string; text: string }> = {
  done:    { dot: "bg-emerald-500",    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", text: "Complete" },
  caution: { dot: "bg-amber-400",      badge: "bg-amber-400/10 border-amber-400/20 text-amber-400",      text: "Active"   },
  gap:     { dot: "bg-red-500/60",     badge: "bg-red-500/10 border-red-500/20 text-red-400/80",         text: "Open Gap" },
};

const MILESTONES = [
  {
    seq: "01",
    title: "Governance Hardening",
    timing: "Immediate",
    unlock: "Custody partner eligibility · Institutional credibility",
    items: [
      "Migrate control from single EOA to 3-of-5 multisig structure",
      "Assign board-held keys with documented key custodian procedure",
      "Publish on-chain governance change with signed board resolution",
      "Deploy Admin Timelock contract for future parameter changes",
    ],
    gate: "No custody partner or institutional counterparty will engage with single-key control.",
  },
  {
    seq: "02",
    title: "Reserve Substantiation",
    timing: "Near-term",
    unlock: "Coverage ratio activation · Reserve proof claims",
    items: [
      "Deposit initial physical gold allocation with qualified custodian",
      "Obtain and publish first custody letter with LBMA bar references",
      "Engage Qualified Person for S-K 1300 compliant technical report",
      "Anchor first ProofAnchor hash to Base or Ethereum mainnet",
    ],
    gate: "Claims of reserve-backing are unsubstantiated until physical gold is on deposit with a custody letter.",
  },
  {
    seq: "03",
    title: "Supply Reconciliation",
    timing: "Near-term",
    unlock: "Honest token economics · Investor supply disclosure",
    items: [
      "Publish complete on-chain supply table with mint transaction hashes",
      "Document burn/lock schedule for unminted portion vs circulating",
      "Reconcile 3B minted figure against system reserve coverage calculation",
      "Post reconciliation statement to public supply page",
    ],
    gate: "Institutional counterparties will not accept unreconciled supply figures in any disclosure document.",
  },
  {
    seq: "04",
    title: "Legal & Disclosure Package",
    timing: "Near-term",
    unlock: "Qualified investor solicitation · Reg D filing",
    items: [
      "Complete investor disclosure package: term sheets + offering memorandum",
      "File Form D with the SEC under Regulation D Rule 506(c)",
      "Board legal advisors confirm regulatory framework documentation",
      "Execute NDA template and data room access control procedure",
    ],
    gate: "No qualified investor can legally subscribe without a compliant disclosure package and Reg D filing.",
  },
  {
    seq: "05",
    title: "Production Deployment",
    timing: "Phase III",
    unlock: "Live platform demonstration · Investor portal access",
    items: [
      "Deploy hardened production environment on Cloudflare Pages",
      "Third-party security audit — OWASP, CSP, penetration test",
      "Activate investor portal with live KYC/AML onboarding workflow",
      "Enable authenticated data room access for verified QII counterparties",
    ],
    gate: "Serious institutional counterparties require a live, audited platform — not a staging environment.",
  },
  {
    seq: "06",
    title: "First Capital Close",
    timing: "Phase III",
    unlock: "First revenue event · AUM accumulation begins",
    items: [
      "Complete KYC/AML on first qualified investors through compliance engine",
      "Execute subscription agreements under Reg D framework",
      "Wire cleared capital → USDC/USDT → first DIGAU mint under reserve coverage",
      "Publish first post-close reserve report through approval workflow",
    ],
    gate: "All prior milestones are prerequisites. This is the activation event for the revenue model.",
  },
];

const TIMING_STYLE: Record<string, string> = {
  "Immediate": "text-red-400/80 bg-red-400/10 border-red-400/20",
  "Near-term":  "text-amber-400/80 bg-amber-400/10 border-amber-400/20",
  "Phase III":  "text-gold/70 bg-gold/10 border-gold/20",
};

export default function PathForwardPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Path Forward</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          From Validated Build<br />
          <span className="text-white/45 italic">To Funded Institution.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          The platform is built and the board is seated. What stands between Dignity and
          its first institutional capital close is a sequenced set of identifiable steps —
          not open-ended uncertainty.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Current State Snapshot */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">
          Current State — April 2026
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CURRENT_STATE.map((item) => {
            const s = STATUS_STYLE[item.status];
            return (
              <div key={item.label}
                className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.015]">
                <span className={`h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0 ${s.dot}`} />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 min-w-0">
                  <span className="text-xs text-white/55">{item.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium self-start sm:self-auto flex-shrink-0 ${s.badge}`}>
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-white/30 leading-relaxed max-w-2xl">
          Items marked <span className="text-red-400/80">Open Gap</span> are the specific blockers
          between current state and institutional fundability. Each milestone below closes one or more of them.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Milestones */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-10">
          Sequenced Milestones to First Close
        </h2>

        <div className="space-y-px">
          {MILESTONES.map((m, idx) => (
            <div key={m.seq} className="relative">
              {/* Connector line */}
              {idx < MILESTONES.length - 1 && (
                <div className="absolute left-[1.85rem] top-[4.5rem] w-px h-6 bg-white/[0.08]" />
              )}
              <div className="glass-card mb-2">
                <div className="flex items-start gap-5">
                  {/* Sequence */}
                  <div className="flex-shrink-0 h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center">
                    <span className="text-[11px] text-gold/60 font-mono">{m.seq}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-base font-semibold text-white/90">{m.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${TIMING_STYLE[m.timing]}`}>
                        {m.timing}
                      </span>
                    </div>

                    <div className="mb-4 space-y-1.5">
                      {m.items.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-gold/40 mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-white/50 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-white/[0.025] border border-white/[0.05] px-4 py-2.5">
                      <p className="text-[11px] text-white/35 leading-relaxed">
                        <span className="text-white/20 uppercase tracking-widest text-[9px] font-medium mr-2">Gate</span>
                        {m.gate}
                      </p>
                    </div>

                    <p className="mt-3 text-[10px] text-gold/50">
                      Unlocks: <span className="text-gold/70">{m.unlock}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* Summary statement */}
      <div className="glass-card mb-12 text-center">
        <h2 className="font-serif text-2xl font-light text-white mb-4">
          Six Steps. No Mysteries.
        </h2>
        <p className="text-sm text-white/45 leading-relaxed max-w-2xl mx-auto">
          Every item above is a defined, executable task — not a strategic uncertainty.
          The platform is built. The board is assembled. The controls are operational.
          What remains is institutional maturation on a known path.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/investor-pathway"
          className="btn-primary text-center">
          Investor Engagement Path →
        </Link>
        <Link href="/economics"
          className="btn-outline text-center">
          Revenue Model & Economics
        </Link>
        <Link href="/governance"
          className="px-6 py-3 rounded-xl border border-white/10 text-white/50 text-sm hover:border-white/20 hover:text-white/70 transition-colors text-center">
          Governance Status
        </Link>
      </div>
    </div>
  );
}
