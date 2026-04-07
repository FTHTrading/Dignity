import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Controls & Governance | Dignity" };

const APPROVAL_TYPES = [
  {
    type: "MINT_REQUEST",
    label: "Mint Request",
    desc: "A request to mint new DIGAU tokens must be initiated by an authorised treasury officer and approved by a counterparty with APPROVE_MINT permission. Reserve coverage is evaluated before the approval decision is available.",
    requiredRoles: ["TREASURY_OFFICER", "COMPLIANCE_OFFICER"],
  },
  {
    type: "REDEMPTION_APPROVE",
    label: "Redemption Approval",
    desc: "Redemption requests move through a two-step workflow: creation and approval. The system enforces that the approving user is distinct from the initiating user.",
    requiredRoles: ["TREASURY_OFFICER", "SUPER_ADMIN"],
  },
  {
    type: "VENUE_TOGGLE",
    label: "Venue Status Toggle",
    desc: "Activating or suspending a trading venue requires an approval workflow. Venue status changes do not persist without an approved decision — they cannot be overridden ad hoc.",
    requiredRoles: ["MARKET_OPS", "COMPLIANCE_OFFICER"],
  },
  {
    type: "SPREAD_POLICY_CHANGE",
    label: "Spread Policy Change",
    desc: "Modifications to bid/ask spread parameters require an approval event. Market-maker spread governance is enforced at the approval layer, not merely documented in policy.",
    requiredRoles: ["MARKET_OPS", "SUPER_ADMIN"],
  },
  {
    type: "RESERVE_REPORT_PUBLISH",
    label: "Reserve Report Publication",
    desc: "Reserve reports follow a DRAFT → PUBLISHED lifecycle. Publication requires an approval decision. Once published, the report record is immutable and audit-logged.",
    requiredRoles: ["TREASURY_OFFICER", "COMPLIANCE_OFFICER"],
  },
];

const RESERVE_FACTS = [
  { label: "Reserve Lots", value: "Tracked", detail: "Custodied lots registered with asset class, custodian, valuation, and status." },
  { label: "Coverage Computation", value: "Live", detail: "Coverage ratios calculated from registered lots against outstanding token supply." },
  { label: "Report Lifecycle", value: "DRAFT → PUBLISHED", detail: "Reports cannot be published without an approval decision." },
  { label: "Attestation", value: "Anchored", detail: "Third-party attestation records managed. On-chain anchor via ReserveProofAnchor.sol on Base." },
];

const AUDIT_PROPERTIES = [
  { label: "Model", value: "Append-only" },
  { label: "Hash function", value: "SHA-256" },
  { label: "Linkage", value: "Sequential — each event references previous hash" },
  { label: "Event count", value: "29 (as of Phase II validation)" },
  { label: "Tamper detection", value: "Chain hash mismatch = detectable break" },
  { label: "Storage", value: "PostgreSQL — live database" },
];

const ROLE_MATRIX = [
  { role: "SUPER_ADMIN",        scopes: ["All permissions", "User management", "Emergency controls"] },
  { role: "TREASURY_OFFICER",   scopes: ["Create mint/redeem requests", "Reserve reports", "Treasury flows"] },
  { role: "COMPLIANCE_OFFICER", scopes: ["Approve/reject workflows", "KYC decisions", "Policy enforcement"] },
  { role: "MARKET_OPS",         scopes: ["Venue management", "Spread policy", "Market-maker controls"] },
  { role: "ANALYTICS",          scopes: ["Read-only reporting", "Coverage snapshots", "Issuance history"] },
  { role: "INVESTOR_SERVICES",  scopes: ["Investor records", "Subscription management", "Disclosure delivery"] },
  { role: "AUDITOR",            scopes: ["Read-only audit access", "Event chain export", "Compliance review"] },
  { role: "BOARD_MEMBER",       scopes: ["Board-level reporting", "Governance dashboards"] },
];

export default function ControlsPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Governance & Controls</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Controls That<br />
          <span className="text-white/45 italic">Function.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Every governance control in the Dignity platform is enforced by the system — not
          described in a policy document. Approval workflows, separation of duties, reserve gating,
          and audit logging are operational infrastructure.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Approval workflows */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-2">Approval Workflow Engine</h2>
        <p className="text-xs text-white/35 mb-8 max-w-2xl">
          Five approval types are enforced by the system. Each flows through creation, review, and
          decision stages. Approving users must be distinct from initiating users.
        </p>
        <div className="space-y-3">
          {APPROVAL_TYPES.map((a) => (
            <div key={a.type} className="glass-panel p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                <code className="text-[10px] text-gold/60 font-mono flex-shrink-0 sm:w-44 mt-0.5 uppercase tracking-wider">
                  {a.type}
                </code>
                <h3 className="text-sm font-semibold text-white/80">{a.label}</h3>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-3">{a.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {a.requiredRoles.map((r) => (
                  <span key={r} className="text-[9px] border border-white/10 text-white/30 px-2 py-0.5 rounded-full">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reserve infrastructure */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">Reserve Management Infrastructure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESERVE_FACTS.map((f) => (
            <div key={f.label} className="glass-panel p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white/60">{f.label}</span>
                <span className="text-[9px] bg-gold/10 border border-gold/25 text-gold/70 px-2 py-0.5 rounded-full font-medium">
                  {f.value}
                </span>
              </div>
              <p className="text-xs text-white/35 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audit chain */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">Audit Chain Properties</h2>
        <div className="glass-panel p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AUDIT_PROPERTIES.map((p) => (
              <div key={p.label} className="flex gap-3">
                <div className="h-1 w-1 rounded-full bg-gold/40 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5">{p.label}</div>
                  <div className="text-xs text-white/60">{p.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role matrix */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">Role & Permission Matrix</h2>
        <div className="space-y-2">
          {ROLE_MATRIX.map((r) => (
            <div key={r.role} className="glass-panel px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3">
              <code className="text-xs text-gold/60 font-mono flex-shrink-0 sm:w-48">{r.role}</code>
              <div className="flex flex-wrap gap-2">
                {r.scopes.map((s) => (
                  <span key={s} className="text-[10px] text-white/40 border border-white/[0.08] px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SOD statement */}
      <div className="gold-rule mb-12" />
      <div className="text-center mb-12 px-4">
        <p className="font-serif text-xl md:text-2xl font-light text-white/60 italic leading-snug max-w-2xl mx-auto">
          &ldquo;Separation of duties is not a policy principle at Dignity.
          It is a system constraint. The platform does not allow an initiating
          user to approve their own request.&rdquo;
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/platform"
          className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors text-center">
          Platform Architecture →
        </Link>
        <Link href="/proof"
          className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors text-center">
          Operational Proof
        </Link>
      </div>
    </div>
  );
}
