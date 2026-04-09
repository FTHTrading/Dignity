import type { Metadata } from "next";
import { ExternalLink, AlertTriangle, CheckCircle, XCircle, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Governance & Control Map — Dignity Institutional",
  description: "Live on-chain control map: who holds each role, wallet types, and governance hardening requirements.",
};

const PROXY = "0x394d14d78850e516fa5eb88f843ef43196e136b0";
const IMPL  = "0x29B358f3bF20E6a6ec95D6bA5488639427C31adB";
const OPERATOR = "0x2F610E3911574b936CEa704354158bf21bA62c3B";
const PROXY_ADMIN = "0x7480A3b12706E29335617F9CC164DFa95A2D7DF5";

const CONTROL_ROLES = [
  {
    role:        "owner",
    selector:    "0x8da5cb5b",
    address:     OPERATOR,
    label:       "Dignity Gold: Deployer",
    walletType:  "EOA",
    note:        "Can propose / accept ownership transfer (two-step).",
    riskLevel:   "HIGH",
  },
  {
    role:        "assetProtectionRole",
    selector:    "0x0a91b601",
    address:     OPERATOR,
    label:       "Dignity Gold: Deployer",
    walletType:  "EOA",
    note:        "Can freeze, unfreeze, wipeFrozenAddress on any holder.",
    riskLevel:   "HIGH",
  },
  {
    role:        "supplyController",
    selector:    "0xe7ba1012",
    address:     OPERATOR,
    label:       "Dignity Gold: Deployer",
    walletType:  "EOA",
    note:        "Can increaseSupply (mint) and decreaseSupply (burn) without limit.",
    riskLevel:   "HIGH",
  },
  {
    role:        "betaDelegateWhitelister",
    selector:    "0xc4f62fee",
    address:     "0x0000000000000000000000000000000000000000",
    label:       "Not set (zero address)",
    walletType:  "—",
    note:        "Delegated-transfer whitelist subsystem is not operational.",
    riskLevel:   "INFO",
  },
  {
    role:        "proposedOwner",
    selector:    "0xd153b60c",
    address:     "0x0000000000000000000000000000000000000000",
    label:       "No pending transfer",
    walletType:  "—",
    note:        "No ownership transfer in progress.",
    riskLevel:   "INFO",
  },
  {
    role:        "proxyAdmin",
    selector:    "storage slot",
    address:     PROXY_ADMIN,
    label:       "Unlabeled / dormant EOA",
    walletType:  "EOA",
    note:        "Controls proxy upgrade: can replace implementation with any contract. 0 ETH, 0 txs — never used.",
    riskLevel:   "CRITICAL",
  },
];

const RISK_COLOR: Record<string, string> = {
  CRITICAL: "#e74c3c",
  HIGH:     "#e67e22",
  MEDIUM:   "#f1c40f",
  INFO:     "#7f8c8d",
};

const GOVERNANCE_REQUIREMENTS = [
  {
    priority: "IMMEDIATE",
    action: "Transfer owner to Gnosis Safe (3-of-5)",
    detail: "Separate keys for operations, compliance, and emergency roles. Hardware wallets required for ≥3 signers.",
    status: "NOT STARTED",
  },
  {
    priority: "IMMEDIATE",
    action: "Transfer assetProtectionRole to limited-role key or separate Safe",
    detail: "Freeze/wipe authority should be isolated from ownership and supply control. Dedicated compliance-team Safe.",
    status: "NOT STARTED",
  },
  {
    priority: "IMMEDIATE",
    action: "Transfer supplyController to treasury-controlled multisig",
    detail: "Mint/burn authority must require treasury approval workflow. Link to documented reserve reconciliation gate.",
    status: "NOT STARTED",
  },
  {
    priority: "IMMEDIATE",
    action: "Transfer proxyAdmin to timelocked Gnosis Safe",
    detail: "Use OpenZeppelin TimelockController with minimum 48-hour delay. Upgrade path: proposal → delay → execution with cancel authority.",
    status: "NOT STARTED",
  },
  {
    priority: "PHASE III",
    action: "Implement on-chain investor registry / whitelist",
    detail: "Wallet-level eligibility enforcement, jurisdiction gating, Reg D/S holding-period logic before transfer execution.",
    status: "DESIGNED",
  },
  {
    priority: "PHASE III",
    action: "Publish admin action policy document",
    detail: "Document freeze/wipe/mint/burn authorization criteria, escalation procedures, and legal authority mapping.",
    status: "DRAFT",
  },
  {
    priority: "PHASE III",
    action: "Establish quarterly role review",
    detail: "Documented evidence of each role holder, wallet attestation, and activity review. Retained for audit trail.",
    status: "DESIGNED",
  },
  {
    priority: "PHASE III",
    action: "Engage third-party smart contract auditor",
    detail: "Trail of Bits, Consensys Diligence, or equivalent. Covers both proxy and implementation. Publish full report.",
    status: "NOT STARTED",
  },
];

