export const metadata = { title: "DIGAU Token — Dignity" };

const TOKEN_PARAMS = [
  { label: "Token Name",          value: "Dignity Gold Token"                         },
  { label: "Ticker Symbol",       value: "DIGAU"                                       },
  { label: "Instrument Type",     value: "Regulation D Security Token"                 },
  { label: "Primary Chain",       value: "Ethereum (ERC-20 / ERC-1400)"                },
  { label: "Settlement Chains",   value: "Stellar · Solana"                            },
  { label: "Anchor Chains",       value: "Bitcoin (monthly) · XRPL (daily) · Polygon (daily)" },
  { label: "Reserve Asset",       value: "LBMA-standard physical gold"                 },
  { label: "Backing Ratio",       value: "1:1 — 1 DIGAU = 1 troy oz gold equivalent"  },
  { label: "Minimum Investment",  value: "$250K (accredited) · $1M (family office)"    },
  { label: "Regulatory Wrapper",  value: "Reg D Rule 506(c) · Reg S (offshore)"        },
];

const LIFECYCLE = [
  {
    step: "01",
    title: "Subscription",
    desc: "Investor completes KYC/AML verification, signs the Subscription Agreement, and wires capital. Compliance engine verifies accreditation and jurisdiction eligibility.",
    tags: ["KYC via Persona", "Accreditation via Parallel Markets", "Compliance check"],
  },
  {
    step: "02",
    title: "Reserve Verification",
    desc: "Treasury Officer confirms reserve coverage. The coverage ratio is computed from the Reserve Registry — outstanding token supply versus custodied gold value. Mint is blocked until coverage gate is satisfied.",
    tags: ["Coverage ratio gate", "Reserve Registry check", "Treasury Officer action"],
  },
  {
    step: "03",
    title: "Four-Eyes Mint Approval",
    desc: "Mint request is created by the Treasury Officer and approved by a Compliance Officer — distinct users enforced by the system. The approving user cannot be the initiating user.",
    tags: ["Treasury Officer creates", "Compliance Officer approves", "System-enforced separation"],
  },
  {
    step: "04",
    title: "Token Issuance",
    desc: "DIGAU tokens are minted on-chain via the Token Engine. The mint event is logged immutably in the SHA-256 hash-chain audit trail. The investor's position appears in the Investor Portal.",
    tags: ["On-chain mint", "Audit event written", "Portal position updated"],
  },
  {
    step: "05",
    title: "Custody & Reporting",
    desc: "The underlying gold is held in segregated custodial lots across Fireblocks MPC, BitGo, Anchorage Digital, and APMEX + Brink's. Reserve Reports are published through the DRAFT → PUBLISHED approval workflow on a regular schedule.",
    tags: ["Multi-custodian lots", "Reserve Report cycle", "On-chain proof anchor"],
  },
  {
    step: "06",
    title: "Redemption",
    desc: "Investor submits a redemption request via the portal. Treasury Officer processes, Compliance Officer approves. Settlement in physical gold delivery (subject to minimum lot sizes) or cash equivalent at the prevailing gold-backed NAV.",
    tags: ["Portal-initiated", "Four-eyes approval", "Physical gold or cash"],
  },
];

const CUSTODY_STACK = [
  {
    custodian: "Fireblocks",
    role: "Primary Digital Custody",
    detail: "MPC architecture with 6 custom modules and 12 vault roles. 3-of-5 multi-sig with geographically distributed key shards. Institutional-grade key management used by 1,800+ financial institutions globally.",
  },
  {
    custodian: "BitGo",
    role: "Qualified Digital Custodian",
    detail: "SOC 2 Type II certified, $250M insurance coverage. Regulated by the South Dakota Division of Banking as a qualified custodian. Provides redundancy in the digital custody layer.",
  },
  {
    custodian: "Anchorage Digital",
    role: "Federally Chartered Digital Custodian",
    detail: "The only federally chartered crypto bank in the U.S. (OCC charter). Provides institutional-grade digital asset custody with deep regulatory standing.",
  },
  {
    custodian: "APMEX + Brink's",
    role: "Physical Gold Custody",
    detail: "APMEX is one of the world's largest precious metals dealers. Brink's provides physical custody and secure logistics through its global vault network. LBMA-standard bars with serial number tracking.",
  },
];

