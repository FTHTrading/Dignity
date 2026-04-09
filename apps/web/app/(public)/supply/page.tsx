import type { Metadata } from "next";
import { ExternalLink, AlertTriangle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Supply Reconciliation — Dignity Institutional",
  description: "Live on-chain supply data, OLV model assumptions, and the reconciliation gaps that must be resolved.",
};

const PROXY = "0x394d14d78850e516fa5eb88f843ef43196e136b0";
const OPERATOR = "0x2F610E3911574b936CEa704354158bf21bA62c3B";

const SUPPLY_TABLE = [
  {
    metric:    "Max Total Supply",
    value:     "3,000,000,000",
    source:    "On-chain — contract constant",
    status:    "CONFIRMED",
    note:      "Set at deployment. Could theoretically be changed via proxy upgrade — no on-chain cap enforcement without governance guard.",
  },
  {
    metric:    "Total Supply (Minted)",
    value:     "3,000,000,000.000000003418273809",
    source:    "On-chain — totalSupply() call",
    status:    "CONFIRMED",
    note:      "Max supply is fully minted. Fractional residual of ~3.4×10⁻⁹ tokens from rounding in increaseSupply calls.",
  },
  {
    metric:    "Operator / Deployer Balance",
    value:     "~64,384,095.92",
    source:    "On-chain — balanceOf(Deployer)",
    status:    "CONFIRMED",
    note:      "~2.15% of total supply held by Dignity Gold: Deployer EOA. Not labeled as treasury on Etherscan.",
  },
  {
    metric:    "Circulating Supply (Etherscan)",
    value:     "$0.00 market cap",
    source:    "Etherscan token page",
    status:    "UNRECONCILED",
    note:      "Etherscan reports circulating supply market cap as $0.00, meaning all tokens are classified as non-circulating. No explanation published.",
  },
  {
    metric:    "Circulating Supply (OLV model)",
    value:     "700,000,000",
    source:    "Caprock/Houlihan OLV, June 2024",
    status:    "UNRECONCILED",
    note:      "OLV valuation uses 700M as the working circulation assumption. This is 23.3% of the 3B minted. The basis for this number is not externally published.",
  },
  {
    metric:    "Treasury / Non-Circulating",
    value:     "~2,935,616,000 (est.)",
    source:    "Derived: total supply minus operator balance",
    status:    "ESTIMATED",
    note:      "Approximate treasury/custody pool. True allocation across custody addresses not published. No custodian statements confirming holdings.",
  },
  {
    metric:    "Frozen Supply",
    value:     "Unknown",
    source:    "Not published",
    status:    "MISSING",
    note:      "Freeze operations confirmed active (14+ in 44 hrs). Aggregate frozen balance not published. Frozen tokens cannot transfer but remain in totalSupply.",
  },
  {
    metric:    "Burned Supply",
    value:     "Unknown",
    source:    "Not published",
    status:    "MISSING",
    note:      "decreaseSupply() function exists and has been called. Cumulative burn total not published. Burns reduce totalSupply.",
  },
  {
    metric:    "Net Circulating (computable)",
    value:     "Cannot compute",
    source:    "—",
    status:    "BLOCKED",
    note:      "True net circulating = total supply − frozen − treasury/custody locked − burned-to-date. None of these sub-components are currently published in reconciled form.",
  },
];

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED:     "#2ecc71",
  UNRECONCILED:  "#e67e22",
  ESTIMATED:     "#f1c40f",
  MISSING:       "#e74c3c",
  BLOCKED:       "#e74c3c",
};

const RECONCILIATION_GAPS = [
  "3B tokens are fully minted on-chain, but OLV model uses 700M circulation — 2.3× unexplained gap.",
  "Etherscan reports $0 circulating market cap — no public explanation of which wallets are treated as treasury.",
  "No custody statement published showing token allocation across Fireblocks, BitGo, or other custodians.",
  "Frozen supply is actively growing (recent freeze events) but aggregate total is not tracked or published.",
  "Burn history exists on-chain but no cumulative burn total has been reconciled into supply metrics.",
  "No canonical supply table has been published defining: minted, treasury, circulating, frozen, burned.",
];

const REQUIRED_DISCLOSURES = [
  { item: "Canonical supply table with all sub-components", priority: "IMMEDIATE" },
  { item: "Treasury/custody wallet addresses with allocation percentages", priority: "IMMEDIATE" },
  { item: "Monthly supply reconciliation report (minted → circulating → frozen → burned)", priority: "PHASE III" },
  { item: "Custodian statements confirming token balances", priority: "PHASE III" },
  { item: "Reserve-to-supply coverage ratio (once reserve attestation complete)", priority: "PHASE III" },
  { item: "Vesting / unlock schedule if any custody supply is time-locked", priority: "PHASE III" },
];

