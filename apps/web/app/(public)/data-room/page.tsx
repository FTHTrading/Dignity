import type { Metadata } from "next";
import Link from "next/link";
import { Lock, FolderLock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Room — Dignity Institutional",
  description: "NDA-gated document room for qualified institutional investors. Offering materials, reserve documentation, technical architecture, compliance framework.",
};

const DOCUMENT_CATEGORIES = [
  {
    name: "Offering Materials",
    icon: "📋",
    documents: [
      "Offering Memorandum (Private Placement)",
      "Subscription Agreement",
      "Investor Qualification Form",
      "Risk Factors Supplement",
    ],
    access: "NDA + qualified investor verification required",
  },
  {
    name: "Reserve Documentation",
    icon: "🪙",
    documents: [
      "OLV Reserve Asset Report (Caprock/Houlihan, June 2024)",
      "Assignment Agreement (15% net-profits allocation)",
      "Mining Property Summary",
      "Custodian Description — APMEX / Brink's",
    ],
    access: "NDA + qualified investor verification required",
  },
  {
    name: "Technical Architecture",
    icon: "⚙️",
    documents: [
      "Smart Contract Architecture Overview",
      "ZeppelinOS Proxy / Implementation Map",
      "Phase III Infrastructure Design",
      "ReserveProofAnchor.sol Specification",
    ],
    access: "NDA + institutional technical counterparty",
  },
  {
    name: "Compliance Documentation",
    icon: "⚖️",
    documents: [
      "Compliance Framework (Reg D / Reg S)",
      "AML/KYC Policy",
      "Jurisdiction Eligibility Matrix",
      "Transfer Restriction Policy",
    ],
    access: "NDA + institutional counterparty",
  },
  {
    name: "Corporate Records",
    icon: "🏛️",
    documents: [
      "Corporate Formation Documents",
      "Operating Agreement / Governance Structure",
      "Registered Agent Information",
      "Authorized Signatory List",
    ],
    access: "NDA + qualified investor verification required",
  },
];

const ACCESS_STEPS = [
  {
    step: 1,
    title: "Submit Qualification Request",
    detail: "Complete the contact form requesting Data Room access. Include your name, firm, and investor type.",
  },
  {
    step: 2,
    title: "Investor Eligibility Review",
    detail: "Dignity team confirms you meet qualified investor / institutional buyer requirements for the applicable jurisdiction.",
  },
  {
    step: 3,
    title: "Execute NDA",
    detail: "Sign the Non-Disclosure Agreement. Documents are confidential; NDA governs permitted use and distribution.",
  },
  {
    step: 4,
    title: "Secure Data Room Access",
    detail: "Receive access credentials for the secure document portal. Access is logged and audited.",
  },
];

export default function DataRoomPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <span
          className="text-xs font-semibold tracking-widest uppercase mb-3 block"
          style={{ color: "var(--gold)" }}
        >
          Data Room · NDA-Gated
        </span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Data Room
        </h1>
        <p className="text-lg max-w-3xl" style={{ color: "var(--text-muted)" }}>
          Confidential offering materials, reserve documentation, technical architecture, and compliance
          framework. Access requires a signed Non-Disclosure Agreement and verified institutional investor status.
        </p>
      </div>

      {/* Access gate */}
      <div
        className="rounded-xl p-10 mb-12 text-center"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(201,168,76,0.1)" }}
        >
          <FolderLock size={28} color="var(--gold)" />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Restricted Access
        </h2>
        <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "var(--text-muted)" }}>
          Data Room documents are confidential and restricted to qualified investors and institutional
          counterparties who have executed a Non-Disclosure Agreement. All access is logged.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/contact" className="btn-primary px-8 py-3 rounded-lg text-sm inline-block">
            Request Data Room Access
          </Link>
          <Link href="/documents" className="btn-outline px-8 py-3 rounded-lg text-sm inline-block">
            Document Overview
          </Link>
        </div>
      </div>

      {/* Access process */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Access Process
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {ACCESS_STEPS.map((s) => (
            <div
              key={s.step}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)" }}
              >
                {s.step}
              </div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--text)" }}>
                {s.title}
              </h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Document categories */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          Document Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {DOCUMENT_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                  {cat.name}
                </h3>
                <Lock size={13} color="var(--gold)" className="ml-auto" />
              </div>
              <ul className="space-y-1.5 mb-3">
                {cat.documents.map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <FileText size={11} color="var(--text-dim)" className="flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
              <div
                className="rounded px-3 py-2 text-xs mt-3"
                style={{ background: "rgba(201,168,76,0.06)", color: "var(--text-dim)" }}
              >
                Access: {cat.access}
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
        All materials in the Data Room are confidential and subject to the executed Non-Disclosure Agreement.
        Unauthorized distribution is prohibited. Data Room access is logged and auditable. For questions,
        contact the Dignity partnerships team via the{" "}
        <Link href="/contact" style={{ color: "var(--gold)" }}>
          contact page
        </Link>
        .
      </div>
    </main>
  );
}