const RECENT_ACTIVITY = [
  { action: "Increase Supply", time: "36 hrs ago", txHash: "0xd839fe5c83463a6aaddaba8d937046257a504fa19822b81eb1c98761e1d099d1" },
  { action: "Wipe Frozen Address", time: "36 hrs ago", txHash: "0x55c755cc6ef57eff9b89c45de3ab7dce43ad6b72d86a6b0b04572a1caf69a6cc" },
  { action: "Freeze", time: "37 hrs ago", txHash: "0x9599507a5c14057a16a334f20a51d0896c871d1f539049b874f4ba7e8540c69d" },
  { action: "Increase Supply", time: "37 hrs ago", txHash: "0x2a9eda1fe94fa15c583335de2dc7ae52292668263dbab809d973bf0b4326feb4" },
  { action: "Wipe Frozen Address", time: "37 hrs ago", txHash: "0xe097ada306299466fdd29e8978d5f8acf5963ae061d5ffb5e4555361199ce1e1" },
  { action: "Freeze ×14", time: "44 hrs ago", txHash: "", note: "14 freeze ops in blocks 24828918–24828941" },
];

function shortAddr(addr: string) {
  if (addr === "0x0000000000000000000000000000000000000000") return "0x0000…0000";
  return addr.slice(0, 10) + "…" + addr.slice(-8);
}

