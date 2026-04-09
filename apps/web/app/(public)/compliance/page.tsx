export const metadata = { title: "Regulatory Framework — Dignity" };

const JURISDICTIONS = [
  {
    code: "US",
    name: "United States",
    framework: "Regulation D · Regulation S",
    detail:
      "DIGAU is issued under Regulation D Rule 506(c) of the Securities Act of 1933 — the private placement exemption requiring all purchasers to be verified accredited investors. Rule 506(c) permits general solicitation provided verification is completed. Regulation S covers offshore sales to non-U.S. persons outside a directed selling effort.",
    regulator: "SEC",
    status: "Primary Jurisdiction",
  },
  {
    code: "EU",
    framework: "MiCA · MiFID II",
    name: "European Union",
    detail:
      "Markets in Crypto-Assets Regulation (MiCA) framework compliance for EU distribution. MiFID II coverage for EU professional investors and institutional counterparties. DIGAU is structured as a commodity-backed token (gold-backed), which falls under the asset-referenced token provisions of MiCA.",
    regulator: "ESMA / National Competent Authorities",
    status: "Structured",
  },
  {
    code: "GB",
    name: "United Kingdom",
    framework: "FCA FSMA",
    detail:
      "Coverage under the Financial Services and Markets Act 2000 (FSMA) framework. Distributed as a qualifying cryptoasset to eligible professional investors under FCA regulations. UK-U.S. information sharing frameworks referenced in compliance architecture.",
    regulator: "FCA",
    status: "Structured",
  },
  {
    code: "SG",
    name: "Singapore",
    framework: "MAS SFA",
    detail:
      "Coverage under the Monetary Authority of Singapore Securities and Futures Act framework. Distribution limited to Institutional Investors and Accredited Investors as defined under the SFA. Singapore is positioned as the primary APAC distribution jurisdiction.",
    regulator: "MAS",
    status: "Structured",
  },
];

const COMPLIANCE_ENGINE = [
  { layer: "Identity Verification (KYC)",    vendor: "Persona",          scope: "Individual investor identity — government ID, liveness, document verification." },
  { layer: "Business Verification (KYB)",    vendor: "Middesk",          scope: "Entity investors — business registry, ownership structure, beneficial owner verification." },
  { layer: "Sanctions & PEP Screening",      vendor: "ComplyAdvantage",  scope: "OFAC, EU, UN, FATF lists — real-time screening on subscription and transfer." },
  { layer: "Accreditation Verification",     vendor: "Parallel Markets", scope: "SEC-compliant accredited investor verification — income, net worth, or entity basis." },
  { layer: "Jurisdiction Rule Engine",       vendor: "Dignity Internal", scope: "Policy evaluation per jurisdiction — transfer restrictions, holding periods, eligible investor types." },
  { layer: "Audit Logging",                  vendor: "Dignity Internal", scope: "Append-only SHA-256 hash-chain. Every compliance action is immutably logged with timestamp." },
];

const COMPLIANCE_PRINCIPLES = [
  {
    title: "No Transfer Without Verification",
    desc: "The compliance engine evaluates jurisdiction rules, sanctions status, and accreditation before any token transfer is permitted. There is no bypass path.",
  },
  {
    title: "Reg D General Solicitation Standards",
    desc: "Rule 506(c) permits general solicitation where all purchasers are verified accredited investors. Dignity takes 'reasonable steps' to verify status using third-party verification via Parallel Markets — the standard established by the SEC.",
  },
  {
    title: "Separation of Compliance Duties",
    desc: "Compliance Officers cannot process transactions they also approve — the four-eyes governance constraint applies to all compliance-sensitive actions. Compliance role permissions are scoped and enforced by the platform's RBAC engine.",
  },
  {
    title: "Reg D Holding Period",
    desc: "Non-affiliate holders of Regulation D securities are subject to a one-year holding period under Rule 144 before unrestricted resale. All secondary transfers are evaluated against this constraint by the transfer controls in the token engine.",
  },
  {
    title: "AML Ongoing Monitoring",
    desc: "Sanctions screening is applied at subscription and on each transfer — not only at onboarding. ComplyAdvantage monitoring flags status changes in real-time, triggering account review workflows.",
  },
  {
    title: "Board Legal Coverage",
    desc: "Richard Allen Perkins (Board Director) provides ongoing legal and regulatory oversight across securities law compliance, regulatory filing obligations, and legal opinion requirements. The compliance engine is reviewed against his guidance.",
  },
];

const LEGAL_DOCUMENTS = [
  { doc: "Subscription Agreement",     status: "In preparation",       desc: "Investor-executed subscription document for Reg D offering, including representations and warranties." },
  { doc: "Private Placement Memorandum (PPM)", status: "In preparation", desc: "Offering memorandum covering risk factors, terms, use of proceeds, and investor rights." },
  { doc: "Token Rights Agreement",     status: "In preparation",       desc: "Defines DIGAU holder rights, redemption mechanics, governance framework, and transfer restrictions." },
  { doc: "Custodian Agreements",       status: "In place",             desc: "Executed custody agreements with Fireblocks, BitGo, Anchorage Digital, APMEX, and Brink's." },
  { doc: "Reserve Attestation",        status: "Coordination underway", desc: "Third-party attestation engagement with qualified attestor for reserve verification." },
  { doc: "Legal Opinion — Reg D",      status: "Board legal review",   desc: "Securities counsel opinion on the 506(c) exemption and general solicitation compliance." },
];

