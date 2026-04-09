import Link from "next/link";

const NAV_LINKS = [
  { href: "/evolution",        label: "Evolution"        },
  { href: "/platform",         label: "Platform"         },
  { href: "/status",           label: "Status"           },
  { href: "/economics",        label: "Economics"        },
  { href: "/path-forward",     label: "Path Forward"     },
  { href: "/investor-pathway", label: "Investor Pathway" },
  { href: "/data-room",        label: "Data Room"        },
  { href: "/contact",          label: "Contact"          },
];



const PILLARS = [
  { label: "Strategic Foundation",         sub: "Distinguished leadership and differentiated market thesis" },
  { label: "Validated Operating Platform", sub: "Live DB, passing build, persisted workflows, audit chain" },
  { label: "Institutional Controls",       sub: "Approval workflows, reserve reporting, venue governance" },
  { label: "Disciplined Advancement",      sub: "From buildout phase to a runtime-validated operating environment" },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-obsidian text-white">
      {/* Background video */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.18 }}
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay — keeps text sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian/80" />
        {/* Ambient gold glow on top */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[1100px] rounded-full bg-gold/[0.04] blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.06] sticky top-0 bg-obsidian/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded border border-gold/40 bg-gold/10 flex items-center justify-center">
            <span className="text-gold text-xs font-bold tracking-widest">D</span>
          </div>
          <span className="text-white font-semibold tracking-wide text-base">Dignity</span>
        </div>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((n) => (
            <Link key={n.href} href={n.href}
              className="px-3 py-1.5 text-sm text-white/50 hover:text-white/90 hover:bg-white/[0.04] rounded-lg transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact"
            className="hidden md:inline-flex text-xs px-4 py-2 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-colors tracking-wide uppercase font-medium">
            Institutional Inquiry
          </Link>
          <Link href="/sign-in" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            Platform Access
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs text-gold/80 tracking-[0.2em] uppercase font-medium">
              Institutional Gold-Backed Securities
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="text-xs text-white/40 tracking-[0.15em] uppercase font-medium">
              Reference Overview · Board &amp; Stakeholders
            </span>
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6 leading-[1.1] max-w-4xl">
          A Stronger Institutional{" "}
          <span className="bg-gold-gradient bg-clip-text text-transparent font-normal italic">
            Position
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-4 leading-relaxed">
          Dignity's strategic foundation is now matched by validated operating infrastructure —
          live persistence, functioning workflows, and an audit-backed control environment.
        </p>
        <p className="text-sm text-white/30 max-w-xl mb-12 leading-relaxed italic">
          Dignity is now in a stronger position to move forward because its strategic foundation is
          increasingly matched by validated operating infrastructure.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/status"
            className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors shadow-gold-glow">
            Platform Status
          </Link>
          <Link href="/path-forward"
            className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors">
            Path to Capital
          </Link>
          <Link href="/investor-pathway"
            className="px-6 py-3 rounded-xl border border-white/10 text-white/40 text-sm hover:border-white/20 hover:text-white/70 transition-colors">
            Investor Pathway
          </Link>
        </div>
      </section>

      {/* Four pillars */}
      <section className="relative z-10 border-t border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => (
            <div key={p.label} className="space-y-2">
              <div className="h-px w-8 bg-gold/50" />
              <p className="text-sm font-semibold text-white/90">{p.label}</p>
              <p className="text-xs text-white/40 leading-relaxed">{p.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-10">Platform Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/status",           title: "Platform Status",  desc: "Full historical record, current state dashboard, and 14-milestone forward timeline" },
            { href: "/evolution",        title: "Evolution",        desc: "From strategic buildout phase to validated operating environment" },
            { href: "/platform",         title: "Platform",         desc: "14-package monorepo with approval workflows, reserve registry, and audit logging" },
            { href: "/economics",        title: "Economics",        desc: "Token parameters, fee schedule, and AUM revenue scenarios from $10M to $1B+" },
            { href: "/path-forward",     title: "Path Forward",     desc: "6-milestone sequence from current state to first capital close (90–120 days)" },
            { href: "/investor-pathway", title: "Investor Pathway", desc: "7-step Reg D engagement process for accredited investors, family offices, and QIBs" },
            { href: "/data-room",        title: "Data Room",        desc: "Structured due diligence documents for qualified institutional investors" },
            { href: "/leadership",       title: "Leadership",       desc: "Distinguished board with depth in banking, trading, mining, and capital formation" },
            { href: "/governance",       title: "Governance",       desc: "On-chain token governance: voting rights, quorum, and proposal framework" },
            { href: "/supply",           title: "Supply",           desc: "Real-time token supply breakdown: circulating, reserved, and treasury" },
            { href: "/reserve",          title: "Reserve",          desc: "Gold backing registry: custodian allocation, LBMA bars, and coverage ratio" },
            { href: "/proof",            title: "Proof Center",     desc: "Runtime-validated milestones and audit-chain integrity confirmation" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="glass-panel p-5 group hover:border-gold/20 hover:bg-white/[0.04] transition-all">
              <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors mb-2">{item.title}</p>
              <p className="text-xs text-white/35 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What We Built */}
      <section className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="mb-12">
            <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-3">What We Built</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4 leading-[1.2]">
              Production Infrastructure,<br />
              <span className="text-white/45 italic">Not a Pitch Deck.</span>
            </h2>
            <p className="text-sm text-white/40 max-w-2xl leading-relaxed">
              Every layer of Dignity was engineered from first principles — 100+ production modules,
              13 blockchain integrations, 4 qualified custodians, and a deterministic compliance engine.
              This is what operational validation looks like.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "⚙",
                title: "Rust Performance Core",
                desc: "Sub-millisecond yield calculation, WASM-compiled policy engine, zero-copy serialization, and memory-safe custody validation across all settlement paths.",
                tags: ["Rust", "WASM", "Sub-ms Latency"],
              },
              {
                icon: "🔐",
                title: "Multi-Custodian Custody",
                desc: "Fireblocks MPC with 6 custom modules and 12 vault roles. BitGo, Anchorage Digital, and APMEX + Brink's for physical gold. 3-of-5 multi-sig with geo-distributed keys.",
                tags: ["Fireblocks MPC", "BitGo", "Brink's"],
              },
              {
                icon: "⛓",
                title: "13-Chain Settlement",
                desc: "Settlement on Stellar, Ethereum, and Solana. Anchored to Bitcoin (monthly OP_RETURN), XRPL (daily), and Polygon (daily). Full EVM coverage across 8 networks.",
                tags: ["Bitcoin", "XRPL", "Stellar", "Ethereum"],
              },
              {
                icon: "📋",
                title: "Compliance Engine",
                desc: "Persona KYC, Middesk KYB, ComplyAdvantage sanctions screening, Parallel Markets accreditation. Reg D/S, MiCA, MiFID II, FCA, MAS — 8 jurisdictions.",
                tags: ["KYC/AML", "Reg D/S", "Multi-Jurisdiction"],
              },
              {
                icon: "🤖",
                title: "AI Agent Operations",
                desc: "21 MCP tools across 7 domains. 6 supervised agent personas — Deal, Compliance, Investor, Treasury, Rights, Issuance — all human-approved with full audit trail.",
                tags: ["MCP Mesh", "6 Agents", "21 Tools"],
              },
              {
                icon: "🏗",
                title: "Four-Eyes Governance",
                desc: "System invariant — no override possible. Approval workflows with configurable expiry. SHA-256 hash-chain audit log. VaultLedger (append-only WORM-compliant).",
                tags: ["Dual-Key", "Hash-Chain", "WORM Audit"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-panel p-6 flex flex-col gap-4 hover:border-gold/20 hover:bg-white/[0.03] transition-all"
              >
                <div className="h-10 w-10 rounded-lg border border-white/[0.12] bg-white/[0.04] flex items-center justify-center">
                  <span className="text-base">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white/90 mb-2">{item.title}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.08] text-white/25">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-line statement */}
      <section className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-8 py-16 text-center">
          <p className="font-serif text-2xl md:text-3xl font-light text-white/70 leading-relaxed italic">
            "Before, Dignity's institutional case was primarily strategic.{" "}
            <span className="text-white not-italic font-normal">Today, it is increasingly operational.</span>"
          </p>
        </div>
      </section>

      {/* Investor Resources Hub */}
      <section className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-3">Investor Resources</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4 leading-[1.2]">
                Capital Formation,<br />
                <span className="text-white/45 italic">Structured for Qualified Investors.</span>
              </h2>
              <p className="text-sm text-white/40 max-w-xl leading-relaxed">
                Every material a sophisticated investor needs — economics, forward milestones,
                engagement process, and on-chain proof — in one place.
              </p>
            </div>
            <Link href="/investor-pathway"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">
              Begin Investor Process →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                badge: "Economics",
                title: "Revenue Model",
                desc: "Fee schedule across 7 revenue streams. AUM scenarios from $10M seed to $1B+ mature. Coverage ratio mechanics and token economics.",
                href: "/economics",
                accent: "text-gold",
              },
              {
                badge: "Roadmap",
                title: "Path to First Close",
                desc: "6 milestones from current state to first capital close. T-01 governance hardening through T-05 first capital — 90-to-120 day critical path.",
                href: "/path-forward",
                accent: "text-amber-400",
              },
              {
                badge: "Engagement",
                title: "Investor Pathway",
                desc: "7-step Reg D process: inquiry, NDA, data room access, KYC/AML, subscription, wire, portal activation. Indicative 6–8 week timeline.",
                href: "/investor-pathway",
                accent: "text-emerald-400",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="glass-panel p-6 hover:border-gold/20 hover:bg-white/[0.04] transition-all group">
                <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${item.accent} mb-4 block`}>{item.badge}</span>
                <p className="text-sm font-semibold text-white/90 group-hover:text-white mb-3 transition-colors">{item.title}</p>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{item.desc}</p>
                <span className="text-xs text-gold/60 group-hover:text-gold transition-colors">Review →</span>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/status"
              className="glass-panel p-5 hover:border-gold/20 hover:bg-white/[0.04] transition-all group flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Master Dashboard</p>
                <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Platform Status</p>
                <p className="text-xs text-white/35 mt-1">Full history + current state + 14-milestone forward timeline</p>
              </div>
              <span className="text-gold/40 group-hover:text-gold transition-colors text-xl flex-shrink-0">→</span>
            </Link>
            <Link href="/data-room"
              className="glass-panel p-5 hover:border-gold/20 hover:bg-white/[0.04] transition-all group flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Due Diligence</p>
                <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Data Room</p>
                <p className="text-xs text-white/35 mt-1">Structured documents for qualified institutional investors</p>
              </div>
              <span className="text-gold/40 group-hover:text-gold transition-colors text-xl flex-shrink-0">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} Dignity Institutional. This is a reference overview prepared
          for the Dignity Board of Directors and qualified institutional stakeholders. Not a public
          offering or solicitation.
        </p>
        <div className="flex items-center gap-5 text-xs text-white/30">
          <Link href="/disclosures" className="hover:text-white/60 transition-colors">Disclosures</Link>
          <Link href="/leadership"  className="hover:text-white/60 transition-colors">Leadership</Link>
          <Link href="/proof"       className="hover:text-white/60 transition-colors">Proof Center</Link>
          <Link href="/contact"     className="hover:text-white/60 transition-colors">Contact</Link>
        </div>
      </footer>
    </main>
  );
}

