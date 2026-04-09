import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Platform Status | Dignity" };

// ─── HISTORICAL RECORD ────────────────────────────────────────────────────────

const HISTORY: {
  era: string;
  period: string;
  summary: string;
  items: { label: string; detail: string }[];
}[] = [
  {
    era: "Foundation",
    period: "Phase I — 2024–2025",
    summary: "Strategic thesis, board assembly, and platform architecture established from first principles.",
    items: [
      { label: "Strategic thesis established", detail: "Gold-backed digital securities on institutional capital markets standards — not a crypto project." },
      { label: "Board of Directors seated", detail: "7 directors: David Weild IV (Chairman, NASDAQ/JOBS Act), Richard Allen Perkins (Securities Law), Randy Rowe (Capital Markets), Todd Reiter (Technology), Dr. Michael Repass (Clinical Governance), Dr. Dana Hardin (Reserve Verification), Angeline Cardinal Bendle (Community Sovereignty)." },
      { label: "14-package monorepo architecture", detail: "audit, compliance-engine, token-engine, reserve-registry, treasury, market-ops, exchange-adapters, stablecoin-rails, attestation, analytics, documents, auth, db, ui — all implemented." },
      { label: "PostgreSQL schema + Prisma ORM", detail: "Full relational schema: ReserveLot, TokenSupply, AuditEvent, ApprovalRequest, Investor, TokenTransaction, ReserveReport, Venue, MarketMaker, CustodianAttestation. Migrations applied." },
      { label: "8-role access control system", detail: "SUPER_ADMIN, BOARD_DIRECTOR, TREASURY_OFFICER, COMPLIANCE_OFFICER, MARKET_OPS, INVESTOR, AUDITOR, API_CLIENT — permission-scoped at API layer." },
      { label: "SHA-256 hash-chain audit infrastructure", detail: "Append-only AuditEvent engine. Every write produces a chained event: EventN.hash = SHA256(content + EventN-1.hash). Tamper-evident by construction." },
      { label: "Four-eyes governance invariant", detail: "Proposer ≠ Approver enforced at every API endpoint. No administrative override. No emergency bypass." },
      { label: "Solidity security token contracts", detail: "ERC-1400 security token suite with transfer restrictions, KYC enforcement, and compliance hooks deployed to Hardhat." },
    ],
  },
  {
    era: "Validation",
    period: "Phase II — 2025–2026",
    summary: "Operating evidence produced against a live system. Every critical flow validated end-to-end.",
    items: [
      { label: "All admin pages return HTTP 200", detail: "Every protected route — dashboard, investors, approvals, treasury, issuance, venues, audits, analytics — confirmed under authenticated session." },
      { label: "Write flows verified against live DB", detail: "Mint request creation, approval workflow, venue toggle, reserve report lifecycle, investor creation — all write to live PostgreSQL and confirm on subsequent read." },
      { label: "5 approval types functional", detail: "TOKEN_MINT, TOKEN_REDEMPTION, VENUE_TOGGLE, RESERVE_REPORT, RESERVE_LOT_ADDITION — created, evaluated, decided in live system." },
      { label: "Reserve report lifecycle validated", detail: "DRAFT → PENDING_APPROVAL → APPROVED → PUBLISHED — gated workflow confirmed. Board approval required at each state transition." },
      { label: "Audit chain integrity confirmed", detail: "29 immutable, SHA-256 hash-linked events recorded. Chain integrity verified end-to-end. Every write traced." },
      { label: "TypeScript typecheck clean", detail: "tsc --noEmit passes across the full 14-package monorepo with zero errors. All package boundaries consistent." },
      { label: "Production build passes", detail: "next build completes cleanly. All pages compile. Static routes optimised. Zero critical build warnings." },
      { label: "Compliance engine wired", detail: "KYC/AML checks enforced at subscription and transfer flows. Reg D / Rule 144A accreditation gating operational." },
      { label: "MCP agent mesh — 21 tools, 7 domains", detail: "Audit, Reserve, Token, Approval, Compliance, Market, Analytics — full tool catalog exposed to AI agent layer." },
      { label: "6 AI agent personas operational", detail: "Board Director Agent, Treasury Agent, Compliance Agent, Market Ops Agent, Investor Agent, Audit Agent — each role-scoped with separation of duties mirror." },
    ],
  },
  {
    era: "Public Platform",
    period: "Phase II → III Transition — 2026",
    summary: "Public institutional site built and deployed. On-chain intelligence pages added. Funding system documented.",
    items: [
      { label: "19-route public institutional site built", detail: "Next.js 15 monorepo app with full CSS design system — obsidian/gold palette, glass-card components, gold-rule dividers, btn-primary/btn-outline classes." },
      { label: "On-chain intelligence section added", detail: "4 new pages: /governance (control map, 6-role table, hardening requirements), /supply (3B mint analysis, OLV vs on-chain), /reserve (OLV methodology, 8 claims, 8 proof gaps), /data-room (NDA gate, 4-step access, 5 document categories)." },
      { label: "Funding system built — 3 pages", detail: "/path-forward (6-milestone close sequence with gates), /economics (fee schedule + 4 AUM revenue scenarios $10M–$1B+), /investor-pathway (7-step Reg D engagement process)." },
      { label: "Cloudflare Pages deployment configured", detail: "OpenNext/Cloudflare build, Wrangler deploy pipeline, custom domain dignity.unykorn.org configured." },
      { label: "5 institutional PDF documents generated", detail: "Executive Summary, Proof of Reserve Report, Investor Prospectus, Governance & Compliance Framework, Technology Brief — all DIG-classified, QII-only." },
      { label: "Investor portal scaffolded", detail: "Authenticated /investor/* routes: dashboard, portfolio, subscribe, redeem — NextAuth session-gated, role-scoped." },
    ],
  },
];