export default function CompliancePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Regulatory Framework</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 leading-[1.15]">
          Compliance{" "}
          <span className="bg-gold-gradient bg-clip-text text-transparent italic font-normal">
            Built Into the System
          </span>
        </h1>
        <p className="text-base text-white/50 max-w-2xl leading-relaxed mb-6">
          Dignity's regulatory framework covers four jurisdictions, five compliance vendors,
          and a machine-enforced rule engine wired into every subscription and transfer flow.
          Compliance is not described in a policy document — it is running infrastructure.
        </p>
        <div className="flex flex-wrap gap-3">
          {["Reg D 506(c)", "MiCA", "MiFID II", "FCA", "MAS", "AML/KYC", "8 Jurisdictions"].map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full border border-gold/20 text-gold/70">
              {tag}
            </span>
          ))}
        </div>
        <div className="gold-rule mt-10" />
      </div>

      {/* Primary Regulatory Structure */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Regulatory Structure</h2>
        <div className="space-y-4">
          {JURISDICTIONS.map((j) => (
            <div key={j.code} className="glass-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/30 border border-white/10 px-2 py-1 rounded">{j.code}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">{j.name}</h3>
                    <p className="text-xs text-gold/60 mt-0.5">{j.framework}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/25">{j.regulator}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    j.status === "Primary Jurisdiction"
                      ? "border-gold/30 text-gold/70"
                      : "border-white/10 text-white/30"
                  }`}>
                    {j.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">{j.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Engine */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Compliance Engine — Vendor Stack</h2>
        <div className="glass-card divide-y divide-white/[0.06]">
          {COMPLIANCE_ENGINE.map((row) => (
            <div key={row.layer} className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
              <p className="text-sm font-semibold text-white/80">{row.layer}</p>
              <p className="text-xs text-gold/60 font-medium">{row.vendor}</p>
              <p className="text-xs text-white/35 leading-relaxed">{row.scope}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Compliance Principles */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Core Compliance Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPLIANCE_PRINCIPLES.map((p) => (
            <div key={p.title} className="glass-card p-5">
              <div className="h-px w-6 bg-gold/40 mb-4" />
              <h3 className="text-sm font-semibold text-white/85 mb-2">{p.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Document Status */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-2">Legal Document Status</h2>
        <p className="text-xs text-white/30 mb-8 leading-relaxed">
          Document preparation is aligned with the Phase III institutional maturation timeline.
          Final documents are available to qualified investors under NDA.
        </p>
        <div className="glass-card divide-y divide-white/[0.06]">
          {LEGAL_DOCUMENTS.map((d) => (
            <div key={d.doc} className="px-6 py-5 flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white/80 mb-1">{d.doc}</p>
                <p className="text-xs text-white/35 leading-relaxed">{d.desc}</p>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full border flex-shrink-0 ${
                d.status === "In place"
                  ? "border-emerald-500/30 text-emerald-400/70"
                  : d.status === "Coordination underway"
                  ? "border-amber-500/30 text-amber-400/70"
                  : d.status === "Board legal review"
                  ? "border-gold/25 text-gold/60"
                  : "border-white/10 text-white/30"
              }`}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <div className="glass-card p-8 mb-12">
        <p className="font-serif text-xl text-white/70 leading-relaxed italic mb-4">
          "Compliance at Dignity is not a policy layer applied on top of a product.
          It is a system constraint that governs every subscription, transfer, and
          operational action from the ground up."
        </p>
        <p className="text-xs text-white/30">— Enforced by the platform's compliance engine and four-eyes governance architecture</p>
      </div>

      {/* Bottom CTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/controls",         label: "Governance & Controls", desc: "Four-eyes, separation of duties, audit chain" },
          { href: "/token",            label: "DIGAU Instrument",     desc: "Token rights, mechanics, and custody"        },
          { href: "/investor-pathway", label: "Investor Pathway",     desc: "Start the compliance-gated process"          },
        ].map((link) => (
          <a key={link.href} href={link.href}
            className="glass-card p-5 hover:border-gold/20 transition-all group">
            <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors mb-1">
              {link.label}
            </p>
            <p className="text-xs text-white/35">{link.desc}</p>
          </a>
        ))}
      </div>

      <p className="mt-10 text-xs text-white/20 leading-relaxed">
        This page provides a summary of Dignity's regulatory framework for informational purposes only.
        It does not constitute legal advice. Investors should consult their own legal counsel regarding
        securities law compliance in their jurisdiction before investing.
      </p>
    </div>
  );
}
