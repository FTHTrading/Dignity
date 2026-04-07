import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Evolution | Dignity" };

const TIMELINE = [
  {
    phase: "Phase I",
    label: "Strategic Foundation",
    period: "Architecture & Direction",
    status: "completed",
    items: [
      "Distinguished leadership and board assembled",
      "Institutional market thesis defined",
      "Architecture and platform vision established",
      "Core infrastructure packages scoped: 14 packages across treasury, compliance, reserve, audit, and token management",
      "Initial platform buildout commenced",
    ],
    note: "In this phase, Dignity's value proposition was being evaluated through architecture, positioning, and directional buildout. The leadership foundation and strategic thesis were in place.",
  },
  {
    phase: "Phase II",
    label: "Operational Validation",
    period: "Runtime Proof & Tightening",
    status: "current",
    items: [
      "Live database connection confirmed against production schema",
      "Schema migration current — all models validated in a single coherent migration",
      "Seed procedure verified — program, security class, reserve data, venues, and approval requests all seed successfully",
      "All eight core admin pages return HTTP 200 with authenticated sessions",
      "Critical write flows persist end-to-end: mint requests, redemption requests, approval decisions, reserve-report publishing, venue toggle, and spread-policy changes",
      "TypeScript typecheck passes with zero errors",
      "Production build passes cleanly",
      "Audit route migrated from static demo data to live DB-backed query with SHA-256 hash-chain integrity — 29 events confirmed across chain",
    ],
    note: "The distinction here is material: the company can now be presented not only as an organisation with credible leadership and a strong thesis, but as one backed by validated operating infrastructure.",
  },
  {
    phase: "Phase III",
    label: "Institutional Maturation",
    period: "Public Presentation & Compliance",
    status: "upcoming",
    items: [
      "Public no-login institutional site at dignity.unykorn.org",
      "Polished disclosure and proof-center pages for external counterparties",
      "Formal legal and compliance packaging",
      "Reserve methodology presentation and third-party attestation coordination",
      "External counterparty and partner workflows",
      "Production deployment hardening",
      "Selective public-safe metrics and document publication",
      "Institutional inquiry funnel and data-room posture",
    ],
    note: "This is maturation work, not repair work. The platform has the operational foundation to support it.",
  },
];

export default function EvolutionPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      {/* Hero */}
      <div className="mb-20">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Platform Evolution</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Where Dignity Was.<br />
          <span className="text-white/50">Where Dignity Is Now.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          This is not a story of correction. It is a story of disciplined advancement — from a
          strong strategic and leadership foundation into a tighter, more fully articulated
          institutional operating environment.
        </p>
      </div>

      <div className="gold-rule mb-16" />

      {/* Two-column narrative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest">Where Dignity Was</h2>
          <p className="text-white/70 leading-relaxed">
            Dignity had the essential ingredients of an institutional story: experienced leadership,
            a differentiated market thesis, and a platform vision oriented toward serious capital
            markets participation. The value proposition was being established through architecture,
            positioning, and directional buildout.
          </p>
          <p className="text-white/50 leading-relaxed text-sm">
            At that stage, much of the operating evidence was prospective. The platform was built
            toward its intended state — a well-organised, credible effort, but one that was more
            clearly evaluated through its strategic framing than through demonstrated operating proof.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gold/70 uppercase tracking-widest">Where Dignity Is Now</h2>
          <p className="text-white/70 leading-relaxed">
            Dignity is now in a stronger operational position. The platform has been advanced into a
            runtime-validated state — with live persistence, functioning workflows, working
            administrative controls, reserve-report infrastructure, venue and liquidity governance,
            and an audit-backed event trail with hash-chain integrity.
          </p>
          <p className="text-white/50 leading-relaxed text-sm">
            The system has been tested end to end, with all key flows persisting successfully and
            the application passing both typecheck and production build validation. External parties
            can now evaluate validated controls and workflows, not vision alone.
          </p>
        </div>
      </div>

      {/* Core statement */}
      <div className="glass-panel p-8 mb-20 text-center">
        <p className="font-serif text-xl md:text-2xl text-white/80 leading-relaxed italic">
          "Before, the emphasis was on the architecture of the vision.{" "}
          <span className="not-italic text-white font-light">Today, there is a validated platform behind that vision.</span>"
        </p>
      </div>

      {/* Phase timeline */}
      <div className="space-y-12">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium">Three-Phase Progression</h2>
        {TIMELINE.map((phase, i) => (
          <div key={i} className="relative pl-8 border-l border-white/[0.08]">
            <div className={`absolute -left-2 top-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
              phase.status === "completed" ? "border-gold bg-gold/20" :
              phase.status === "current"   ? "border-gold bg-gold/40 shadow-gold-glow" :
                                             "border-white/20 bg-white/5"
            }`}>
              {phase.status === "completed" && <span className="text-gold text-[8px]">✓</span>}
              {phase.status === "current"   && <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-white/25 uppercase tracking-widest">{phase.phase}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    phase.status === "completed" ? "border-gold/30 text-gold/70 bg-gold/5" :
                    phase.status === "current"   ? "border-gold/60 text-gold bg-gold/10" :
                                                   "border-white/15 text-white/40"
                  }`}>
                    {phase.status === "completed" ? "Complete" : phase.status === "current" ? "Current Phase" : "Forthcoming"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{phase.label}</h3>
                <p className="text-sm text-white/35 mt-0.5">{phase.period}</p>
              </div>

              <ul className="space-y-1.5">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/55">
                    <span className={`mt-1.5 h-1 w-1 rounded-full flex-shrink-0 ${
                      phase.status === "completed" ? "bg-gold/60" :
                      phase.status === "current"   ? "bg-gold" : "bg-white/20"
                    }`} />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-white/35 italic border-l-2 border-white/[0.08] pl-4 leading-relaxed">
                {phase.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="gold-rule my-16" />

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/fundability"
          className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors text-center">
          Why This Improves Fundability →
        </Link>
        <Link href="/platform"
          className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors text-center">
          View Platform Architecture
        </Link>
      </div>
    </div>
  );
}
