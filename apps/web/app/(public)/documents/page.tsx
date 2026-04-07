/**
 * /documents — Institutional document download page.
 * Five high-quality PDFs available to qualified institutional investors.
 */
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutional Documents | Dignity",
  description:
    "Access Dignity's institutional document library — executive summary, proof of reserve, investor prospectus, governance framework, and technology brief.",
};

interface DocCard {
  slug:           string;
  number:         string;
  title:          string;
  classification: string;
  pages:          number;
  description:    string;
}

const DOCS: DocCard[] = [
  {
    slug:           "executive-summary",
    number:         "DIG-ES-2026-001",
    title:          "Executive Summary",
    classification: "Confidential",
    pages:          3,
    description:
      "High-level overview of the Dignity platform, business model, revenue streams, and institutional value proposition for qualified investors.",
  },
  {
    slug:           "proof-of-reserve",
    number:         "DIG-POR-2026-001",
    title:          "Proof of Reserve Methodology",
    classification: "Confidential",
    pages:          3,
    description:
      "Full disclosure of reserve methodology, coverage ratio calculation, custodian qualification standards, and real-time attestation infrastructure.",
  },
  {
    slug:           "investor-prospectus",
    number:         "DIG-IP-2026-001",
    title:          "Investor Prospectus & Token Economics",
    classification: "Confidential",
    pages:          3,
    description:
      "Token structure, economics, fee schedule, eligibility requirements, redemption rights, and governance protections for DIGN token holders.",
  },
  {
    slug:           "governance-framework",
    number:         "DIG-GCF-2026-001",
    title:          "Governance & Compliance Framework",
    classification: "Confidential",
    pages:          3,
    description:
      "Four-eyes principle, approval workflow architecture, KYC/AML controls, immutable audit chain design, and regulatory posture documentation.",
  },
  {
    slug:           "technology-brief",
    number:         "DIG-TB-2026-001",
    title:          "Technology & Infrastructure Brief",
    classification: "Confidential",
    pages:          3,
    description:
      "Platform architecture, security model, AI agent mesh design, MCP tool catalog, and x402 AI-to-AI payment rail roadmap for institutional consumers.",
  },
];

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0f] py-24 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] mb-4">
          Institutional Documents
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
          Document Library
        </h1>
        <p className="text-[#8a8a9a] text-lg max-w-2xl leading-relaxed">
          Access Dignity&apos;s institutional disclosure library. All documents are
          prepared to institutional-grade standards for qualified investors and
          authorized counterparties.
        </p>
        <div className="mt-6 pt-6 border-t border-[#2a2a3a]">
          <p className="text-[#5a5a6a] text-sm">
            <span className="text-[#c9a84c]">Notice:</span> These materials are
            confidential and intended exclusively for qualified institutional
            investors. Distributed under NDA. Not for public dissemination.
          </p>
        </div>
      </div>

      {/* Document grid */}
      <div className="max-w-4xl mx-auto grid gap-4">
        {DOCS.map((doc) => (
          <div
            key={doc.slug}
            className="bg-[#141418] border border-[#2a2a3a] rounded-lg p-6
                       flex flex-col md:flex-row md:items-center gap-6
                       hover:border-[#c9a84c]/30 transition-colors duration-200"
          >
            {/* Doc metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase
                                 text-[#5a5a6a] font-mono">
                  {doc.number}
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase
                                 px-2 py-0.5 border border-[#c9a84c]/30
                                 text-[#c9a84c] rounded">
                  {doc.classification}
                </span>
                <span className="text-[10px] text-[#5a5a6a]">
                  {doc.pages} pages
                </span>
              </div>
              <h2 className="text-white text-lg font-medium mb-2">
                {doc.title}
              </h2>
              <p className="text-[#8a8a9a] text-sm leading-relaxed">
                {doc.description}
              </p>
            </div>

            {/* Download button */}
            <div className="flex-shrink-0">
              <Link
                href={`/api/documents/${doc.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5
                           bg-transparent border border-[#c9a84c]/50
                           text-[#c9a84c] text-sm font-medium rounded
                           hover:bg-[#c9a84c]/10 transition-colors duration-150
                           whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                Download PDF
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-[#2a2a3a]">
        <p className="text-[#5a5a6a] text-xs leading-relaxed mb-6">
          The documents provided herein are for informational purposes only and do not constitute
          an offer to sell or a solicitation to buy any securities or digital assets. Past
          performance is not indicative of future results. All figures are as of the document date
          and subject to change without notice. These materials are confidential and protected
          under applicable intellectual property and securities laws.
        </p>
        <Link
          href="/contact"
          className="text-[#c9a84c] text-sm hover:underline"
        >
          Contact institutional relations →
        </Link>
      </div>
    </main>
  );
}
