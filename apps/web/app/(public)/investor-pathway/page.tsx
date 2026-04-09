import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Investor Pathway | Dignity" };

const STEPS = [
  {
    step: "01",
    title: "Initial Inquiry",
    status: "Open",
    who: "Prospective institutional counterparty",
    how: "Submit inquiry via the contact form or direct board introduction",
    what: [
      "Statement of institutional capacity and preliminary interest",
      "Entity type: family office, fund, RIA, endowment, or accredited individual",
      "No financial commitment at this stage",
    ],
    output: "Preliminary qualification acknowledgment within 48 hours",
    cta: { label: "Submit Inquiry →", href: "/contact" },
  },
  {
    step: "02",
    title: "Mutual NDA Execution",
    status: "Near-term",
    who: "Legal counsel on both sides",
    how: "Dignity issues standard bilateral NDA; countersigned by counterparty",
    what: [
      "Bilateral non-disclosure covering all shared platform documentation",
      "Executed via DocuSign or equivalent electronic signature",
      "NDA required before data room access is granted",
    ],
    output: "Countersigned NDA on file; data room credentials issued",
    cta: null,
  },
  {
    step: "03",
    title: "Data Room Access",
    status: "Near-term",
    who: "Qualified institutional investors",
    how: "Credentialed access to the Dignity secure data room",
    what: [
      "Executive Summary (DIG-ES-2026-001)",
      "Proof of Reserve Report (DIG-POR-2026-001)",
      "Investor Prospectus & Token Economics (DIG-IP-2026-001)",
      "Governance & Compliance Framework (DIG-GCF-2026-001)",
      "Technology & Infrastructure Brief (DIG-TB-2026-001)",
      "Live platform access for technical due diligence",
    ],
    output: "Full document package + platform walkthrough opportunity",
    cta: { label: "Data Room Overview →", href: "/data-room" },
  },
  {
    step: "04",
    title: "Investor Qualification",
    status: "Phase III",
    who: "Compliance Officer + Counterparty",
    how: "KYC/AML workflow through the platform compliance engine",
    what: [
      "Accredited Investor verification under Regulation D (individuals)",
      "Qualified Institutional Buyer status under Rule 144A (institutions)",
      "Entity documentation: organizational docs, beneficial ownership",
      "Sanctions screening against OFAC and applicable lists",
      "Annual re-verification requirement confirmed",
    ],
    output: "KYC_STATUS = APPROVED in compliance engine; investment authorized",
    cta: null,
  },
  {
    step: "05",
    title: "Subscription Agreement",
    status: "Phase III",
    who: "Investor + Board legal counsel",
    how: "Execute offering documents under Regulation D Rule 506(c)",
    what: [
      "Subscription agreement specifying DIGAU allocation and pricing",
      "Investor representations and warranties — Reg D qualified purchaser",
      "Transfer restriction acknowledgment — KYC/AML-only counterparties",
      "Lock-up and redemption right terms",
    ],
    output: "Executed subscription agreement; capital call issued",
    cta: null,
  },
  {
    step: "06",
    title: "Capital Wire & Settlement",
    status: "Phase III",
    who: "Treasury Officer",
    how: "Fiat → USDC/USDT → reserve-covered DIGAU issuance",
    what: [
      "Wire transfer to designated treasury account",
      "Conversion to USDC or USDT via stablecoin rail",
      "Treasury Officer submits mint request through approval workflow",
      "Coverage ratio verified post-mint — blocked if below 1.000",
      "Board Director approves under four-eyes governance invariant",
    ],
    output: "DIGAU allocated to investor wallet; audit event logged",
    cta: null,
  },
  {
    step: "07",
    title: "Ongoing Investor Access",
    status: "Phase III",
    who: "Investor via authenticated portal",
    how: "Investor portal — authenticated session, role-scoped data",
    what: [
      "Portfolio dashboard — live position, coverage ratio, accrued fees",
      "Reserve reports published through board-gated approval workflow",
      "Audit chain access — verify every action taken on platform",
      "Redemption requests — physical gold or cash at LBMA AM fix",
      "Quarterly custody letters direct from qualified custodian",
    ],
    output: "Permanent authenticated access; quarterly reporting cycle",
    cta: { label: "Investor Portal →", href: "/sign-in" },
  },
];

const STATUS_STYLE: Record<string, string> = {
  "Open":      "text-emerald-400/80 bg-emerald-400/10 border-emerald-400/20",
  "Near-term": "text-amber-400/80 bg-amber-400/10 border-amber-400/20",
  "Phase III": "text-gold/70 bg-gold/10 border-gold/20",
};

