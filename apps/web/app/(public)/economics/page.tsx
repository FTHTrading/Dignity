import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Economics | Dignity" };

const FEE_SCHEDULE = [
  {
    stream:    "Issuance Spread",
    rate:      "0.50%",
    basis:     "Notional value at mint",
    frequency: "Per event",
    phase:     "Active at first close",
  },
  {
    stream:    "Annual Custody Fee",
    rate:      "0.20% p.a.",
    basis:     "Assets under management",
    frequency: "Quarterly arrears",
    phase:     "Active at first close",
  },
  {
    stream:    "Redemption Fee",
    rate:      "0.25%",
    basis:     "Redemption notional (physical)",
    frequency: "Per event",
    phase:     "Active at first close",
  },
  {
    stream:    "Transfer Fee",
    rate:      "0.05%",
    basis:     "Settlement notional",
    frequency: "Per trade",
    phase:     "Active at first close",
  },
  {
    stream:    "Compliance API",
    rate:      "Subscription",
    basis:     "Per institutional seat",
    frequency: "Monthly",
    phase:     "Phase III",
  },
  {
    stream:    "Analytics API",
    rate:      "Subscription",
    basis:     "Per integration",
    frequency: "Monthly",
    phase:     "Phase III",
  },
  {
    stream:    "x402 Agent Micro-fees",
    rate:      "Per-invocation ATP",
    basis:     "MCP tool call",
    frequency: "Real-time settlement",
    phase:     "Phase IV",
  },
];

type Scenario = {
  label: string;
  aum: string;
  aumRaw: number;
  annualMint: string;
  annualTrades: string;
  issuanceFee: string;
  custodyFee: string;
  redemptionFee: string;
  transferFee: string;
  total: string;
  note: string;
};

const SCENARIOS: Scenario[] = [
  {
    label:        "Seed",
    aum:          "$10M",
    aumRaw:       10_000_000,
    annualMint:   "$5M notional",
    annualTrades: "$20M turnover",
    issuanceFee:  "$25,000",
    custodyFee:   "$20,000",
    redemptionFee:"$6,250",
    transferFee:  "$10,000",
    total:        "~$61,000",
    note:         "Early-stage validation. Covers operating costs + compliance overhead.",
  },
  {
    label:        "Growth",
    aum:          "$50M",
    aumRaw:       50_000_000,
    annualMint:   "$20M notional",
    annualTrades: "$100M turnover",
    issuanceFee:  "$100,000",
    custodyFee:   "$100,000",
    redemptionFee:"$25,000",
    transferFee:  "$50,000",
    total:        "~$275,000",
    note:         "Platform self-sustaining. Board compensation and infrastructure fully covered.",
  },
  {
    label:        "Institutional",
    aum:          "$250M",
    aumRaw:       250_000_000,
    annualMint:   "$80M notional",
    annualTrades: "$500M turnover",
    issuanceFee:  "$400,000",
    custodyFee:   "$500,000",
    redemptionFee:"$100,000",
    transferFee:  "$250,000",
    total:        "~$1.25M",
    note:         "Meaningful institutional revenue. API subscriptions additive from Phase III.",
  },
  {
    label:        "Scale",
    aum:          "$1B+",
    aumRaw:       1_000_000_000,
    annualMint:   "$250M notional",
    annualTrades: "$2B turnover",
    issuanceFee:  "$1.25M",
    custodyFee:   "$2.0M",
    redemptionFee:"$312,500",
    transferFee:  "$1.0M",
    total:        "~$4.56M+",
    note:         "Comparable to mid-tier ETP issuer economics. x402 agent rail additive.",
  },
];

const TOKEN_PARAMS = [
  { param: "Denomination",           value: "1 DIGAU = 1 troy ounce equivalent" },
  { param: "Fractional minimum",     value: "0.001 troy oz" },
  { param: "Backing requirement",    value: "100% allocated physical gold" },
  { param: "Coverage floor",         value: "1.000 (100%) — issuance gated at API" },
  { param: "Coverage buffer target", value: "+5% above minimum" },
  { param: "Revaluation frequency",  value: "Daily at LBMA AM spot fix" },
  { param: "Issuance authority",     value: "Board + Treasury — dual approval enforced" },
  { param: "Redemption right",       value: "Physical allocation or cash at LBMA AM fix" },
  { param: "Transfer restriction",   value: "KYC/AML-verified counterparties only" },
  { param: "Custodian attestation",  value: "Monthly custody letters on file" },
];

const PHASE_STYLE: Record<string, string> = {
  "Active at first close": "text-emerald-400/80 bg-emerald-400/10 border-emerald-400/20",
  "Phase III":             "text-gold/70 bg-gold/10 border-gold/20",
  "Phase IV":              "text-white/30 bg-white/[0.03] border-white/10",
};

