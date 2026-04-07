import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Institutional Inquiry | Dignity" };

const INQUIRY_TYPES = [
  "Investment & Capital",
  "Strategic Partnership",
  "Compliance & Legal",
  "Venue & Market Structure",
  "Technical Architecture",
  "Board & Governance",
  "Media & Press",
  "Other",
];

const CHANNELS = [
  {
    label: "General Inquiries",
    value: "inquiries@dignity.unykorn.org",
    note: "Institutional and qualified counterparties only.",
  },
  {
    label: "Compliance Matters",
    value: "compliance@dignity.unykorn.org",
    note: "Regulatory, KYC/AML, and legal inquiries.",
  },
  {
    label: "Technical Architecture",
    value: "platform@dignity.unykorn.org",
    note: "Infrastructure review, integration, and diligence.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Institutional Inquiry</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Engage<br />
          <span className="text-white/45 italic">with Dignity.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl leading-relaxed">
          Dignity welcomes engagement from qualified counterparties — investors, advisors, compliance
          professionals, exchange partners, and strategic supporters.
        </p>
        <p className="mt-3 text-xs text-white/25 italic">
          Institutional inquiry only. This site is not a public solicitation or offer of securities.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Form */}
        <div className="md:col-span-3">
          <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-6">Inquiry Form</h2>
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
                placeholder="Please describe your inquiry and, where applicable, the nature of your counterparty relationship."
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
            <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-4">NDA & Diligence</h2>
            <p className="text-xs text-white/35 leading-relaxed">
              Detailed technical documentation, schema evidence, audit log exports, and executive
              briefing materials are available to qualified counterparties under mutual NDA.
              Contact the compliance channel to begin the process.
            </p>
          </div>

          <div>
            <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-4">Response Protocol</h2>
            <p className="text-xs text-white/35 leading-relaxed">
              Dignity responds to institutional inquiries within two business days. Initial response
              will include a brief acknowledgment and, where appropriate, a request for additional
              context before scheduling a formal introduction.
            </p>
          </div>

          <div className="gold-rule" />

          <div>
            <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-4">Platform Access</h2>
            <p className="text-xs text-white/35 leading-relaxed mb-4">
              The institutional platform is access-controlled. Credentials are issued to authorised
              users following the standard onboarding and verification process.
            </p>
            <Link
              href="/auth/signin"
              className="block text-center px-4 py-2.5 rounded-lg border border-white/15 text-xs text-white/50 hover:border-white/25 hover:text-white transition-colors"
            >
              Platform Sign-In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
