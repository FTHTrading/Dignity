import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Investment Fundability | Dignity" };

const BEFORE: { label: string; detail: string }[] = [
  { label: "Case was primarily strategic", detail: "Dignity's investment narrative rested on thesis, board composition, and market structure vision — all compelling, but pre-operational." },
  { label: "No live system evidence", detail: "Counterparties could evaluate the concept and team. They could not evaluate running software against live data." },
  { label: "Architecture was documented", detail: "The platform design was specified and structured. The question of whether it had been built and validated remained open." },
  { label: "Governance described, not demonstrated", detail: "Controls, approval workflows, and audit infrastructure were specified. They had not yet been confirmed as operating." },
];

const NOW: { label: string; detail: string }[] = [
  { label: "Operational evidence is available", detail: "A live database holds validated state. Write flows persist. Pages load under authenticated session. Approval chains function. The system operates." },
  { label: "Audit chain is intact", detail: "29 immutable, hash-linked audit events span the operational period. Every action is traceable. Every write is logged with a cryptographic reference to its predecessor." },
  { label: "Controls are functional, not theoretical", detail: "Approval requests of multiple types — mint, redemption, venue toggle, spread policy, reserve publication — have been created, evaluated, and decided in the live system." },
  { label: "Reserve infrastructure is operational", detail: "Reserve reports move from DRAFT to PUBLISHED through an approval-gated workflow. Reserve lots are tracked. Coverage ratios are computed. Attestation anchoring is wired." },
];

const WHAT_COUNTERPARTIES_LOOK_FOR = [
  { heading: "Operating evidence", body: "Does the system work? Can it be shown to work against a live database? Are write flows verified?" },
  { heading: "Auditability", body: "Can every action be traced? Is there an append-only record with integrity guarantees? Is the event sequence tamper-evident?" },
  { heading: "Governance structure", body: "Is there separation of duties? Are approval workflows enforced by the system, not just policy? Do controls function independently of human discretion?" },
  { heading: "Reserve discipline", body: "Is reserve management implemented, not just described? Are coverage ratios gated before issuance? Is attestation infrastructure in place?" },
  { heading: "Institutional team", body: "Is leadership credentialed and domain-specific? Is the board composition appropriate for the compliance environment? Is there continuity of oversight?" },
];

export default function FundabilityPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Investment Fundability</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          The Operational<br />
          <span className="text-white/45 italic">Institutional Case.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Before, Dignity&rsquo;s institutional case was primarily strategic. Today, it is
          increasingly operational. That distinction matters to sophisticated counterparties.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Before / Now */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16">
        {/* Before */}
        <div className="bg-obsidian p-8">
          <div className="mb-6">
            <div className="text-[10px] text-white/25 uppercase tracking-[0.25em] font-medium mb-1">Before</div>
            <h2 className="text-lg font-serif font-light text-white">Strategic Foundation</h2>
          </div>
          <div className="space-y-5">
            {BEFORE.map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="h-1 w-1 rounded-full bg-white/20 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white/60 mb-1">{item.label}</div>
                  <div className="text-xs text-white/35 leading-relaxed">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Now */}
        <div className="bg-graphite p-8">
          <div className="mb-6">
            <div className="text-[10px] text-gold/60 uppercase tracking-[0.25em] font-medium mb-1">Today</div>
            <h2 className="text-lg font-serif font-light text-white">Operational Validation</h2>
          </div>
          <div className="space-y-5">
            {NOW.map((item) => (
              <div key={item.label} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold/70 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white/80 mb-1">{item.label}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Central statement */}
      <div className="text-center mb-16 px-4">
        <p className="font-serif text-2xl md:text-3xl font-light text-white/70 italic leading-snug max-w-3xl mx-auto">
          &ldquo;Operational evidence does not replace the strategic story.
          It substantiates it — and materially reduces the execution risk
          that counterparties must price into any institutional decision.&rdquo;
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* What counterparties look for */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">
          What Institutional Counterparties Evaluate
        </h2>
        <div className="space-y-3">
          {WHAT_COUNTERPARTIES_LOOK_FOR.map((item, i) => (
            <div key={item.heading} className="glass-panel px-5 py-4 flex items-start gap-4">
              <div className="text-[10px] text-gold/40 font-mono flex-shrink-0 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="text-xs font-semibold text-white/75 mb-0.5">{item.heading}</div>
                <div className="text-xs text-white/40 leading-relaxed">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What remains */}
      <div className="glass-panel p-8 mb-12">
        <h2 className="text-sm font-semibold text-white mb-3">What Remains Before Full Fundability</h2>
        <p className="text-xs text-white/45 leading-relaxed mb-5">
          The platform is operationally validated. The remaining steps are institutional refinements,
          not structural gaps. They include: finalization of the public-facing site, completion of the
          investor disclosure package, deployment to a production-hardened environment, and engagement
          with the legal and compliance advisors on the board to confirm the regulatory framework
          documentation is current with the operational evidence.
        </p>
        <p className="text-xs text-white/30 leading-relaxed">
          These are sequenced, identifiable tasks — not open-ended blockers. They represent the
          final phase of the institutional maturation process that the board and leadership team
          are actively executing.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/proof"
          className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors text-center">
          View Proof Center →
        </Link>
        <Link href="/controls"
          className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors text-center">
          Governance & Controls
        </Link>
      </div>
    </div>
  );
}
