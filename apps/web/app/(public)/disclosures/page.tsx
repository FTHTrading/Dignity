import Link from "next/link";
import { GoldDivider, Card, CardContent, Badge } from "@dignity/ui";

export const metadata = { title: "Disclosures" };

const DISCLOSURES = [
  {
    id: "disc-001",
    title: "Regulation D — 506(b) Exemption Notice",
    type: "SECURITIES",
    version: "v1.0",
    status: "DRAFT",
    date: "2026-04-01",
    description: "Notice of reliance on Section 4(a)(2) and Rule 506(b) of Regulation D for private placement of DIGau digital securities.",
    proofCid: null,
  },
  {
    id: "disc-002",
    title: "Risk Factors Disclosure",
    type: "SECURITIES",
    version: "v1.0",
    status: "DRAFT",
    date: "2026-04-01",
    description: "Material risk factors including regulatory risk, mining asset risk, liquidity risk, technology risk, and key person risk.",
    proofCid: null,
  },
  {
    id: "disc-003",
    title: "Reserve Asset Disclosure",
    type: "RESERVE",
    version: "v0.1",
    status: "PENDING",
    date: "2026-04-06",
    description: "Disclosure of reserve assets backing DIGau tokens, methodology for NAV calculation, and coverage ratios. Pending independent verification.",
    proofCid: null,
  },
  {
    id: "disc-004",
    title: "Mining Property Disclosure",
    type: "MINING",
    version: "—",
    status: "NOT_STARTED",
    date: "—",
    description: "S-K 1300 Technical Report Summary. Requires engagement of a Qualified Person. Estimated completion: Q3 2026.",
    proofCid: null,
  },
  {
    id: "disc-005",
    title: "Compliance Posture Statement",
    type: "COMPLIANCE",
    version: "v1.0",
    status: "PUBLISHED",
    date: "2026-04-06",
    description: "Statement of current compliance posture, regulatory framework, and compliance roadmap. Score: 33.6 / 100 (Early-Operational).",
    proofCid: "QmPlaceholderCID001",
  },
  {
    id: "disc-006",
    title: "Stablecoin Rail Compliance Notice",
    type: "PAYMENT",
    version: "v1.0",
    status: "DRAFT",
    date: "2026-04-06",
    description: "Disclosure of USDC and USDT payment rail compliance framework including FinCEN/MSB status, OFAC screening policy, and Travel Rule procedures.",
    proofCid: null,
  },
];

const STATUS_MAP: Record<string, "green" | "yellow" | "red" | "muted"> = {
  PUBLISHED: "green",
  DRAFT: "yellow",
  PENDING: "yellow",
  NOT_STARTED: "red",
};

const TYPE_LABELS: Record<string, string> = {
  SECURITIES: "Securities",
  RESERVE: "Reserve",
  MINING: "Mining",
  COMPLIANCE: "Compliance",
  PAYMENT: "Payment Rails",
};

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-obsidian text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-8 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          ← Dignity
        </Link>
        <span className="text-xs text-white/30 uppercase tracking-widest">Disclosures Room</span>
        <div className="w-20" />
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 space-y-12">
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-light text-white">Disclosures</h1>
          <p className="text-white/50 max-w-2xl">
            Dignity is committed to transparency. This room contains all material disclosures required
            or voluntarily provided to investors and regulators. Documents marked Published are
            cryptographically anchored via ProofAnchor and verifiable on IPFS.
          </p>
        </div>

        <GoldDivider />

        {/* Disclosure table */}
        <section className="space-y-4">
          {DISCLOSURES.map((disc) => (
            <Card key={disc.id}>
              <CardContent className="py-5 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-white">{disc.title}</p>
                      <span className="text-xs text-white/30">{disc.version}</span>
                    </div>
                    <p className="text-xs text-white/50">{disc.description}</p>
                    <div className="flex items-center gap-3 pt-1 flex-wrap">
                      <span className="text-xs text-white/30">
                        {TYPE_LABELS[disc.type] ?? disc.type}
                      </span>
                      {disc.date !== "—" && (
                        <span className="text-xs text-white/30">{disc.date}</span>
                      )}
                      {disc.proofCid && (
                        <span className="text-xs font-mono text-gold/70">
                          IPFS: {disc.proofCid}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant={STATUS_MAP[disc.status] ?? "muted"}>
                      {disc.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <GoldDivider />

        <section className="space-y-2">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            Disclosure Policy
          </p>
          <p className="text-sm text-white/50">
            All published disclosures are hashed with SHA-256, stored on IPFS, and anchored on-chain
            via the Dignity ProofAnchor registry. Draft disclosures are subject to legal review before
            publication. Investors should rely only on disclosures marked Published alongside a
            verified IPFS CID.
          </p>
        </section>
      </div>
    </main>
  );
}
