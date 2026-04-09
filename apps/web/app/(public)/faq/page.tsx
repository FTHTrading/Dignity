export const metadata = { title: "Investor FAQ — Dignity" };

const FAQS = [
  {
    category: "The Instrument",
    items: [
      {
        q: "What is DIGAU?",
        a: "DIGAU is a Regulation D security token representing a gold-backed digital security issued by Dignity. Each token is backed by physical gold held with qualified custodians (Fireblocks MPC, BitGo, Anchorage Digital, and APMEX + Brink's). Token holders have a proportional claim on the underlying reserve. DIGAU is not a utility token, a stablecoin, or a speculative cryptocurrency — it is a structured security designed for institutional capital markets participation.",
      },
      {
        q: "How is DIGAU backed?",
        a: "DIGAU is backed by LBMA-standard gold bars held in segregated custodial lots. Each lot is registered in the Reserve Registry with asset class, custodian allocation, valuation snapshot, and status. The coverage ratio — outstanding token supply against custodied reserve value — is computed continuously and enforced as a pre-issuance gate: no new tokens can be minted unless reserve coverage meets the required threshold.",
      },
      {
        q: "What rights does a DIGAU holder have?",
        a: "DIGAU holders have a proportional claim on the underlying gold reserve. This includes redemption rights (subject to the redemption workflow and applicable law), informational rights via the investor portal and reserve reports, and governance rights as defined in the token governance framework. DIGAU is a Regulation D security — all holders must be qualified investors under applicable U.S. securities law.",
      },
      {
        q: "How does redemption work?",
        a: "Redemption is processed through the Dignity platform's four-eyes approval workflow. A redemption request is initiated via the investor portal, processed by a Treasury Officer, and approved by a Compliance Officer. The approval gating ensures separation of duties. Redemption can be settled in physical gold delivery (subject to minimum lot sizes and logistics) or cash equivalent, as defined in the offering documents.",
      },
      {
        q: "Is DIGAU transferable?",
        a: "DIGAU transfers are subject to the transfer controls enforced by the token engine and applicable Regulation D resale restrictions. Secondary transfers require KYC/AML verification of the receiving party. The compliance engine evaluates jurisdiction rules and accreditation status before any transfer is permitted. Full transferability to licensed exchange venues and ATS environments is on the Phase III roadmap.",
      },
    ],
  },
  {
    category: "The Platform",
    items: [
      {
        q: "Is the platform built and operating, or is this a pre-launch concept?",
        a: "The platform is built and operating. Phase II produced runtime-validated operating evidence against a live PostgreSQL database: all write flows persist, all admin pages return HTTP 200 under authenticated session, the approval workflow engine is functional across five approval types, the reserve report lifecycle (DRAFT → PUBLISHED) operates correctly, and 29 immutable hash-linked audit events are confirmed in the live audit chain. TypeScript typecheck and production build both pass cleanly. This is not a roadmap — it is running software.",
      },
      {
        q: "What is the audit trail and why does it matter?",
        a: "Every action on the Dignity platform writes an immutable, SHA-256 hash-linked audit event to an append-only log. Each event cryptographically references its predecessor, making the chain tamper-evident — a modification to any historical event breaks the hash sequence and is immediately detectable. This is the same integrity model used in regulated financial infrastructure. The chain currently holds 29 confirmed events across the Phase II validation period.",
      },
      {
        q: "What is the four-eyes governance constraint?",
        a: "Four-eyes governance means that the user who initiates an action cannot be the same user who approves it — this is system-enforced, not policy-described. It applies to mint requests, redemption approvals, venue status toggles, spread policy changes, and reserve report publication. The platform does not allow an override. This mirrors the separation-of-duties standard applied in regulated capital markets operations.",
      },
      {
        q: "How is custody structured?",
        a: "Dignity uses a multi-custodian custody architecture. Digital asset custody is provided by Fireblocks MPC (6 custom modules, 12 vault roles, 3-of-5 multi-sig with geographically distributed keys) and BitGo and Anchorage Digital for diversification. Physical gold custody is through APMEX and Brink's — the latter being the world's largest secure logistics company. All custodial lots are registered and tracked in the Reserve Registry.",
      },
      {
        q: "What compliance systems are in place?",
        a: "The compliance engine is wired into every subscription and transfer flow. KYC is handled via Persona, KYB via Middesk, sanctions screening via ComplyAdvantage, and accreditation verification via Parallel Markets. The regulatory framework covers Reg D/S (U.S.), MiCA (EU), MiFID II (UK/EU), FCA (UK), and MAS (Singapore) — eight jurisdictions in total. All compliance events are audit-logged.",
      },
    ],
  },
  {
    category: "Investment Process",
    items: [
      {
        q: "Who can invest in DIGAU?",
        a: "DIGAU is offered under Regulation D, Rule 506(c) — which requires all investors to be verified Accredited Investors or Qualified Institutional Buyers (QIBs). Eligible investor categories include: accredited individuals (net worth >$1M excluding primary residence, or $200K/$300K income), family offices (≥$5M AUM), Registered Investment Advisors acting for client accounts, Qualified Institutional Buyers (>$100M securities managed), and endowments, foundations, and charitable organizations (≥$5M asset base).",
      },
      {
        q: "What is the minimum investment?",
        a: "Indicative minimums are: Accredited Individual — $250K, Family Office — $1M, RIA / QIB — $5M, and Endowment / Foundation — $2.5M. These are subject to change in the final offering documents. The first close is targeting a $10M seed round with a 12-month target of $50M AUM.",
      },
      {
        q: "What is the engagement process?",
        a: "The investor engagement process runs 7 steps over approximately 6–8 weeks: (1) Institutional Inquiry via the contact form, (2) mutual NDA execution, (3) Data Room access, (4) KYC/AML verification via Persona and Parallel Markets, (5) Subscription Agreement execution, (6) wire instructions and settlement, (7) Investor Portal activation with real-time portfolio access. Dignity responds to qualified inquiries within two business days.",
      },
      {
        q: "What diligence materials are available?",
        a: "Dignity provides a structured data room to qualified investors under NDA. Materials include: schema evidence and architecture documentation, audit log exports, reserve attestation details, custody architecture documentation, executive briefing materials, and five institutional-grade PDF documents available immediately via the Document Library. Additional technical evidence — including live system demonstrations — is available upon request.",
      },
      {
        q: "What is the fee structure?",
        a: "Dignity generates revenue across seven streams: issuance fee (0.50% of token value at mint), custody management fee (0.20% p.a. on AUM), redemption fee (0.25% of redemption value), transfer fee (0.05% per on-chain transfer), Compliance API licensing, Analytics API, and x402 micro-fees on AI-readable data endpoints. Full fee schedule and AUM scenario modeling is available on the Economics page.",
      },
    ],
  },
  {
    category: "Legal & Regulatory",
    items: [
      {
        q: "What is the regulatory structure for DIGAU?",
        a: "DIGAU is issued under Regulation D, Rule 506(c) of the Securities Act of 1933 — the private placement exemption available to issuers who limit sales to verified accredited investors and take reasonable steps to verify that status. The compliance engine supports multi-jurisdiction structuring: Reg D/S (U.S.), MiCA (EU), MiFID II (UK/EU), FCA (UK), and MAS (Singapore). The board's legal director (Richard Allen Perkins) provides legal and regulatory oversight.",
      },
      {
        q: "Are there any lock-up or liquidity constraints?",
        a: "As a Regulation D security, DIGAU is subject to standard Reg D resale restrictions. The one-year holding period requirement applies to non-affiliate holders under Rule 144. After the applicable holding period, transfers may be made to other accredited investors subject to the transfer controls in the token engine. Exchange-listed secondary trading is targeted for Phase III upon engagement with a licensed ATS.",
      },
      {
        q: "How does Dignity handle KYC/AML?",
        a: "Every investor must complete KYC/AML verification before subscription. The process uses Persona for identity verification, Middesk for business entity verification (KYB), ComplyAdvantage for sanctions and PEP screening, and Parallel Markets for accreditation verification. All compliance actions are logged in the audit chain. The compliance engine enforces jurisdiction-specific rules on every subscription and transfer.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Investor FAQ</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 leading-[1.15]">
          Frequently Asked{" "}
          <span className="bg-gold-gradient bg-clip-text text-transparent italic font-normal">
            Questions
          </span>
        </h1>
        <p className="text-base text-white/50 max-w-2xl leading-relaxed">
          Answers to the questions institutional investors ask most often about DIGAU,
          the Dignity platform, the investment process, and the regulatory structure.
        </p>
        <div className="gold-rule mt-8" />
      </div>

      {/* FAQ sections */}
      <div className="space-y-16">
        {FAQS.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">
              {section.category}
            </h2>
            <div className="space-y-0 divide-y divide-white/[0.06]">
              {section.items.map((item) => (
                <div key={item.q} className="py-7">
                  <h3 className="text-sm font-semibold text-white/90 mb-3 leading-snug">
                    {item.q}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 pt-12 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/investor-pathway", label: "Investor Pathway", desc: "7-step engagement process" },
          { href: "/economics",        label: "Economics",         desc: "Fee schedule and AUM scenarios" },
          { href: "/contact",          label: "Ask a Question",    desc: "Direct institutional inquiry" },
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

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-white/20 leading-relaxed">
        This FAQ is for informational purposes only and does not constitute an offer or solicitation.
        DIGAU is offered under Regulation D and is available only to verified accredited investors and
        qualified institutional buyers. All figures are indicative and subject to final offering documents.
      </p>
    </div>
  );
}