export default function SupplyPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <span
          className="text-xs font-semibold tracking-widest uppercase mb-3 block"
          style={{ color: "var(--gold)" }}
        >
          On-Chain Intelligence · Queried 2026-04-09
        </span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Supply Reconciliation
        </h1>
        <p className="text-lg max-w-3xl" style={{ color: "var(--text-muted)" }}>
          Every supply-related number sourced, compared, and reconciled against on-chain data. 
          The gaps that must be closed before institutional supply metrics can be published.
        </p>
      </div>

      {/* Key finding banner */}
      <div
        className="rounded-lg p-5 mb-10 flex gap-4"
        style={{ background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.3)" }}
      >
        <AlertTriangle size={20} color="#e74c3c" className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1" style={{ color: "#e74c3c" }}>
            Max Supply Fully Minted — Circulating Definition Unreconciled
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            On-chain <code>totalSupply()</code> = <strong>3,000,000,000.000000003418273809</strong> — the entire max
            supply has been minted. Etherscan shows <strong>$0.00 circulating market cap</strong>. The Caprock/Houlihan
            OLV model (June 2024) used <strong>700,000,000</strong> as its circulation assumption. These three figures
            have never been reconciled in a publicly published supply table.
          </p>
        </div>
      </div>

      {/* Supply table */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Supply Components
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Metric", "Value", "Source", "Status", "Notes"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs font-semibold tracking-wide uppercase"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUPPLY_TABLE.map((row) => (
                <tr
                  key={row.metric}
                  style={{ borderBottom: "1px solid var(--border)" }}
                  className="hover:bg-white/[0.02]"
                >
                  <td className="py-3 px-4 font-medium text-sm" style={{ color: "var(--text)" }}>
                    {row.metric}
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-xs" style={{ color: "var(--gold)" }}>{row.value}</code>
                  </td>
                  <td className="py-3 px-4 text-xs" style={{ color: "var(--text-dim)" }}>
                    {row.source}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-xs font-bold"
                      style={{ color: STATUS_COLORS[row.status] ?? "var(--text-dim)" }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs" style={{ color: "var(--text-dim)", maxWidth: "320px" }}>
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Visual reconciliation */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Supply Breakdown (On-Chain Layer)
        </h2>
        <div className="glass-card rounded-xl p-8">
          <div className="mb-6">
            <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>TOTAL MINTED (3,000,000,000 = 100%)</div>
            <div className="w-full h-10 rounded-lg overflow-hidden flex">
              {/* Operator: 2.15% */}
              <div
                style={{ width: "2.15%", background: "var(--gold)" }}
                title="Operator: ~64M (2.15%)"
              />
              {/* Treasury/unknown: 97.85% */}
              <div
                style={{ width: "97.85%", background: "rgba(255,255,255,0.1)" }}
                title="Non-circulating / treasury / unknown: ~2.94B (97.85%)"
              />
            </div>
            <div className="flex gap-6 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: "var(--gold)" }} />
                <span style={{ color: "var(--text-muted)" }}>Operator/Deployer (~64M, 2.15%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.1)" }} />
                <span style={{ color: "var(--text-muted)" }}>Non-circulating/Treasury/Unknown (~2.94B, 97.85%)</span>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg p-4 mt-4 flex gap-3"
            style={{ background: "rgba(231,76,60,0.06)", border: "1px solid rgba(231,76,60,0.2)" }}
          >
            <Info size={14} color="#e67e22" className="flex-shrink-0 mt-0.5" />
            <p className="text-xs" style={{ color: "var(--text-dim)" }}>
              The 97.85% "non-circulating" category is unverified — no wallet-level custody breakdown has been published.
              This pool includes treasury-held tokens, potential custodian wallets, and any frozen or vesting supply.
              It does <strong>not</strong> confirm that 97.85% of tokens are locked, burned, or inaccessible.
            </p>
          </div>
        </div>
      </section>

      {/* OLV vs on-chain comparison */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          OLV Model vs. On-Chain Reality
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              label: "OLV Circulation Assumption",
              value: "700,000,000",
              sub: "23.3% of max supply",
              source: "Caprock/Houlihan, June 2024",
              color: "#e67e22",
            },
            {
              label: "Etherscan Circulating",
              value: "$0.00",
              sub: "Declared non-circulating",
              source: "Etherscan token page",
              color: "#e74c3c",
            },
            {
              label: "On-Chain Total Minted",
              value: "3,000,000,000",
              sub: "Max supply — fully minted",
              source: "eth_call totalSupply()",
              color: "#2ecc71",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="text-xs mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {card.label}
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="text-xs mb-3" style={{ color: "var(--text-dim)" }}>{card.sub}</div>
              <div
                className="text-xs px-2 py-1 rounded"
                style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-dim)" }}
              >
                {card.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reconciliation gaps */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
          Reconciliation Gaps
        </h2>
        <div className="space-y-3">
          {RECONCILIATION_GAPS.map((gap, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg px-4 py-3"
              style={{ background: "rgba(231,76,60,0.05)", border: "1px solid rgba(231,76,60,0.15)" }}
            >
              <AlertTriangle size={14} color="#e74c3c" className="flex-shrink-0 mt-0.5" />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>{gap}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Required disclosures */}
      <section className="mb-16 glass-card rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Required Disclosures
        </h2>
        <div className="space-y-3">
          {REQUIRED_DISCLOSURES.map((d) => (
            <div
              key={d.item}
              className="flex items-center justify-between gap-4 rounded-lg px-4 py-3"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <span className="text-sm" style={{ color: "var(--text)" }}>{d.item}</span>
              <span
                className="text-xs font-bold flex-shrink-0"
                style={{ color: d.priority === "IMMEDIATE" ? "#e74c3c" : "var(--gold)" }}
              >
                {d.priority}
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
        Supply data queried via <code>eth_call totalSupply()</code> and{" "}
        <code>balanceOf({OPERATOR.slice(0, 10)}…)</code> against Ethereum mainnet on 2026-04-09.
        OLV figures from Caprock/Houlihan report (June 2024). All on-chain data is point-in-time.{" "}
        <a
          href={`https://etherscan.io/token/${PROXY}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--gold)" }}
        >
          Live Etherscan <ExternalLink size={11} className="inline" />
        </a>
      </div>
    </main>
  );
}