export default function EconomicsPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Economics</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          Revenue Model &<br />
          <span className="text-white/45 italic">Token Economics.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Dignity operates on a transparent, fee-based revenue model aligned with institutional
          capital markets conventions. No speculative token appreciation dependency. No
          inflation mechanic. Revenue scales directly with assets under management.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Token Parameters */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">
          Token Parameters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TOKEN_PARAMS.map((p) => (
            <div key={p.param}
              className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.015]">
              <span className="h-1 w-1 rounded-full bg-gold/40 mt-1.5 flex-shrink-0" />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 min-w-0">
                <span className="text-xs text-white/40 flex-shrink-0">{p.param}</span>
                <span className="text-xs text-white/75 font-medium text-left sm:text-right">{p.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* Fee Schedule */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">
          Fee Schedule
        </h2>
        <div className="space-y-2">
          {FEE_SCHEDULE.map((f) => (
            <div key={f.stream}
              className="glass-card flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-sm font-semibold text-white/85">{f.stream}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${PHASE_STYLE[f.phase]}`}>
                    {f.phase}
                  </span>
                </div>
                <p className="text-xs text-white/35">{f.basis} · {f.frequency}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-lg font-mono text-gold/90">{f.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* AUM Scenarios */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-3">
          Revenue Scenarios by AUM
        </h2>
        <p className="text-xs text-white/30 mb-8 max-w-xl leading-relaxed">
          Illustrative projections based on fee schedule above. Assumes 50% of AUM minted annually,
          annual trading turnover at 2–4× AUM, and 12.5% redemption rate. Excludes API subscriptions
          and Phase IV agent micro-fees.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCENARIOS.map((s) => (
            <div key={s.label} className="glass-card">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-widest font-medium mb-0.5">{s.label} Scenario</p>
                  <p className="text-3xl font-mono text-white/90">{s.aum}</p>
                  <p className="text-xs text-white/30">Assets under management</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gold/50 uppercase tracking-widest mb-0.5">Annual Revenue</p>
                  <p className="text-2xl font-mono text-gold/90">{s.total}</p>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-4 space-y-2 mb-4">
                {[
                  ["Issuance fees",  s.issuanceFee,  s.annualMint],
                  ["Custody fees",   s.custodyFee,   `${s.aum} AUM`],
                  ["Redemption fees",s.redemptionFee, "12.5% redeem rate"],
                  ["Transfer fees",  s.transferFee,  s.annualTrades],
                ].map(([label, amount, basis]) => (
                  <div key={label} className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white/45">{label}</span>
                      <span className="text-[10px] text-white/20 ml-2">{basis}</span>
                    </div>
                    <span className="text-xs text-white/65 font-mono">{amount}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-white/30 leading-relaxed border-t border-white/[0.05] pt-3">
                {s.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01]">
          <p className="text-[10px] text-white/20 leading-relaxed">
            <span className="text-white/15 uppercase tracking-widest text-[9px] font-medium mr-2">Note</span>
            Projections are illustrative only. Actual results depend on market conditions, ATC execution timing, investor uptake,
            and fee schedule as set by the board. Past performance of comparable instruments is not a guarantee of future results.
          </p>
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* Coverage mechanics */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-6">
          Coverage Ratio Mechanics
        </h2>
        <div className="glass-card">
          <div className="font-mono text-center text-sm text-white/70 mb-6 py-4 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            Coverage Ratio = <span className="text-gold/80">Σ(Reserve Lot Valuation)</span>{" "}
            ÷{" "}
            <span className="text-white/50">Σ(Outstanding Supply × Par Value)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Minimum Floor",    value: "1.000",   sub: "100% backing enforced at API layer" },
              { label: "Buffer Target",    value: "+5%",     sub: "Operational buffer above minimum" },
              { label: "Revaluation",      value: "Daily",   sub: "LBMA AM spot fix, custodian monthly" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xs text-white/25 uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-3xl font-mono text-gold/80 mb-1">{item.value}</p>
                <p className="text-xs text-white/30">{item.sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-white/30 leading-relaxed border-t border-white/[0.05] pt-4">
            Issuance is blocked at the API level if a proposed mint would cause post-mint coverage to fall below 1.000.
            This is a system invariant — it cannot be overridden by any administrative user, including board directors.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/investor-pathway"
          className="btn-primary text-center">
          Investor Engagement Path →
        </Link>
        <Link href="/path-forward"
          className="btn-outline text-center">
          Path to First Close
        </Link>
        <Link href="/reserve"
          className="px-6 py-3 rounded-xl border border-white/10 text-white/50 text-sm hover:border-white/20 hover:text-white/70 transition-colors text-center">
          Reserve Status
        </Link>
      </div>
    </div>
  );
}