// ─── CURRENT STATE ────────────────────────────────────────────────────────────

const CURRENT: {
  category: string;
  items: { label: string; value: string; status: "done" | "caution" | "gap" | "active" }[];
}[] = [
  {
    category: "Platform Infrastructure",
    items: [
      { label: "Monorepo build",          value: "Clean — 0 TS errors, 36 routes",    status: "done"    },
      { label: "Admin panel",             value: "All pages HTTP 200",                 status: "done"    },
      { label: "Audit chain",             value: "29 events, SHA-256 linked",          status: "done"    },
      { label: "Compliance engine",       value: "Operational",                        status: "done"    },
      { label: "MCP agent mesh",          value: "21 tools, 6 personas active",        status: "done"    },
      { label: "Public site",             value: "Built — awaiting production deploy", status: "active"  },
    ],
  },
  {
    category: "Governance & Control",
    items: [
      { label: "Board composition",       value: "7 directors seated",                 status: "done"    },
      { label: "Four-eyes invariant",     value: "Enforced at API layer",              status: "done"    },
      { label: "On-chain governance",     value: "Single EOA — no multisig",          status: "gap"     },
      { label: "Admin Timelock",          value: "Not deployed",                       status: "gap"     },
    ],
  },
  {
    category: "Reserve & Token",
    items: [
      { label: "Token supply minted",     value: "3,000,000,000 DIGAU",               status: "caution" },
      { label: "Physical gold vaulted",   value: "0 oz on record",                    status: "gap"     },
      { label: "Custody statements",      value: "None on file",                      status: "gap"     },
      { label: "QP attestation",          value: "Not yet engaged",                   status: "gap"     },
      { label: "Supply reconciliation",   value: "Unreconciled",                      status: "gap"     },
      { label: "Coverage ratio",          value: "Cannot compute — 0 reserve",        status: "gap"     },
    ],
  },
  {
    category: "Legal & Compliance",
    items: [
      { label: "Reg D / Rule 144A engine", value: "Operational in platform",          status: "done"    },
      { label: "Form D filing",            value: "Not filed",                        status: "gap"     },
      { label: "Investor disclosure pkg",  value: "Not finalized",                    status: "gap"     },
      { label: "Board legal review",       value: "Not yet commenced",                status: "gap"     },
      { label: "NDA template",             value: "Not executed",                     status: "gap"     },
    ],
  },
  {
    category: "Market & Commercial",
    items: [
      { label: "Exchange adapter infra",  value: "Built — no venue active",           status: "active"  },
      { label: "ATS engagement",          value: "Not commenced",                     status: "gap"     },
      { label: "First investor signed",   value: "None",                              status: "gap"     },
      { label: "Capital raised",          value: "$0",                                status: "gap"     },
    ],
  },
];

