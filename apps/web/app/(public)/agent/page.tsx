import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intelligence — Dignity",
  description:
    "Dignity's AI agent mesh: 21 MCP tools across 7 operational domains, with x402 AI-to-AI payment rails planned for Phase IV.",
};

const TOOL_DOMAINS = [
  {
    domain: "audit",
    icon: "⬡",
    label: "Audit Chain",
    description:
      "Query and verify the append-only SHA-256 hash-chain audit log. Every state mutation — approval, mint, reserve change — is recorded with a tamper-evident chain link.",
    tools: ["query_events", "verify_chain_integrity", "get_event"],
    readOnly: true,
  },
  {
    domain: "reserve",
    icon: "◈",
    label: "Reserve Management",
    description:
      "Inspect gold reserve lots, compute live coverage ratios, retrieve and publish reserve reports. The treasury agent monitors reserve health continuously against outstanding token supply.",
    tools: ["get_coverage", "list_lots", "get_report", "publish_report"],
    readOnly: false,
  },
  {
    domain: "token",
    icon: "◇",
    label: "Token Operations",
    description:
      "Check the current token supply snapshot and initiate mint/redemption approval requests. All issuance events require multi-party approval — no single agent can self-approve.",
    tools: ["get_status", "request_mint", "request_redemption"],
    readOnly: false,
  },
  {
    domain: "approval",
    icon: "⬡",
    label: "Approval Orchestration",
    description:
      "List, approve, or reject pending operational requests across all domains. The four-eyes principle is enforced at the engine level: requestor and approver must be distinct agents.",
    tools: ["list_pending", "approve", "reject"],
    readOnly: false,
  },
  {
    domain: "compliance",
    icon: "◈",
    label: "Compliance",
    description:
      "Perform real-time KYC/AML investor checks and surface compliance flags for review. The compliance agent can read all audit events but cannot modify any operational records.",
    tools: ["check_investor", "list_flags"],
    readOnly: false,
  },
  {
    domain: "market",
    icon: "◇",
    label: "Market Operations",
    description:
      "Manage trading venue status and spread policies. Venue toggles flow through the approval system — market ops agents propose, board agents approve.",
    tools: ["list_venues", "toggle_venue", "get_spread_policy"],
    readOnly: false,
  },
  {
    domain: "analytics",
    icon: "⬡",
    label: "Analytics",
    description:
      "Generate coverage timelines and issuance summaries for board reporting and public proof-of-reserve disclosures. Read-only — safe to expose to external analytics consumers.",
    tools: ["coverage_timeline", "issuance_summary"],
    readOnly: true,
  },
];

const AGENTS = [
  {
    id: "treasury-agent",
    name: "Treasury Agent",
    role: "TREASURY_OFFICER",
    desc: "Monitors reserve coverage, manages supply snapshots, and initiates mint/redemption requests. Cannot self-approve.",
    domains: ["reserve", "token", "analytics"],
  },
  {
    id: "compliance-agent",
    name: "Compliance Agent",
    role: "COMPLIANCE_OFFICER",
    desc: "Real-time KYC/AML investor checks. Surfaces compliance flags. Read-access to audit chain.",
    domains: ["compliance", "audit"],
  },
  {
    id: "market-ops-agent",
    name: "Market Operations Agent",
    role: "MARKET_OPS",
    desc: "Proposes venue toggles and manages spread policies. Venue state changes require board approval.",
    domains: ["market", "analytics"],
  },
  {
    id: "audit-agent",
    name: "Audit Agent",
    role: "AUDITOR",
    desc: "Permanently read-only. Verifies hash-chain integrity and exports audit records.",
    domains: ["audit"],
  },
  {
    id: "analytics-agent",
    name: "Analytics Agent",
    role: "ANALYTICS",
    desc: "Generates coverage timelines and issuance summaries for public disclosures.",
    domains: ["analytics", "reserve"],
  },
  {
    id: "approval-agent",
    name: "Approval Orchestrator",
    role: "BOARD_DIRECTOR",
    desc: "Reviews and decides pending approval requests. Enforces separation of duties.",
    domains: ["approval", "token", "market", "reserve"],
  },
];

const X402_PHASES = [
  {
    phase: "I",
    label: "Platform Foundation",
    status: "complete",
    items: [
      "Institutional platform DB + audit chain",
      "9 public routes + Cloudflare deployment",
      "Admin panel with reserve, token, approval, compliance, market ops",
    ],
  },
  {
    phase: "II",
    label: "AI Agent Mesh",
    status: "active",
    items: [
      "21 MCP tools across 7 domains",
      "6 platform agent personas with role-based capability gating",
      "A2A message routing between agents",
      "Next.js proxy — single Origin for institutional users",
    ],
  },
  {
    phase: "III",
    label: "External Agent Access",
    status: "planned",
    items: [
      "JWT-gated external agent registration",
      "Agent capability attestation on-chain",
      "Rate limiting per agent role",
      "Audit trail for external agent invocations",
    ],
  },
  {
    phase: "IV",
    label: "x402 AI-to-AI Payment Rail",
    status: "roadmap",
    items: [
      "x402 facilitator at x402.unykorn.org",
      "Apostle Chain ATP asset (chain_id 7332) for micro-payments",
      "Per-tool cost in ATP — read tools free, write tools metered",
      "Agent wallets with ATP budget management",
      "Receipt hash attached to every tool invocation",
    ],
  },
];

