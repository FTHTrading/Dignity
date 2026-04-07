import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Institutional Inquiry | Dignity" };

const INQUIRY_TYPES = [
  "LP & Capital Commitment",
  "Strategic Partnership",
  "Compliance & Legal Review",
  "Due Diligence & NDA",
  "Technical Architecture Review",
  "Board & Governance",
  "Custody & Settlement",
  "Other",
];

const CHANNELS = [
  {
    label: "Institutional Relations",
    value: "inquiries@dignity.unykorn.org",
    note: "LP introductions, capital commitments, and qualified counterparty onboarding.",
  },
  {
    label: "Compliance & Legal",
    value: "compliance@dignity.unykorn.org",
    note: "KYC/AML verification, Reg D/S eligibility, and legal counsel coordination.",
  },
  {
    label: "Platform Architecture",
    value: "platform@dignity.unykorn.org",
    note: "Infrastructure review, API integration, and technical due diligence.",
  },
];

const CAPABILITIES = [
  { stat: "100+", label: "Production Modules" },
  { stat: "13",   label: "Blockchain Integrations" },
  { stat: "4",    label: "Qualified Custodians" },
  { stat: "8",    label: "Regulatory Jurisdictions" },
  { stat: "21",   label: "MCP Agent Tools" },
  { stat: "7",    label: "Board Members" },
];

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      {/* Header — what we built */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Institutional Inquiry</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          The Infrastructure<br />
          <span className="text-white/45 italic">Is Built.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Dignity is a fully-engineered institutional operating platform — not a roadmap.
          Every layer described on this site is production code: Rust performance core,
          multi-custodian MPC custody, 13-chain settlement, deterministic compliance engine,
          and AI-native agent operations. We built this to help institutional LPs evaluate,
          commit to, and participate in gold-backed digital securities with the same rigor
          they expect from traditional capital markets.
        </p>
        <p className="mt-4 text-sm text-white/35 max-w-2xl leading-relaxed">
          What you see here — the audit chain, the four-eyes governance, the reserve registry,
          the hash-linked proof architecture — is running infrastructure. We welcome qualified
          counterparties who want to see it firsthand.
        </p>
      </div>

      {/* Capability stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-14">
        {CAPABILITIES.map((c) => (
          <div key={c.label} className="glass-panel p-4 text-center">
            <div className="text-2xl font-light text-gold mb-1">{c.stat}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider leading-tight">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="gold-rule mb-14" />

      {/* What we deliver to LPs */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-6">What We Deliver</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Operational Validation",
              desc: "Live persistence, functioning approval workflows, SHA-256 hash-chain audit trail, and runtime-enforced coverage ratios. Not slides — running systems.",
            },
            {
              title: "Institutional-Grade Custody",
              desc: "Fireblocks MPC (6 modules, 12 vault roles), BitGo, Anchorage Digital, and APMEX + Brink's for physical gold. 3-of-5 multi-sig with geographically distributed keys.",
            },
            {
              title: "Regulatory Readiness",
              desc: "Full Reg D/S compliance engine, KYC/AML pipeline (Persona, Middesk, ComplyAdvantage), accreditation verification (Parallel Markets), across 8 jurisdictions.",
            },
            {
              title: "Machine-Readable Operations",
              desc: "21 MCP tools across 7 domains with 6 supervised AI agent personas. The first institutional platform where machines can read and verify operational state in real-time.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-panel p-5">
              <p className="text-sm font-semibold text-white/80 mb-2">{item.title}</p>
              <p className="text-xs text-white/35 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Form */}
        <div className="md:col-span-3">
          <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-6">Start a Conversation</h2>
          <form
            action="mailto:inquiries@dignity.unykorn.org"
            method="GET"
            encType="text/plain"
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-wider" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-wider" htmlFor="org">
                  Organisation
                </label>
                <input
                  id="org"
                  name="org"
                  type="text"
                  required
                  autoComplete="organization"
                  className="w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Firm or institution"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-wider" htmlFor="role">
                Role / Title
              </label>
              <input
                id="role"
                name="role"
                type="text"
                autoComplete="organization-title"
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Managing Director, General Counsel, etc."
              />
            </div>

            <div>
              <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-wider" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="you@institution.com"
              />
            </div>

            <div>
              <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-wider" htmlFor="subject">
                Nature of Inquiry
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:border-gold/50 transition-colors appearance-none"
              >
                <option value="" className="bg-obsidian">Select a category</option>
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-obsidian bg-opacity-100">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-wider" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="body"
                rows={5}
                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                placeholder="Describe your inquiry — capital commitment interest, integration scope, or diligence requirements."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors"
            >
              Submit Inquiry
            </button>

            <p className="text-[10px] text-white/20 text-center leading-relaxed">
              By submitting, you confirm that you are a qualified institutional counterparty.
              This form does not constitute an offer or solicitation of any kind.
            </p>
          </form>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-5">Direct Channels</h2>
            <div className="space-y-4">
              {CHANNELS.map((c) => (
                <div key={c.label} className="glass-panel p-4">
                  <div className="text-[10px] text-white/25 uppercase tracking-widest mb-1">{c.label}</div>
                  <div className="text-xs text-gold/70 font-mono break-all mb-1">{c.value}</div>
                  <div className="text-[10px] text-white/25">{c.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="gold-rule" />

          <div>
            <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-4">Due Diligence Materials</h2>
            <p className="text-xs text-white/35 leading-relaxed">
              Schema evidence, audit log exports, reserve attestation details, custody architecture
              documentation, and executive briefing materials are available to qualified counterparties
              under mutual NDA. Five institutional-grade PDF documents are available immediately via
              the{" "}
              <Link href="/documents" className="text-gold/60 hover:text-gold transition-colors">
                Document Library
              </Link>.
            </p>
          </div>

          <div>
            <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-4">Response Protocol</h2>
            <p className="text-xs text-white/35 leading-relaxed">
              Dignity responds to institutional inquiries within two business days. Initial response
              includes a brief acknowledgment and, where appropriate, a request for additional
              context before scheduling a formal introduction with the relevant board member.
            </p>
          </div>

          <div className="gold-rule" />

          <div>
            <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-4">The Infrastructure Stack</h2>
            <div className="space-y-2">
              {[
                "Rust performance core — sub-ms yield calculation",
                "Fireblocks MPC — 6 modules, 12 vault roles",
                "13 blockchains — 4 functional groups",
                "Compliance — 8 jurisdictions, Reg D/S",
                "VaultLedger — append-only WORM audit",
                "MCP mesh — 21 tools, 6 agent personas",
              ].map((line) => (
                <div key={line} className="flex items-start gap-2">
                  <span className="text-gold/50 text-xs mt-0.5">▸</span>
                  <span className="text-[11px] text-white/30 leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
