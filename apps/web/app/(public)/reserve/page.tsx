import type { Metadata } from "next";
import { ExternalLink, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Reserve Documentation — Dignity Institutional",
  description: "What is pledged vs vaulted, the OLV methodology, reserve proof gaps, and what is needed for institutional-grade reserve attestation.",
};

const RESERVE_FACTS = [
  {
    claim: "At least $6 billion in gold reserves pledged",
    source: "dignitygold.com public site",
    status: "STATED",
    note: "Marketing claim. Not an independent audit or reserve attestation.",
    action: "Requires S-K 1300 Qualified Person report to replace marketing claim.",
  },
  {
    claim: "Gold reserves in U.S. tailings and alluvial placer deposits",
    source: "dignitygold.com / OLV report",
    status: "STATED",
    note: "Type of deposit identified. Mine site, lot, and deed information not publicly published.",
    action: "UCC / lien filings and title chain documentation required.",
  },
  {
    claim: "6,429,396 oz gold pledged (OLV model input)",
    source: "Caprock/Houlihan OLV, June 2024",
    status: "OLV-MODEL",
    note: "OLV model input — not an independent resource estimate. No NI 43-101 or S-K 1300 report cited.",
    action: "Qualified Person (S-K 1300) engagement required. Estimated Q3 2026.",
  },
  {
    claim: "15% net-profits allocation",
    source: "Caprock/Houlihan OLV, June 2024",
    status: "OLV-MODEL",
    note: "OLV model uses 15% net-profits allocation as per the Assignment Agreement. Basis for 15% figure not independently verified.",
    action: "Assignment Agreement and royalty/profit allocation chain must be disclosed.",
  },
  {
    claim: "50% vaulting as mined",
    source: "Caprock/Houlihan OLV, June 2024",
    status: "FORWARD",
    note: "OLV assumes 50% of mined gold will be vaulted. This is a future operational assumption, not current status.",
    action: "Vaulting agreement with APMEX + Brink's must be executed and published.",
  },
  {
    claim: "0 vaulted ounces (valuation date)",
    source: "Caprock/Houlihan OLV, June 2024",
    status: "CONFIRMED",
    note: "OLV explicitly states 0 vaulted ounces as of the June 2024 valuation date. No gold is physically vaulted yet.",
    action: "Vaulted ounce count must be updated on a published cadence as mining/vaulting begins.",
  },
  {
    claim: "APMEX + Brink's physical gold custody",
    source: "Institutional materials / platform description",
    status: "DESCRIBED",
    note: "Named as custody partners in institutional materials. No published custody agreement or custody confirmation letter.",
    action: "Publish custody agreement or comfort letter from APMEX and Brink's.",
  },
  {
    claim: "ReserveProofAnchor.sol on Base for attestation",
    source: "Platform architecture (Phase III)",
    status: "DESIGNED",
    note: "On-chain anchor contract designed in Phase III architecture. Not yet deployed.",
    action: "Deploy and verify ReserveProofAnchor.sol on Base. Engage attestor for monthly reserve hash submissions.",
  },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  STATED:     { color: "#e67e22", bg: "rgba(230,126,34,0.08)" },
  OLV_MODEL:  { color: "#f1c40f", bg: "rgba(241,196,15,0.08)" },
  "OLV-MODEL": { color: "#f1c40f", bg: "rgba(241,196,15,0.08)" },
  FORWARD:    { color: "#9b59b6", bg: "rgba(155,89,182,0.08)" },
  CONFIRMED:  { color: "#e74c3c", bg: "rgba(231,76,60,0.08)" },
  DESCRIBED:  { color: "#3498db", bg: "rgba(52,152,219,0.08)" },
  DESIGNED:   { color: "var(--gold)", bg: "rgba(201,168,76,0.08)" },
};