const STATUS_DOT: Record<string, string> = {
  done:    "bg-emerald-500",
  active:  "bg-gold animate-pulse",
  caution: "bg-amber-400",
  gap:     "bg-red-500/50",
};
const STATUS_BADGE: Record<string, string> = {
  done:    "text-emerald-400/80 bg-emerald-400/10 border-emerald-400/20",
  active:  "text-gold/80 bg-gold/10 border-gold/25",
  caution: "text-amber-400/80 bg-amber-400/10 border-amber-400/20",
  gap:     "text-red-400/70 bg-red-400/[0.07] border-red-400/15",
};

// ─── FORWARD TIMELINE ─────────────────────────────────────────────────────────

const TIMELINE: {
  seq: string;
  title: string;
  horizon: string;
  phase: string;
  priority: "critical" | "high" | "medium" | "planned";
  tracks: string[];
  deliverables: string[];
  unblocks: string;
  dependency: string | null;
}[] = [
  {
    seq:  "T-01",
    title: "Governance Hardening",
    horizon: "April 2026",
    phase: "Immediate",
    priority: "critical",
    tracks: ["Governance", "Security"],
    deliverables: [
      "Migrate single EOA → 3-of-5 multisig (board key holders)",
      "Document key custodian procedure for each signer",
      "Publish on-chain governance change + signed board resolution",
      "Deploy Admin Timelock contract (48-hr delay on parameter changes)",
    ],
    unblocks: "Custody partner engagement · Any institutional counterparty discussion",
    dependency: null,
  },
  {
    seq:  "T-02",
    title: "Supply Reconciliation",
    horizon: "April–May 2026",
    phase: "Immediate",
    priority: "critical",
    tracks: ["Token Lifecycle", "Disclosure"],
    deliverables: [
      "Publish on-chain supply table with all mint transaction hashes",
      "Classify token allocation: circulating vs locked vs treasury reserve",
      "Document burn/lock schedule — timeline and trigger conditions",
      "Post reconciliation statement to /supply with source data links",
    ],
    unblocks: "Honest investor disclosure · Coverage ratio calculation · Form D filing",
    dependency: null,
  },
  {
    seq:  "T-03",
    title: "Production Deployment",
    horizon: "April–May 2026",
    phase: "Immediate",
    priority: "critical",
    tracks: ["Infrastructure", "Public Presence"],
    deliverables: [
      "Deploy to Cloudflare Pages on dignity.unykorn.org",
      "Harden environment: CSP headers, HSTS, secrets management",
      "Verify all 36 routes live under production config",
      "Enable edge caching and DDoS protection via Cloudflare",
    ],
    unblocks: "All investor-facing activities · Credibility with counterparties",
    dependency: null,
  },
  {
    seq:  "T-04",
    title: "First Custody Deposit",
    horizon: "May 2026",
    phase: "Near-term",
    priority: "critical",
    tracks: ["Reserve", "Legal"],
    deliverables: [
      "Execute custody agreement with qualified custodian (LBMA-accredited)",
      "Deposit initial physical gold allocation — minimum 1 reserve lot",
      "Obtain first custody letter with LBMA bar serial references",
      "Enter reserve lot into platform Reserve Registry",
      "Coverage ratio computable for first time",
    ],
    unblocks: "Reserve-backing claims substantiated · Coverage ratio live · First mint gating active",
    dependency: "T-01 — custody partner requires multisig governance",
  },
  {
    seq:  "T-05",
    title: "Legal Package & Form D",
    horizon: "May–June 2026",
    phase: "Near-term",
    priority: "critical",
    tracks: ["Legal / Compliance", "Investor Relations"],
    deliverables: [
      "Finalize investor disclosure package — offering memorandum + term sheets",
      "Board legal advisors (Richard Allen Perkins) sign off on regulatory framework",
      "File Form D with SEC under Regulation D Rule 506(c)",
      "Execute NDA template — bilateral, DocuSign-ready",
      "Activate data room access control for verified QII counterparties",
    ],
    unblocks: "Qualified investor solicitation legally authorized · Data room activation",
    dependency: "T-02 — supply figures must be reconciled before disclosure package",
  },
  {
    seq:  "T-06",
    title: "Qualified Person Engagement",
    horizon: "June 2026",
    phase: "Near-term",
    priority: "high",
    tracks: ["Reserve", "Legal / Compliance"],
    deliverables: [
      "Engage QP under S-K 1300 for technical reserve report",
      "Provide access to custody documentation and reserve lot data",
      "QP technical report drafted and reviewed by Dr. Dana Hardin",
      "Publish QP report summary to /reserve page",
    ],
    unblocks: "Mining/reserve disclosure credibility · S-K 1300 compliance · Institutional trust",
    dependency: "T-04 — QP needs physical gold on deposit to certify",
  },
  {
    seq:  "T-07",
    title: "Security Audit",
    horizon: "June 2026",
    phase: "Near-term",
    priority: "high",
    tracks: ["Security", "Infrastructure"],
    deliverables: [
      "Third-party penetration test — web application + API layer",
      "OWASP Top 10 review against production-deployed platform",
      "Smart contract audit — security token suite + ProofAnchor",
      "Remediate all critical and high findings before first investor onboarding",
      "Publish audit summary to technology brief document",
    ],
    unblocks: "Investor portal activation · Institutional due diligence completion",
    dependency: "T-03 — audit requires production environment",
  },
  {
    seq:  "T-08",
    title: "On-Chain Proof Anchoring",
    horizon: "June–July 2026",
    phase: "Phase III",
    priority: "high",
    tracks: ["Technical", "Reserve"],
    deliverables: [
      "Deploy ReserveProofAnchor.sol to Base mainnet",
      "Anchor first reserve report hash to chain — immutable public record",
      "Wire platform approval workflow → on-chain anchor on PUBLISHED",
      "Publish on-chain anchor reference on /proof-center",
    ],
    unblocks: "Verifiable on-chain proof of reserve · External audit trail",
    dependency: "T-04 — requires real reserve data to anchor",
  },
  {
    seq:  "T-09",
    title: "Investor Portal Activation",
    horizon: "July 2026",
    phase: "Phase III",
    priority: "high",
    tracks: ["Product", "Investor Relations"],
    deliverables: [
      "Activate live KYC/AML onboarding workflow via compliance engine",
      "Enable accredited investor verification under Regulation D",
      "Investor dashboard live — portfolio, coverage ratio, reserve reports",
      "Subscription flow: wire → USDC/USDT → mint request → board approval",
      "Authenticated data room access for APPROVED investors",
    ],
    unblocks: "First investor onboarding · Legal subscription execution · Capital receipt",
    dependency: "T-05, T-07 — requires legal package + security audit",
  },
  {
    seq:  "T-10",
    title: "First Capital Close",
    horizon: "Q3 2026",
    phase: "Phase III",
    priority: "high",
    tracks: ["Commercial", "Token Lifecycle"],
    deliverables: [
      "KYC/AML on 1–3 qualified seed investors via compliance engine",
      "Execute subscription agreements under Reg D Rule 506(c)",
      "Wire cleared capital → USDC → treasury",
      "First DIGAU mint: board-gated approval, reserve coverage ≥ 1.000",
      "Publish first post-close reserve report through approval workflow",
      "Issuance spread revenue event: 0.50% of notional",
    ],
    unblocks: "Revenue model activated · AUM accumulation begins · Platform credibility established",
    dependency: "T-09 — investor portal required; all T-01 through T-08 prerequisites",
  },
  {
    seq:  "T-11",
    title: "ATS Venue Onboarding",
    horizon: "Q3–Q4 2026",
    phase: "Phase III",
    priority: "medium",
    tracks: ["Market Structure", "Commercial"],
    deliverables: [
      "Identify and engage first ATS partner for DIGAU secondary market",
      "Execute venue agreement — spread policy, market maker terms",
      "Board vote: Venue Toggle approval via platform workflow",
      "Wire exchange-adapter integration to live ATS endpoints",
      "Randy Rowe (Capital Markets Director) oversees MM governance",
    ],
    unblocks: "Secondary market liquidity · Investor exit pathway · Transfer fee revenue",
    dependency: "T-10 — requires live token holders before ATS engagement is credible",
  },
  {
    seq:  "T-12",
    title: "External Attestation Program",
    horizon: "Q4 2026",
    phase: "Phase III",
    priority: "medium",
    tracks: ["Reserve", "Legal / Compliance"],
    deliverables: [
      "Engage independent third-party reserve attestor (Big 4 preferred)",
      "Quarterly attestation letters covering all reserve lots",
      "Attestation letters published through CustodianAttestation model",
      "Link attestation hashes to on-chain ProofAnchor",
    ],
    unblocks: "Institutional-grade reserve credibility · NAV reporting · LP-quality investor access",
    dependency: "T-06 — QP report prerequisite for attestor engagement",
  },
  {
    seq:  "T-13",
    title: "x402 Agent Payment Rail",
    horizon: "Q1 2027",
    phase: "Phase IV",
    priority: "planned",
    tracks: ["Technical", "Revenue"],
    deliverables: [
      "Activate x402 pay-per-invocation on MCP tool endpoints",
      "Wire ATP (Apostle Chain) settlement to agent mesh",
      "Per-tool micro-fee billing: Ed25519 signed, real-time settlement",
      "Agent billing dashboard for API clients",
      "Compliance API + Analytics API subscription activation",
    ],
    unblocks: "Programmatic revenue stream · AI agent commerce layer · Partner API monetization",
    dependency: "T-10 — requires live commercial platform before agent billing is meaningful",
  },
  {
    seq:  "T-14",
    title: "Scaled AUM Growth",
    horizon: "2027+",
    phase: "Phase IV",
    priority: "planned",
    tracks: ["Commercial", "Market Structure"],
    deliverables: [
      "Expand investor base to $50M+ AUM",
      "Second ATS venue engagement",
      "Maya track: parallel program under @platform/* shared-core extraction",
      "Analytics API commercialization — institutional data product",
      "Annual custody fee revenue stream: 0.20% × AUM quarterly",
    ],
    unblocks: "Institutional-scale revenue · Platform as infrastructure · Multi-program model",
    dependency: "T-11, T-12 — requires ATS liquidity and attestation program",
  },
];

