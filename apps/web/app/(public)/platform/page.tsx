import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Platform | Dignity" };

const PACKAGES = [
  { name: "@dignity/db",                 role: "Data layer",            desc: "Prisma 5.x ORM, PostgreSQL schema, migrations, and seed infrastructure. Single source of truth for all platform state." },
  { name: "@dignity/audit",              role: "Audit & integrity",      desc: "Append-only SHA-256 hash-chain event logger. Every action produces a tamper-evident, sequentially linked audit record." },
  { name: "@dignity/auth",              role: "Access control",         desc: "NextAuth.js v4 with role-policy engine. Eight roles, granular permission scopes, and separation-of-duties enforcement." },
  { name: "@dignity/compliance-engine", role: "Regulatory compliance",  desc: "Policy evaluation engine for AML, KYC, accreditation, and jurisdiction rules. Wired into every subscription and transfer flow." },
  { name: "@dignity/token-engine",      role: "Token lifecycle",        desc: "Mint, redeem, transfer, and freeze logic for the DIGAU security token. Enforces reserve coverage gating before issuance." },
  { name: "@dignity/treasury",          role: "Treasury ops",           desc: "Inflow and outflow recording, Treasury Officer workflow, and approval-gated mint/redemption request management." },
  { name: "@dignity/reserve-registry",  role: "Reserve management",     desc: "Custodied lot tracking, valuation snapshots, coverage ratio computation, and attestation anchoring." },
  { name: "@dignity/attestation",       role: "Proof of reserve",       desc: "Third-party attestation record management with on-chain anchor support via ReserveProofAnchor.sol on Base." },
  { name: "@dignity/market-ops",        role: "Market structure",       desc: "Venue registry, spread-policy management, market-maker framework, circuit-breaker controls, and OTC RFQ infrastructure." },
  { name: "@dignity/exchange-adapters", role: "Exchange connectivity",  desc: "Adapter interfaces for connecting DIGAU to licensed exchange venues and ATS environments." },
  { name: "@dignity/analytics",         role: "Data & reporting",       desc: "Liquidity snapshots, coverage timeline, issuance history, and portfolio analytics for institutional reporting." },
  { name: "@dignity/documents",         role: "Document management",    desc: "Term sheets, offering documents, investor disclosures, and compliance reports with versioning and access controls." },
  { name: "@dignity/shared-types",      role: "Type contracts",         desc: "Canonical TypeScript enum and interface definitions shared across all packages. The authoritative domain language of the platform." },
  { name: "@dignity/ui",                role: "Design system",          desc: "Institutional component library: stat blocks, coverage gauge, gold dividers, glass panels, data tables, and approval cards." },
];

const LAYERS = [
  { label: "Governance Layer",    items: ["Approval workflow engine", "Separation-of-duties enforcement", "Role-policy matrix", "Audit event chain"] },
  { label: "Reserve Layer",       items: ["Custodied lot registry", "Attestation management", "Coverage ratio computation", "On-chain proof anchoring"] },
  { label: "Token Layer",         items: ["Mint/redeem lifecycle", "Transfer controls", "Reserve gating pre-issuance", "Token-status state machine"] },
  { label: "Market Layer",        items: ["Venue registry & status", "Spread policy governance", "Market maker framework", "Circuit breaker controls"] },
  { label: "Compliance Layer",    items: ["KYC/AML policy engine", "Jurisdiction rules", "Accreditation verification", "Regulatory event logging"] },
  { label: "Infrastructure",      items: ["PostgreSQL + Prisma ORM", "Next.js 15 app router", "pnpm monorepo + Turborepo", "Hash-chain audit trail"] },
];

export default function PlatformPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Institutional Platform</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          14 Packages.<br />
          <span className="text-white/45 italic">One Operating System.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          The Dignity platform is a production-grade Next.js monorepo with fourteen specialised
          packages covering every dimension of an institutional digital securities operation: token
          lifecycle, reserve management, compliance enforcement, market structure, and governance.
        </p>
      </div>

      <div className="gold-rule mb-16" />

      {/* Architecture layers */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">Architecture Layers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAYERS.map((layer) => (
            <div key={layer.label} className="glass-panel p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-4 bg-gold/60 rounded-full" />
                <h3 className="text-sm font-semibold text-white/80">{layer.label}</h3>
              </div>
              <ul className="space-y-1">
                {layer.items.map((item) => (
                  <li key={item} className="text-xs text-white/40 flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-white/20 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Package registry */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">Package Registry</h2>
        <div className="space-y-2">
          {PACKAGES.map((pkg) => (
            <div key={pkg.name}
              className="glass-panel px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3 hover:border-white/[0.10] transition-colors">
              <div className="flex-shrink-0 sm:w-56">
                <code className="text-xs text-gold/70 font-mono">{pkg.name}</code>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mt-0.5">{pkg.role}</p>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{pkg.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform narrative */}
      <div className="gold-rule mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Built for Institutional Review</h2>
          <p className="text-white/55 leading-relaxed text-sm">
            The platform is not a prototype. It is a structured application designed from the
            ground up to support the operating requirements of an institutional digital securities
            issuer: auditable events, access-controlled workflows, reserve-coverage gating, and a
            separation-of-duties enforcement layer that mirrors the governance standards applied in
            traditional capital markets.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Operating Evidence Available</h2>
          <p className="text-white/55 leading-relaxed text-sm">
            Every critical flow has been validated against a live database. Approval requests are
            created and decided. Reserve reports move from DRAFT to PUBLISHED. Venue toggles create
            governance approval chains. Every action writes an immutable, hash-linked audit event.
            This is operating evidence, not design documentation.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/controls"
          className="px-6 py-3 rounded-xl bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors text-center">
          Governance & Controls →
        </Link>
        <Link href="/proof"
          className="px-6 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors text-center">
          View Proof Center
        </Link>
      </div>
    </div>
  );
}