const INVESTOR_TYPES = [
  {
    type: "Accredited Individual",
    standard: "Regulation D Rule 506(c)",
    threshold: "$1M net worth or $200K income",
    notes: "Annual re-verification required",
  },
  {
    type: "Family Office",
    standard: "Regulation D Rule 506(c)",
    threshold: "$5M AUM minimum",
    notes: "Entity documentation required",
  },
  {
    type: "Registered Investment Advisor",
    standard: "Regulation D + IA Act",
    threshold: "Registered with SEC or state",
    notes: "Client suitability documentation",
  },
  {
    type: "Qualified Institutional Buyer",
    standard: "Rule 144A",
    threshold: "$100M in securities owned",
    notes: "Broadest institutional access tier",
  },
  {
    type: "Endowment / Foundation",
    standard: "Regulation D Rule 506(c)",
    threshold: "Investment policy permits alternatives",
    notes: "Board authorization documentation required",
  },
];

export default function InvestorPathwayPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-gold/70 uppercase tracking-[0.25em] font-medium mb-4">Investor Pathway</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]">
          How Qualified<br />
          <span className="text-white/45 italic">Investors Engage.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          Dignity is structured for qualified institutional counterparties. The engagement
          process is transparent, compliance-first, and designed to respect both the investor's
          diligence requirements and the platform's regulatory obligations.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Eligible Investor Types */}
      <div className="mb-16">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-8">
          Eligible Investor Categories
        </h2>
        <div className="space-y-2">
          {INVESTOR_TYPES.map((t) => (
            <div key={t.type}
              className="flex flex-wrap items-center gap-4 px-5 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.015]">
              <div className="flex-1 min-w-[200px]">
                <p className="text-sm font-semibold text-white/80 mb-0.5">{t.type}</p>
                <p className="text-xs text-white/30">{t.notes}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="text-white/40">{t.standard}</span>
                <span className="text-white/20">·</span>
                <span className="text-white/55">{t.threshold}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/25 leading-relaxed">
          Dignity is not publicly offered. Participation is limited to verified qualified investors under an active Form D filing.
          Nothing on this site constitutes a solicitation or offer to sell securities.
        </p>
      </div>

      <div className="gold-rule mb-14" />

      {/* Engagement Steps */}
      <div className="mb-14">
        <h2 className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium mb-10">
          Seven-Step Engagement Process
        </h2>

        <div className="space-y-4">
          {STEPS.map((s, idx) => (
            <div key={s.step} className="relative">
              {idx < STEPS.length - 1 && (
                <div className="absolute left-[1.85rem] top-[5.5rem] w-px h-6 bg-white/[0.07]" />
              )}
              <div className="glass-card">
                <div className="flex items-start gap-5">
                  {/* Step number */}
                  <div className="flex-shrink-0 h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center">
                    <span className="text-[11px] text-gold/60 font-mono">{s.step}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-base font-semibold text-white/90">{s.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLE[s.status]}`}>
                        {s.status}
                      </span>
                    </div>

                    <p className="text-xs text-white/30 mb-4">
                      <span className="text-white/20">Party:</span> {s.who} ·{" "}
                      <span className="text-white/20">Method:</span> {s.how}
                    </p>

                    <div className="mb-4 space-y-1.5">
                      {s.what.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-gold/40 mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-white/50 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="rounded-lg bg-white/[0.025] border border-white/[0.05] px-4 py-2">
                        <p className="text-[11px] text-white/40 leading-relaxed">
                          <span className="text-white/20 uppercase tracking-widest text-[9px] font-medium mr-2">Output</span>
                          {s.output}
                        </p>
                      </div>
                      {s.cta && (
                        <Link href={s.cta.href}
                          className="text-xs text-gold/70 hover:text-gold transition-colors font-medium flex-shrink-0">
                          {s.cta.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule mb-14" />

      {/* Timeline summary */}
      <div className="glass-card mb-12">
        <h2 className="font-serif text-xl font-light text-white mb-6">Indicative Timeline to Allocation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { phase: "Weeks 1–2",  label: "Inquiry → NDA",             detail: "Initial contact, qualification, NDA execution" },
            { phase: "Weeks 2–4",  label: "Due Diligence",              detail: "Data room review, platform walkthrough, Q&A" },
            { phase: "Weeks 4–6",  label: "KYC + Docs",                 detail: "Compliance qualification, subscription execution" },
            { phase: "Week 6–8",   label: "Capital → Allocation",       detail: "Wire settlement, board approval, DIGAU issuance" },
          ].map((item) => (
            <div key={item.phase} className="text-center">
              <p className="text-[10px] text-gold/50 uppercase tracking-widest mb-2">{item.phase}</p>
              <p className="text-sm font-semibold text-white/80 mb-1">{item.label}</p>
              <p className="text-xs text-white/30 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/20 border-t border-white/[0.05] pt-4 leading-relaxed">
          Timeline is indicative. Actual time to allocation depends on investor diligence pace, legal review,
          and KYC/AML completion. Board approval adds no more than 72 hours under standard approval SLA.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/contact"
          className="btn-primary text-center">
          Begin Inquiry →
        </Link>
        <Link href="/data-room"
          className="btn-outline text-center">
          Data Room Access
        </Link>
        <Link href="/economics"
          className="px-6 py-3 rounded-xl border border-white/10 text-white/50 text-sm hover:border-white/20 hover:text-white/70 transition-colors text-center">
          Revenue Model
        </Link>
      </div>
    </div>
  );
}