const PRIORITY_STYLE: Record<string, { badge: string; label: string }> = {
  critical: { badge: "text-red-400/80 bg-red-400/10 border-red-400/20",       label: "Critical" },
  high:     { badge: "text-amber-400/80 bg-amber-400/10 border-amber-400/20", label: "High"     },
  medium:   { badge: "text-gold/70 bg-gold/10 border-gold/20",                label: "Medium"   },
  planned:  { badge: "text-white/30 bg-white/[0.03] border-white/10",         label: "Planned"  },
};

const PHASE_COLOR: Record<string, string> = {
  "Immediate": "border-l-red-500/50",
  "Near-term": "border-l-amber-400/40",
  "Phase III": "border-l-gold/40",
  "Phase IV":  "border-l-white/15",
};

export default function StatusPage() {
  const doneCount    = CURRENT.flatMap(c => c.items).filter(i => i.status === "done").length;
  const activeCount  = CURRENT.flatMap(c => c.items).filter(i => i.status === "active").length;
  const gapCount     = CURRENT.flatMap(c => c.items).filter(i => i.status === "gap").length;
  const cautionCount = CURRENT.flatMap(c => c.items).filter(i => i.status === "caution").length;

  return (
    <div className="max-w-5xl mx-auto px-8 py-20">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Platform Status</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Full Record.<br />
          <span className="text-white/45 italic">Complete Timeline.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Everything built. Everything outstanding. The complete operational picture
          from founding through first capital close and beyond.
        </p>
      </div>

      {/* Status summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
        {[
          { label: "Completed",  count: doneCount,    color: "text-emerald-400", sub: "items verified"  },
          { label: "Active",     count: activeCount,  color: "text-gold/80",     sub: "in progress"     },
          { label: "Flagged",    count: cautionCount, color: "text-amber-400",   sub: "needs attention"  },
          { label: "Open Gaps",  count: gapCount,     color: "text-red-400/80",  sub: "blocking progress"},
        ].map((s) => (
          <div key={s.label} className="glass-card text-center py-5">
            <p className={`text-4xl font-mono font-light mb-1 ${s.color}`}>{s.count}</p>
            <p className="text-xs font-semibold text-white/70 mb-0.5">{s.label}</p>
            <p className="text-[10px] text-white/25">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="gold-rule mb-14" />

      {/* ── SECTION 1: HISTORICAL RECORD ── */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-10">
          Historical Record — What Has Been Built
        </h2>

        <div className="space-y-10">
          {HISTORY.map((era) => (
            <div key={era.era}>
              <div className="flex flex-wrap items-baseline gap-4 mb-5">
                <h3 className="text-lg font-serif font-light text-white">{era.era}</h3>
                <span className="text-[10px] text-gold/50 font-mono uppercase tracking-widest">{era.period}</span>
              </div>
              <p className="text-xs text-white/35 mb-4 leading-relaxed max-w-2xl">{era.summary}</p>
              <div className="space-y-2">
                {era.items.map((item) => (
                  <div key={item.label}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                    <svg className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-white/65 mb-0.5">{item.label}</p>
                      <p className="text-[11px] text-white/30 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* ── SECTION 2: CURRENT STATE ── */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium">
            Current State — April 2026
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/25 bg-gold/5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] text-gold/70 font-medium">We are here</span>
          </div>
        </div>

        <div className="space-y-8">
          {CURRENT.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-[10px] text-white/20 uppercase tracking-widest font-medium mb-3">{cat.category}</h3>
              <div className="space-y-1.5">
                {cat.items.map((item) => (
                  <div key={item.label}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                    <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[item.status]}`} />
                    <span className="text-xs text-white/50 flex-1">{item.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${STATUS_BADGE[item.status]}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-[10px] text-white/25">
          {[
            { dot: "bg-emerald-500",    label: "Complete" },
            { dot: "bg-gold",           label: "Active / In progress" },
            { dot: "bg-amber-400",      label: "Needs attention" },
            { dot: "bg-red-500/50",     label: "Open gap — blocking" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${l.dot}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* ── SECTION 3: FORWARD TIMELINE ── */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-3">
          Forward Timeline — What Must Happen
        </h2>
        <p className="text-xs text-white/25 mb-10 leading-relaxed max-w-xl">
          14 sequenced milestones from immediate blockers through Phase IV scale. Each item includes
          the dependency that gates it and the capability it unlocks.
        </p>

        {/* Phase legend */}
        <div className="flex flex-wrap gap-3 mb-8 text-[10px]">
          {[
            { phase: "Immediate", color: "border-red-500/50",   label: "April 2026" },
            { phase: "Near-term", color: "border-amber-400/40", label: "May–June 2026" },
            { phase: "Phase III", color: "border-gold/40",      label: "Q3–Q4 2026" },
            { phase: "Phase IV",  color: "border-white/15",     label: "2027+" },
          ].map((p) => (
            <div key={p.phase} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-l-2 bg-white/[0.02] border border-white/[0.05] ${p.color}`}>
              <span className="text-white/50 font-medium">{p.phase}</span>
              <span className="text-white/25">{p.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {TIMELINE.map((t, idx) => (
            <div key={t.seq} className="relative">
              {idx < TIMELINE.length - 1 && (
                <div className="absolute left-[2.1rem] top-[5rem] w-px h-4 bg-white/[0.06]" />
              )}
              <div className={`glass-card border-l-2 ${PHASE_COLOR[t.phase]}`}>
                <div className="flex items-start gap-4">
                  {/* Sequence number */}
                  <div className="flex-shrink-0 h-9 w-9 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
                    <span className="text-[10px] text-gold/50 font-mono">{t.seq}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white/90">{t.title}</h3>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${PRIORITY_STYLE[t.priority].badge}`}>
                        {PRIORITY_STYLE[t.priority].label}
                      </span>
                      <span className="text-[9px] text-white/20 font-mono">{t.horizon}</span>
                    </div>

                    {/* Tracks */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {t.tracks.map((tr) => (
                        <span key={tr} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/30 border border-white/[0.05]">
                          {tr}
                        </span>
                      ))}
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-1 mb-3">
                      {t.deliverables.map((d) => (
                        <div key={d} className="flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-gold/30 mt-1.5 flex-shrink-0" />
                          <span className="text-[11px] text-white/45 leading-relaxed">{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div className="flex flex-wrap gap-3">
                      <div className="rounded-md bg-white/[0.02] border border-white/[0.04] px-3 py-1.5 flex-1 min-w-0">
                        <p className="text-[10px] text-gold/50 leading-relaxed">
                          <span className="text-white/15 uppercase tracking-widest text-[8px] font-medium mr-1.5">Unlocks</span>
                          {t.unblocks}
                        </p>
                      </div>
                      {t.dependency && (
                        <div className="rounded-md bg-white/[0.02] border border-white/[0.04] px-3 py-1.5">
                          <p className="text-[10px] text-white/25">
                            <span className="text-white/15 uppercase tracking-widest text-[8px] font-medium mr-1.5">Depends on</span>
                            {t.dependency}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* Summary close */}
      <div className="glass-card mb-12 text-center">
        <h2 className="font-serif text-2xl font-light text-white mb-4">
          The Work Is Known. The Path Is Clear.
        </h2>
        <p className="text-sm text-white/40 leading-relaxed max-w-2xl mx-auto mb-2">
          3 phases completed. 14 milestones to first institutional scale.
          No structural unknowns — only execution.
        </p>
        <p className="text-xs text-white/25 max-w-xl mx-auto">
          Critical path: T-01 Governance → T-03 Deploy → T-04 Custody → T-05 Legal → T-09 Portal → T-10 First Close.
          Estimated: 90–120 days with active execution.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/path-forward"    className="btn-primary text-center">Detailed Path Forward →</Link>
        <Link href="/investor-pathway" className="btn-outline text-center">Investor Pathway</Link>
        <Link href="/economics"
          className="px-6 py-3 rounded-xl border border-white/10 text-white/50 text-sm hover:border-white/20 hover:text-white/70 transition-colors text-center">
          Economics
        </Link>
      </div>
    </div>
  );
}