export default function AgentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/70 font-medium mb-6">
            Intelligent Infrastructure
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6">
            AI Agent Mesh<br />
            <span className="text-white/40">for Institutional Operations</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
            The Dignity platform exposes its operational state as a structured set of MCP-compatible
            tools. Authorized AI agents can query reserve coverage, verify audit chain integrity,
            initiate approval workflows, and run compliance checks — all with a typed, auditable API.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="border border-white/[0.08] rounded-lg px-5 py-3 text-center">
              <div className="text-2xl font-light text-gold">21</div>
              <div className="text-xs text-white/30 mt-0.5 uppercase tracking-widest">MCP Tools</div>
            </div>
            <div className="border border-white/[0.08] rounded-lg px-5 py-3 text-center">
              <div className="text-2xl font-light text-gold">7</div>
              <div className="text-xs text-white/30 mt-0.5 uppercase tracking-widest">Domains</div>
            </div>
            <div className="border border-white/[0.08] rounded-lg px-5 py-3 text-center">
              <div className="text-2xl font-light text-gold">6</div>
              <div className="text-xs text-white/30 mt-0.5 uppercase tracking-widest">Platform Agents</div>
            </div>
            <div className="border border-white/[0.08] rounded-lg px-5 py-3 text-center">
              <div className="text-2xl font-light text-gold">IV</div>
              <div className="text-xs text-white/30 mt-0.5 uppercase tracking-widest">x402 Phase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="gold-rule max-w-7xl mx-auto px-6" />

      {/* MCP Tool Domains */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-medium mb-3">
            MCP Tool Catalog
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white">
            Seven operational domains
          </h2>
          <p className="text-white/40 text-base mt-3 max-w-2xl">
            Each domain is a logical grouping of tools. Agents are granted access to specific domains
            based on their role. Read-only domains are marked — they carry no audit cost.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TOOL_DOMAINS.map((d) => (
            <div
              key={d.domain}
              className="border border-white/[0.07] rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-gold/60 text-xl mr-3">{d.icon}</span>
                  <span className="text-white font-medium">{d.label}</span>
                </div>
                {d.readOnly && (
                  <span className="text-xs px-2 py-0.5 rounded border border-green-500/20 text-green-400/60">
                    read-only
                  </span>
                )}
              </div>

              <p className="text-white/40 text-sm leading-relaxed mb-5">{d.description}</p>

              <div className="space-y-1">
                {d.tools.map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-white/25">
                    <span className="w-1 h-1 rounded-full bg-gold/30 flex-shrink-0" />
                    <code>{d.domain}.{t}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="gold-rule max-w-7xl mx-auto px-6" />

      {/* Platform Agents */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-medium mb-3">
            Agent Registry
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white">
            Platform agent personas
          </h2>
          <p className="text-white/40 text-base mt-3 max-w-2xl">
            Six canonical AI agents with distinct roles and capability scopes. Separation of duties
            is enforced at the invocation layer — no agent can both request and approve an operation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {AGENTS.map((a) => (
            <div
              key={a.id}
              className="border border-white/[0.07] rounded-xl p-6 bg-white/[0.02]"
            >
              <div className="mb-3">
                <div className="text-white font-medium text-sm">{a.name}</div>
                <div className="text-xs text-gold/50 font-mono mt-0.5">{a.role}</div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{a.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {a.domains.map((d) => (
                  <span
                    key={d}
                    className="text-xs px-2 py-0.5 rounded bg-white/[0.05] text-white/35 border border-white/[0.06]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="gold-rule max-w-7xl mx-auto px-6" />

      {/* x402 Phases */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-medium mb-3">
            x402 AI-to-AI Payment Rail
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white">
            Phase roadmap
          </h2>
          <p className="text-white/40 text-base mt-3 max-w-2xl">
            x402 enables AI agents to pay each other for tool access, using ATP on the Apostle Chain
            (chain_id 7332). Currently in Phase II — the infrastructure is in place, costs are zero,
            and the payment rail is documented and ready to activate in Phase IV.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-4 bottom-4 w-px bg-white/[0.06]" />

          <div className="space-y-6">
            {X402_PHASES.map((p) => (
              <div key={p.phase} className="relative flex gap-6">
                {/* Phase indicator */}
                <div
                  className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-xs font-mono font-medium ${
                    p.status === "complete"
                      ? "border-gold/60 bg-gold/10 text-gold"
                      : p.status === "active"
                      ? "border-blue-400/40 bg-blue-400/10 text-blue-300"
                      : p.status === "planned"
                      ? "border-white/20 bg-white/[0.04] text-white/50"
                      : "border-white/10 bg-transparent text-white/25"
                  }`}
                >
                  {p.phase}
                </div>

                <div
                  className={`flex-1 border rounded-xl p-6 ${
                    p.status === "complete"
                      ? "border-gold/15 bg-gold/[0.03]"
                      : p.status === "active"
                      ? "border-blue-400/15 bg-blue-400/[0.03]"
                      : "border-white/[0.06] bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white font-medium">{p.label}</div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded border ${
                        p.status === "complete"
                          ? "border-gold/30 text-gold/60"
                          : p.status === "active"
                          ? "border-blue-400/30 text-blue-300/60"
                          : p.status === "planned"
                          ? "border-white/20 text-white/30"
                          : "border-white/10 text-white/20"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {p.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                        <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="border border-white/[0.07] rounded-2xl p-10 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-xl font-light text-white mb-2">
              Build on the Dignity agent mesh
            </h2>
            <p className="text-white/40 text-sm max-w-lg">
              Qualified institutional partners can request API access to integrate AI agents
              against the live operational platform.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/platform"
              className="px-5 py-2.5 text-sm rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-colors"
            >
              Platform Overview
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
            >
              Request Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
