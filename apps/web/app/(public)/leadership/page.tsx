import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Leadership | Dignity" };

const CHAIRMAN = {
  name: "David Weild IV",
  title: "Chairman",
  domain: "Investment Banking · Capital Markets · Market Structure",
  bio: `David Weild IV brings an exceptional depth of experience in investment banking, capital
  markets, and market structure. A former Vice Chairman of NASDAQ and widely recognised for his
  foundational work on the JOBS Act, David has spent decades at the intersection of capital
  formation, regulatory policy, and the architecture of public markets. His chairmanship provides
  Dignity with strategic orientation grounded in the most consequential thinking available on how
  institutional capital connects with emerging asset classes and infrastructure.`,
  credential: "Former Vice Chairman, NASDAQ · JOBS Act architect · Capital markets strategist",
};

const BOARD = [
  {
    name: "Richard Allen Perkins",
    title: "Board Director",
    domain: "Legal & Regulatory Affairs",
    subdomain: "Securities law · Regulatory compliance · Legal risk",
    bio: `Provides legal and regulatory oversight across securities law compliance, regulatory
    filing obligations, and legal opinion requirements. Directly supports the compliance engine,
    securities token framework, and legal opinion architecture underpinning the platform's
    issuance structure.`,
    paired: "Compliance engine · Securities token engine · Legal opinion framework",
  },
  {
    name: "Randy Rowe",
    title: "Board Director",
    domain: "Capital Markets Operations",
    subdomain: "Institutional trading · Market structure · Liquidity frameworks",
    bio: `Coverage for capital markets execution strategy, including market maker coordination,
    OTC desk policy, and the institutional liquidity framework. Directly paired with the
    market-ops package and exchange-adapter infrastructure that governs trading operations.`,
    paired: "Exchange adapters · Market-ops package · LP/MM governance framework",
  },
  {
    name: "Todd Reiter",
    title: "Board Director",
    domain: "Technology & Platform Governance",
    subdomain: "Platform architecture · Technical risk · Infrastructure governance",
    bio: `Governs technical platform risk including architecture decisions, security posture, and
    the platform's proof architecture. Provides the technical governance credibility required
    for institutional diligence across all fourteen platform packages.`,
    paired: "All 14 platform packages · Audit trail · Proof architecture",
  },
  {
    name: "Dr. Michael Repass",
    title: "Board Director",
    domain: "Clinical & Scientific Governance",
    subdomain: "Medical governance · Clinical rigor · Evidence-based review",
    bio: `Applies the evidence hierarchy and outcome-measurement discipline of clinical governance
    to compliance and reserve verification — ensuring that claims made about platform performance
    and reserve coverage meet the same standard of evidence demanded in clinical practice.`,
    paired: "Compliance rigor model · Evidence-based disclosure standards",
  },
  {
    name: "Dr. Dana Hardin",
    title: "Board Director",
    domain: "Scientific & Technical Review",
    subdomain: "Qualified Person oversight · Reserve verification · Mining disclosure",
    bio: `Provides scientific and technical review authority for reserve verification and mining
    disclosure governance. Positioned to interface with and oversee Qualified Person engagements
    required for S-K 1300 technical reporting on the underlying gold reserve assets.`,
    paired: "Reserve registry · Mining disclosure layer · ProofAnchor verification",
  },
  {
    name: "Angeline Cardinal Bendle",
    title: "Board Director",
    domain: "Community Sovereignty & ESG",
    subdomain: "Cultural sovereignty · Indigenous rights · Stakeholder engagement",
    bio: `Ensures that the platform's operations are structured with cultural sovereignty principles
    embedded in governance. Provides board coverage for community relations, Indigenous rights
    considerations, and ESG-linked disclosures aligned with the platform's long-term social licence.`,
    paired: "ESG reporting layer · Community stakeholder engagement · Impact disclosure",
  },
];

export default function LeadershipPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Board & Leadership</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Distinguished Leadership.<br />
          <span className="text-white/45 italic">Broad Institutional Depth.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Dignity is supported by leaders whose backgrounds span investment banking, trading,
          mining engineering, asset management, venture capital, technology, real estate, and
          strategic development. This breadth gives the company a strong foundation across
          capital formation, market structure, resource-backed strategy, and commercial execution.
        </p>
      </div>

      <div className="gold-rule mb-16" />

      {/* Chairman — prominent featured card */}
      <div className="glass-panel p-8 md:p-10 mb-16 relative overflow-hidden">
        <div aria-hidden
          className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gold/5 blur-[80px] pointer-events-none" />
        <div className="relative">
          <div className="flex items-start gap-5 mb-6">
            <div className="h-14 w-14 rounded-xl border border-gold/40 bg-gold/10 flex items-center justify-center flex-shrink-0">
              <span className="text-gold text-xl font-bold font-serif">
                {CHAIRMAN.name.split(" ").map(w => w[0]).slice(0,2).join("")}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-semibold text-white">{CHAIRMAN.name}</h2>
                <span className="text-xs px-2.5 py-1 rounded-full border border-gold/40 text-gold bg-gold/10 font-medium tracking-wide">
                  {CHAIRMAN.title}
                </span>
              </div>
              <p className="text-sm text-white/40">{CHAIRMAN.domain}</p>
            </div>
          </div>
          <p className="text-white/65 leading-relaxed mb-4">{CHAIRMAN.bio}</p>
          <p className="text-xs text-gold/60 italic">{CHAIRMAN.credential}</p>
        </div>
      </div>

      {/* Board grid */}
      <div className="mb-8">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">Board of Directors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOARD.map((member) => (
            <div key={member.name}
              className="glass-panel p-6 flex flex-col gap-4 hover:border-white/[0.12] transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg border border-white/[0.12] bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                  <span className="text-white/50 text-sm font-semibold font-serif">
                    {member.name.split(" ").filter(w => w.length > 2 && !["Dr."].includes(w)).map(w => w[0]).slice(0,2).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{member.name}</h3>
                  <p className="text-xs text-white/35 mt-0.5">{member.title}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-white/60 mb-0.5">{member.domain}</p>
                <p className="text-xs text-white/30">{member.subdomain}</p>
              </div>

              <p className="text-xs text-white/50 leading-relaxed flex-1">{member.bio}</p>

              <div className="border-t border-white/[0.06] pt-3">
                <p className="text-[10px] text-white/25 uppercase tracking-widest">Paired Infrastructure</p>
                <p className="text-xs text-gold/50 mt-0.5">{member.paired}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule my-12" />

      {/* Narrative */}
      <div className="max-w-3xl space-y-5 mb-12">
        <h2 className="text-xl font-semibold text-white">Leadership & Platform Together</h2>
        <p className="text-white/55 leading-relaxed">
          Under David Weild IV's chairmanship and the broader board's direction, the company has
          established the vision and leadership framework for a serious institutional digital
          securities platform. The platform work completed to date translates that vision into a
          more concrete, diligence-ready operating environment.
        </p>
        <p className="text-white/40 leading-relaxed text-sm">
          The appropriate narrative for counterparties and capital partners is not that prior work
          was deficient — it is that the platform has advanced from an earlier buildout phase into
          a more disciplined, validated operating environment. Good governance was in place from
          the beginning. The operating infrastructure has now caught up to support it.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/evolution"
          className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors text-center">
          See Platform Evolution →
        </Link>
        <Link href="/fundability"
          className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors text-center">
          Fundability Assessment
        </Link>
      </div>
    </div>
  );
}
