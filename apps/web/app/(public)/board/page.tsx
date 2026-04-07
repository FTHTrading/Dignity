import Link from "next/link";
import { GoldDivider, Card, CardContent } from "@dignity/ui";

export const metadata = { title: "Board & Leadership" };

const BOARD = [
  {
    name: "Angeline Cardinal Bendle",
    title: "Board Director — Community Sovereignty & ESG",
    domain: "Cultural sovereignty, Indigenous rights, community engagement",
    infrastructure: "ESG reporting layer, community stakeholder engagement, proof of impact",
    bio: "Provides board coverage for community relations, Indigenous rights considerations, and ESG-linked disclosures. Ensures the platform's operations are structured with cultural sovereignty principles embedded in governance.",
  },
  {
    name: "Randy Rowe",
    title: "Board Director — Capital Markets Operations",
    domain: "Capital markets, institutional trading, market structure",
    infrastructure: "Exchange adapters, market-ops package, LP / MM framework",
    bio: "Provides coverage for capital markets execution, including market maker coordination, OTC desk policy, and institutional liquidity framework. Directly paired with the market-ops and exchange-adapters infrastructure layer.",
  },
  {
    name: "Todd Reiter",
    title: "Board Director — Technology & Platform Governance",
    domain: "Technology governance, platform architecture, technical risk",
    infrastructure: "All 14 platform packages, audit trail, IPFS proof architecture",
    bio: "Governs technical platform risk including architecture decisions, security posture, and the platform's proof architecture. Provides the technical credibility layer required for institutional diligence.",
  },
  {
    name: "Dr. Michael Repass",
    title: "Board Director — Clinical & Scientific Governance",
    domain: "Medical governance, clinical rigor, scientific review",
    infrastructure: "Compliance rigor model, evidence-based disclosure standards",
    bio: "Brings clinical governance discipline to the board — applying the same standard of evidence hierarchy and outcome measurement to compliance and reserve verification that governs clinical practice.",
  },
  {
    name: "Richard Allen Perkins",
    title: "Board Director — Legal & Regulatory Affairs",
    domain: "Securities law, regulatory compliance, legal risk",
    infrastructure: "Compliance engine, securities token engine, legal opinion framework",
    bio: "Provides legal and regulatory oversight across securities law compliance, regulatory filing obligations, and legal opinion requirements. Directly paired with the compliance-engine and token-engine infrastructure layers.",
  },
  {
    name: "Dr. Dana Hardin",
    title: "Board Director — Scientific & Technical Review",
    domain: "Scientific review, qualified person oversight, technical report governance",
    infrastructure: "Reserve registry, mining disclosure layer, ProofAnchor verification",
    bio: "Provides scientific and technical review authority for reserve verification and mining disclosure. Positioned to interface with and oversee the Qualified Person engagement required for S-K 1300 technical reporting.",
  },
];

export default function BoardPage() {
  return (
    <main className="min-h-screen bg-obsidian text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-8 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          ← Dignity
        </Link>
        <span className="text-xs text-white/30 uppercase tracking-widest">Board & Leadership</span>
        <div className="w-20" />
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 space-y-12">
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-light text-white">Board of Directors</h1>
          <p className="text-white/50 max-w-2xl">
            Each board member is paired to a specific infrastructure and compliance domain.
            The 20-30% rule governs board composition: each member's domain covers 20-30% of
            institutional execution risk, with intentional overlap at critical fault lines.
          </p>
        </div>

        <GoldDivider />

        {/* Board members */}
        <section className="space-y-6">
          {BOARD.map((member) => (
            <Card key={member.name}>
              <CardContent className="py-6 space-y-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">{member.name}</h2>
                  <p className="text-sm text-gold/80 mt-0.5">{member.title}</p>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{member.bio}</p>
                <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider">
                      Domain Signal
                    </p>
                    <p className="text-xs text-white/60">{member.domain}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider">
                      Infrastructure Pairing
                    </p>
                    <p className="text-xs text-white/60">{member.infrastructure}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <GoldDivider />

        {/* Governance note */}
        <section className="space-y-2">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            Governance Posture
          </p>
          <p className="text-sm text-white/50">
            The Dignity board operates under the 20-30% rule: collectively covering 100% of
            institutional execution risk across technology, legal, capital markets, community,
            scientific, and clinical governance domains. Board independence, conflict of interest
            policies, and D&O insurance coverage are active workstreams on the 90-day compliance
            roadmap.
          </p>
        </section>
      </div>
    </main>
  );
}