export default function GovernancePage() {
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
          Governance &amp; Control Map
        </h1>
        <p className="text-lg max-w-3xl" style={{ color: "var(--text-muted)" }}>
          Live addresses holding each privileged role on the DIGau contracts, wallet types confirmed via{" "}
          <code>eth_getCode</code>, and the governance hardening steps required for institutional-grade change control.
        </p>
      </div>

      {/* Contract addresses quick ref */}
      <div className="glass-card rounded-xl p-6 mb-10">
        <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
          Target Contracts
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Proxy (token address)", addr: PROXY },
            { label: "Implementation (DIGauImplementationV2)", addr: IMPL },
          ].map(({ label, addr }) => (
            <div
              key={addr}
              className="rounded-lg p-4 flex items-center justify-between gap-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
            >
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</div>
                <code className="text-sm" style={{ color: "var(--gold)" }}>{shortAddr(addr)}</code>
              </div>
              <a
                href={`https://etherscan.io/address/${addr}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-dim)" }}
              >
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Control Map ── */}
      <section id="control-map" className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Live Control Map
        </h2>

        {/* Key finding banner */}
        <div
          className="rounded-lg p-5 mb-6 flex gap-4"
          style={{ background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.3)" }}
        >
          <AlertTriangle size={20} color="#e74c3c" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1" style={{ color: "#e74c3c" }}>
              Single-Key Concentration
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              <code style={{ color: "var(--gold)" }}>{shortAddr(OPERATOR)}</code>{" "}
              (<strong>Dignity Gold: Deployer</strong>) currently holds <strong>three high-privilege roles
              simultaneously</strong>: <code>owner</code>, <code>assetProtectionRole</code>, and{" "}
              <code>supplyController</code>. This single EOA — funded from Coinbase, confirmed by{" "}
              <code>eth_getCode</code> to have no contract bytecode — can pause, freeze, wipe balances, mint,
              and burn without any co-signer approval. No multisig or timelock confirmed at any layer.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Role", "Address", "Etherscan Label", "Wallet Type", "Risk", "Notes"].map((h) => (
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
              {CONTROL_ROLES.map((row) => (
                <tr
                  key={row.role}
                  style={{ borderBottom: "1px solid var(--border)" }}
                  className="hover:bg-white/[0.02]"
                >
                  <td className="py-3 px-4">
                    <code className="text-xs" style={{ color: "var(--gold)" }}>{row.role}</code>
                  </td>
                  <td className="py-3 px-4">
                    {row.address !== "0x0000000000000000000000000000000000000000" ? (
                      <a
                        href={`https://etherscan.io/address/${row.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                        style={{ color: "var(--text-dim)" }}
                      >
                        <code className="text-xs">{shortAddr(row.address)}</code>
                        <ExternalLink size={10} />
                      </a>
                    ) : (
                      <code className="text-xs" style={{ color: "var(--text-dim)" }}>
                        {shortAddr(row.address)}
                      </code>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    {row.label}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{
                        background: row.walletType === "EOA" ? "rgba(231,76,60,0.12)" : "rgba(127,140,141,0.12)",
                        color: row.walletType === "EOA" ? "#e74c3c" : "var(--text-dim)",
                      }}
                    >
                      {row.walletType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-xs font-bold"
                      style={{ color: RISK_COLOR[row.riskLevel] ?? "var(--text-dim)" }}
                    >
                      {row.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs" style={{ color: "var(--text-dim)", maxWidth: "280px" }}>
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Operator wallet detail ── */}
      <section className="mb-16 grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>
            Operator Wallet — Dignity Gold: Deployer
          </h3>
          <div className="space-y-3 text-sm">
            {[
              ["Address", shortAddr(OPERATOR)],
              ["Etherscan Label", "Dignity Gold: Deployer"],
              ["Wallet Type", "EOA (eth_getCode → 0x)"],
              ["ETH Balance", "0.0853 ETH"],
              ["Token Holdings", "$25,748,358 (40 tokens)"],
              ["Funded By", "Coinbase (Coinbase 33)"],
              ["First Transaction", "~4 years 336 days ago"],
              ["Last Transaction", "~36 hours ago (2026-04-08)"],
              ["Total Transactions", "7,838"],
              ["DIGau Balance", "~64,384,095.92 DIGau (~2.15%)"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span style={{ color: "var(--text-muted)" }}>{k}</span>
                <span className="text-right font-mono text-xs" style={{ color: "var(--text)" }}>{v}</span>
              </div>
            ))}
          </div>
          <a
            href={`https://etherscan.io/address/${OPERATOR}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-1 text-xs"
            style={{ color: "var(--gold)" }}
          >
            View on Etherscan <ExternalLink size={11} />
          </a>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>
            Proxy Admin Wallet — Dormant EOA
          </h3>
          <div className="space-y-3 text-sm">
            {[
              ["Address", shortAddr(PROXY_ADMIN)],
              ["Etherscan Label", "None (unlabeled)"],
              ["Wallet Type", "EOA (eth_getCode → 0x)"],
              ["ETH Balance", "0 ETH"],
              ["Funded By", "N/A — never funded"],
              ["First Transaction", "N/A — no transaction history"],
              ["Last Transaction", "N/A"],
              ["Total Transactions", "0"],
              ["Authority", "Proxy admin — can upgrade contract"],
              ["Risk", "CRITICAL — dormant key with upgrade authority"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span style={{ color: "var(--text-muted)" }}>{k}</span>
                <span className="text-right font-mono text-xs" style={{ color: k === "Risk" ? "#e74c3c" : "var(--text)" }}>{v}</span>
              </div>
            ))}
          </div>
          <a
            href={`https://etherscan.io/address/${PROXY_ADMIN}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-1 text-xs"
            style={{ color: "var(--gold)" }}
          >
            View on Etherscan <ExternalLink size={11} />
          </a>
        </div>
      </section>

      {/* ── Recent Operator Activity ── */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Recent Operator Activity
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          Operator address has been actively exercising privileged functions in the last 48 hours. This confirms the
          contract is live and operational — and that freeze/mint/wipe functions are in regular use.
        </p>
        <div className="space-y-2">
          {RECENT_ACTIVITY.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-lg px-4 py-3"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)" }}
                >
                  {item.action}
                </span>
                {item.note && (
                  <span className="text-xs" style={{ color: "var(--text-dim)" }}>
                    {item.note}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs" style={{ color: "var(--text-dim)" }}>{item.time}</span>
                {item.txHash && (
                  <a
                    href={`https://etherscan.io/tx/${item.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "var(--text-dim)" }}
                  >
                    <code>{item.txHash.slice(0, 10)}…</code>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Governance Hardening Requirements ── */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          Governance Hardening Requirements
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          The following changes are required to reach institutional-grade governance posture. Immediate items block
          qualified-investor onboarding.
        </p>
        <div className="space-y-4">
          {GOVERNANCE_REQUIREMENTS.map((req, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded uppercase"
                    style={{
                      background: req.priority === "IMMEDIATE"
                        ? "rgba(231,76,60,0.12)"
                        : "rgba(201,168,76,0.1)",
                      color: req.priority === "IMMEDIATE" ? "#e74c3c" : "var(--gold)",
                    }}
                  >
                    {req.priority}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {req.action}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold flex-shrink-0"
                  style={{
                    color: req.status === "NOT STARTED"
                      ? "#e74c3c"
                      : req.status === "DESIGNED"
                      ? "var(--gold)"
                      : "#2ecc71",
                  }}
                >
                  {req.status}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{req.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Security Evidence Gaps ── */}
      <section className="mb-16 glass-card rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Security Evidence Gaps
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Smart contract audit", status: "NONE", icon: <XCircle size={16} color="#e74c3c" />, note: "No audit submitted to Etherscan. No public audit report identified." },
            { label: "Test suite published", status: "NONE", icon: <XCircle size={16} color="#e74c3c" />, note: "No test suite in Etherscan-verified source. Solidity 0.4.24 predates modern tooling." },
            { label: "Upgrade history", status: "1 known implementation", icon: <Clock size={16} color="#e67e22" />, note: "DIGauImplementationV2 is current. Prior implementations not confirmed on-chain." },
            { label: "Deployment manifest", status: "PARTIAL", icon: <Clock size={16} color="#e67e22" />, note: "Proxy + implementation addresses on Etherscan. Formal deployment manifest not published." },
            { label: "Admin key handling doc", status: "NONE", icon: <XCircle size={16} color="#e74c3c" />, note: "No published key management, hardware wallet policy, or emergency key procedure." },
            { label: "Incident response playbook", status: "NONE", icon: <XCircle size={16} color="#e74c3c" />, note: "No published incident response or emergency contact procedure." },
            { label: "Immutable admin action log", status: "PARTIAL", icon: <Clock size={16} color="#e67e22" />, note: "Etherscan provides on-chain event history. No off-chain immutable evidence package assembled." },
            { label: "Quarterly role review", status: "NONE", icon: <XCircle size={16} color="#e74c3c" />, note: "Not yet established. Required for institutional compliance posture." },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg p-4 flex gap-3"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-dim)" }}>
                    — {item.status}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div
        className="rounded-lg p-5 text-sm"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", color: "var(--text-dim)" }}
      >
        <Shield size={14} className="inline mr-2" style={{ color: "var(--gold)" }} />
        All role addresses queried via <code>eth_call</code> and <code>eth_getStorageAt</code> against Ethereum mainnet
        on 2026-04-09. Wallet types confirmed via <code>eth_getCode</code> (empty bytecode = EOA). Data is point-in-time;
        roles may change via on-chain transactions. See{" "}
        <a href={`https://etherscan.io/token/${PROXY}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>
          Etherscan token page
        </a>{" "}
        for live state.
      </div>
    </main>
  );
}