const PROOF_GAPS = [
  {
    item: "NI 43-101 / S-K 1300 Qualified Person report",
    priority: "CRITICAL",
    detail: "No QP report filed or publicly referenced. Without this, the '$6B reserves' claim cannot be independently verified. Estimated engagement Q3 2026.",
    status: "NOT STARTED",
  },
  {
    item: "UCC / lien filings confirming pledge",
    priority: "CRITICAL",
    detail: "The pledge of gold reserves to DIGau should be evidenced by UCC-1 financing statements or equivalent lien filings. Not currently published.",
    status: "NOT STARTED",
  },
  {
    item: "Chain of title / assignment chain",
    priority: "HIGH",
    detail: "OLV referenced an Assignment Agreement. The full chain of title from mining claims through the assignment to Dignity Corp / token holders is not published.",
    status: "RESTRICTED",
  },
  {
    item: "Mining property deeds / mineral rights documentation",
    priority: "HIGH",
    detail: "Physical location of tailings and placer deposit properties. Public mine records should be linkable but no compiled reference is published.",
    status: "NOT STARTED",
  },
  {
    item: "Independent reserve attestation cadence",
    priority: "HIGH",
    detail: "How often will reserves be independently verified? Semi-annual, annual? Who is the attestor? ReserveProofAnchor.sol architecture is built but attestor not engaged.",
    status: "DESIGNED",
  },
  {
    item: "Vaulted ounce tracker / monthly report",
    priority: "MEDIUM",
    detail: "As mining begins, vaulted oz should be tracked monthly against the 50%-as-mined commitment. Supply-to-reserve ratio requires this denominator.",
    status: "DESIGNED",
  },
  {
    item: "Redemption policy and live status",
    priority: "MEDIUM",
    detail: "Can DIGau be redeemed for gold? What is the process, pricing, minimum size, and legal structure? Currently described as future Phase III capability.",
    status: "NOT PUBLISHED",
  },
  {
    item: "Reserve discrepancy / exception handling procedure",
    priority: "MEDIUM",
    detail: "What happens if a reserve discrepancy is discovered? How are token holders notified? No exception procedure published.",
    status: "NOT PUBLISHED",
  },
];

const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: "#e74c3c",
  HIGH:     "#e67e22",
  MEDIUM:   "#f1c40f",
};