const CHAIN_GROUPS = [
  {
    group: "Settlement",
    chains: ["Ethereum", "Stellar", "Solana"],
    desc: "Primary on-chain delivery, DvP settlement, and transfer execution.",
  },
  {
    group: "Proof Anchoring",
    chains: ["Bitcoin", "XRPL", "Polygon"],
    desc: "Immutable proof anchors at monthly (Bitcoin OP_RETURN), daily (XRPL), and daily (Polygon) intervals.",
  },
  {
    group: "EVM Coverage",
    chains: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base", "BNB Chain", "Avalanche", "Fantom"],
    desc: "Full EVM compatibility across 8 networks for broad institutional connectivity.",
  },
];

export default function TokenPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">The Instrument</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 leading-[1.15]">
          DIGAU —{" "}
          <span className="bg-gold-gradient bg-clip-text text-transparent italic font-normal">
            Institutional Gold Token
          </span>
        </h1>
        <p className="text-base text-white/50 max-w-2xl leading-relaxed mb-8">
          A Regulation D security token giving qualified investors a direct,
          auditable, custody-backed claim on physical gold — issued on Ethereum,
          settled across three chains, anchored to three proof chains.
        </p>
        {/* Stat bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Backing",     value: "1:1 Gold"      },
            { label: "Regulation",  value: "Reg D 506(c)"  },
            { label: "Custodians",  value: "4 Qualified"   },
            { label: "Chains",      value: "13 Integrated" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className="text-lg font-semibold text-gold mb-1">{s.value}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="gold-rule mt-10" />
      </div>

      {/* Token Parameters */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Token Parameters</h2>
        <div className="glass-card divide-y divide-white/[0.06]">
          {TOKEN_PARAMS.map((p) => (
            <div key={p.label} className="flex items-center justify-between gap-4 px-6 py-4">
              <span className="text-xs text-white/35 font-medium min-w-[160px]">{p.label}</span>
              <span className="text-sm text-white/80 text-right">{p.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Token Lifecycle */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Token Lifecycle</h2>
        <div className="space-y-4">
          {LIFECYCLE.map((step) => (
            <div key={step.step} className="glass-card p-6 flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded border border-gold/25 bg-gold/5 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">{step.step}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white/90 mb-2">{step.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed mb-3">{step.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.08] text-white/25">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custody Stack */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Custody Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CUSTODY_STACK.map((c) => (
            <div key={c.custodian} className="glass-card p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm font-semibold text-white/90">{c.custodian}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-gold/20 text-gold/60 flex-shrink-0">
                  {c.role}
                </span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chain Coverage */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Chain Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHAIN_GROUPS.map((g) => (
            <div key={g.group} className="glass-card p-5">
              <h3 className="text-xs text-gold/70 uppercase tracking-widest font-medium mb-3">{g.group}</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {g.chains.map((c) => (
                  <span key={c} className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.08] text-white/50">
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/30 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rights Summary */}
      <section className="mb-16">
        <h2 className="text-xs text-white/20 uppercase tracking-[0.25em] font-medium mb-8">Holder Rights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              right: "Reserve Claim",
              desc: "Proportional claim on the custodied gold reserve. Coverage ratio enforced pre-issuance. Third-party attestation coordinated.",
            },
            {
              right: "Redemption",
              desc: "Right to redeem for physical gold delivery (minimum lot) or cash equivalent at gold-backed NAV, subject to compliance approval workflow.",
            },
            {
              right: "Information",
              desc: "Access to Investor Portal, published Reserve Reports, issuance history, and audit chain exports under qualified investor agreement.",
            },
            {
              right: "Governance",
              desc: "Voting rights as defined in the token governance framework. On-chain governance proposals and quorum rules are codified in the Governance module.",
            },
            {
              right: "Transfer",
              desc: "Transfer to other accredited investors subject to compliance engine checks, Reg D holding period, and KYC/AML verification of receiving party.",
            },
            {
              right: "Secondary Liquidity",
              desc: "Phase III: secondary trading on a licensed ATS or registered exchange. Market-maker framework and OTC RFQ infrastructure are built and ready.",
            },
          ].map((r) => (
            <div key={r.right} className="glass-card p-5">
              <p className="text-xs text-gold/60 uppercase tracking-widest font-medium mb-2">{r.right}</p>
              <p className="text-xs text-white/40 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="pt-12 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/economics",        label: "Fee Schedule",      desc: "Revenue model and AUM scenarios" },
          { href: "/compliance",       label: "Regulatory Framework", desc: "Reg D, jurisdiction structure, legal"  },
          { href: "/investor-pathway", label: "Invest in DIGAU",   desc: "7-step engagement process"          },
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
        DIGAU is a security offered under Regulation D Rule 506(c). Available only to verified
        accredited investors and qualified institutional buyers. This page is for informational
        purposes only and does not constitute an offer or solicitation.
      </p>
    </div>
  );
}