export default function ReservePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <span
          className="text-xs font-semibold tracking-widest uppercase mb-3 block"
          style={{ color: "var(--gold)" }}
        >
          Reserve Documentation · As of 2026-04-09
        </span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Reserve Documentation
        </h1>
        <p className="text-lg max-w-3xl" style={{ color: "var(--text-muted)" }}>
          Every gold-reserve claim sourced and audited. What is pledged and what is vaulted, the OLV model methodology,
          and the documentation gaps that must be closed for institutional reserve verification.
        </p>
      </div>

      {/* Critical status banner */}
      <div
        className="rounded-lg p-5 mb-10 flex gap-4"
        style={{ background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.3)" }}
      >
        <AlertTriangle size={20} color="#e74c3c" className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1" style={{ color: "#e74c3c" }}>
            Zero Vaulted Ounces as of Valuation Date
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            The Caprock/Houlihan OLV (June 2024) explicitly states <strong>0 vaulted ounces</strong> at the valuation
            date. The "$6B in gold reserves" refers to a <em>pledge of pledged deposits</em>, not physically vaulted
            gold. No S-K 1300 Qualified Person report has been filed. No independent reserve attestation has been
            completed. "Gold-backed" language on the public site should be read in this context.
          </p>
        </div>
      </div>

      {/* Key numbers */}
      <section className="mb-12 grid md:grid-cols-4 gap-4">
        {[
          { label: "Pledged Gold (OLV model)", value: "6,429,396 oz", sub: "8.87 troy oz per token (OLV assumption)", color: "#e67e22" },
          { label: "Vaulted Gold (June 2024)", value: "0 oz", sub: "As stated in OLV report", color: "#e74c3c" },
          { label: "Vaulting target (as-mined)", value: "50%", sub: "OLV model assumption — not contractually confirmed", color: "#f1c40f" },
          { label: "Net-profits allocation", value: "15%", sub: "Per Assignment Agreement (restricted)", color: "var(--gold)" },
        ].map((card) => (
          <div
            key={card.label}
            className="glass-card rounded-xl p-5 text-center"
          >
            <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              {card.label}
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>{card.sub}</div>
          </div>
        ))}
      </section>

      {/* OLV methodology summary */}
      <section className="mb-16 glass-card rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
          OLV Methodology — Caprock / Houlihan (June 2024)
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>What the OLV Supports</h3>
            <ul className="space-y-2">
              {[
                "Per-token OLV calculation framework",
                "Gold-backed security token framing",
                "Token economics model ($6B+ reserve base)",
                "Methodology: orderly liquidation, not going-concern",
                "Institutional valuation posture",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <CheckCircle size={14} color="#2ecc71" className="flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#e74c3c" }}>What the OLV Does NOT Support</h3>
            <ul className="space-y-2">
              {[
                "Independent reserve audit or resource estimate",
                "Runtime software or platform infrastructure claims",
                "Current custody arrangement confirmation",
                "Market liquidity or secondary trading",
                "Token holder rights or redemption entitlements",
                "Current gold price (effective date: June 2024)",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <XCircle size={14} color="#e74c3c" className="flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="mt-6 rounded-lg p-4 text-sm"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", color: "var(--text-dim)" }}
        >
          The OLV is a <strong>restricted/confidential</strong> document prepared for qualified institutional
          stakeholders. It is not a public offering document, independent reserve audit, or investor prospectus.
          Distribution is controlled.
        </div>
      </section>

      {/* Reserve claims table */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Reserve Claim Verification
        </h2>
        <div className="space-y-4">
          {RESERVE_FACTS.map((fact) => {
            const cfg = STATUS_CONFIG[fact.status] ?? { color: "var(--text-dim)", bg: "rgba(255,255,255,0.02)" };
            return (
              <div
                key={fact.claim}
                className="rounded-xl p-5"
                style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{fact.claim}</span>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: cfg.color }}>{fact.status}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span style={{ color: "var(--text-dim)" }}>Source: </span>
                    <span style={{ color: "var(--text-muted)" }}>{fact.source}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-dim)" }}>Note: </span>
                    <span style={{ color: "var(--text-muted)" }}>{fact.note}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span style={{ color: "var(--text-dim)" }}>Required action: </span>
                    <span style={{ color: cfg.color }}>{fact.action}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Proof gaps */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Reserve Proof Gaps
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          The following documentation is needed to support institutional-grade reserve verification.
          CRITICAL items block diligence close. HIGH items block investor onboarding.
        </p>
        <div className="space-y-4">
          {PROOF_GAPS.map((gap, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded uppercase flex-shrink-0"
                    style={{
                      background: `${PRIORITY_COLORS[gap.priority]}15`,
                      color: PRIORITY_COLORS[gap.priority],
                    }}
                  >
                    {gap.priority}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{gap.item}</span>
                </div>
                <span
                  className="text-xs font-semibold flex-shrink-0"
                  style={{
                    color:
                      gap.status === "NOT STARTED" || gap.status === "NOT PUBLISHED"
                        ? "#e74c3c"
                        : gap.status === "DESIGNED"
                        ? "var(--gold)"
                        : "var(--text-dim)",
                  }}
                >
                  {gap.status}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{gap.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Redemption status */}
      <section className="mb-16 glass-card rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
          Redemption Status
        </h2>
        <div
          className="rounded-lg p-4 mb-6 flex gap-3"
          style={{ background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.3)" }}
        >
          <AlertTriangle size={16} color="#e74c3c" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            <strong style={{ color: "#e74c3c" }}>Redemption is not live.</strong> The smart contract does not contain
            redemption logic. No redemption policy, pricing schedule, minimum size, or process has been publicly
            published. Token holders currently have no on-chain or off-chain redemption mechanism.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {[
            ["Redemption contract deployed", "NO — no on-chain logic"],
            ["Redemption policy published", "NOT PUBLISHED"],
            ["Gold delivery mechanism", "Not described"],
            ["Minimum redemption size", "Not specified"],
            ["Redemption pricing basis", "Not specified"],
            ["Target launch (Phase III)", "Q2–Q3 2026 (planned)"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between gap-4 px-4 py-3 rounded"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <span style={{ color: "var(--text-muted)" }}>{k}</span>
              <span
                className="font-mono text-xs"
                style={{ color: v.startsWith("NO") || v === "NOT PUBLISHED" ? "#e74c3c" : "var(--text)" }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div
        className="rounded-lg p-5 text-sm"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", color: "var(--text-dim)" }}
      >
        Reserve data sourced from: dignitygold.com public site, Caprock/Houlihan OLV (June 2024, restricted),
        and Dignity institutional materials. OLV is not a public document and must be requested through
        proper institutional channels. S-K 1300 QP engagement estimated Q3 2026.
      </div>
    </main>
  );
}
