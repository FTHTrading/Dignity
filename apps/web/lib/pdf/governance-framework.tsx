/**
 * PDF 4 — Governance & Compliance Framework
 * Operational controls, regulatory posture, KYC/AML, and audit architecture.
 */
import React from "react";
import { Document, View, Text } from "@react-pdf/renderer";
import {
  CoverPage, ContentPage, SectionTitle, SubTitle,
  BodyText, Bullet, StatBlock, Highlight, TableBlock, S, C,
} from "./design";

export function GovernanceFrameworkPDF() {
  return (
    <Document
      title="Dignity — Governance & Compliance Framework"
      author="Dignity Institutional"
      subject="Internal Controls, Regulatory Compliance, and Audit Architecture"
      keywords="governance, compliance, KYC, AML, audit, controls, four-eyes"
      creator="Dignity Platform"
    >
      <CoverPage
        eyebrow="Governance Framework · Q2 2026"
        title={"Governance &\nCompliance Framework"}
        subtitle="Operational controls architecture, regulatory compliance posture, KYC/AML framework, four-eyes principle enforcement, and immutable audit chain design."
        docNumber="DIG-GCF-2026-001"
        date="April 2026"
        classification="Confidential — Qualified Institutional Investors Only"
      />

      {/* ── Page 1: Controls Architecture ─────────────────────────────── */}
      <ContentPage title="Governance Framework" section="Controls Architecture">
        <SectionTitle>Controls Architecture</SectionTitle>
        <BodyText>
          The Dignity governance architecture is built on three interlocking principles:
          immutability, separation of duties, and proportionality. Every control, at every layer,
          is designed to survive adversarial conditions — not just normal operations.
        </BodyText>

        <StatBlock stats={[
          { label: "Core Principle",       value: "4-Eyes" },
          { label: "Audit Chain",          value: "SHA-256" },
          { label: "Approval Loops",       value: "0" },
          { label: "Override Mechanisms",  value: "None" },
        ]} />

        <SubTitle>Four-Eyes Principle</SubTitle>
        <BodyText>
          No single actor on the Dignity platform can both propose and approve a material
          operational action. This separation of duties is enforced at the API level — the system
          checks at every approval invocation that the approver's identity does not match the
          requestor's identity. There is no administrative override or emergency bypass.
        </BodyText>
        <Highlight>
          Separation of duties is a system invariant, not a policy. It cannot be disabled by any
          user, including board directors or system administrators. Modifications require a
          platform upgrade with full audit trail.
        </Highlight>

        <SubTitle>Approval Workflow</SubTitle>
        <BodyText>
          Material actions — token minting, token redemption, venue activation, reserve lot
          changes, and reserve report publication — require an explicit board-level approval.
          Approval requests expire after 72 hours if not decided. Rejection requires a documented
          reason. All decisions are permanently logged.
        </BodyText>

        <TableBlock
          headers={["Action Category", "Proposer Role", "Approver Role", "Expiry"]}
          rows={[
            ["Token Mint",           "Treasury Officer",   "Board Director",    "72 hrs"],
            ["Token Redemption",     "Treasury Officer",   "Board Director",    "72 hrs"],
            ["Venue Toggle",         "Market Ops",         "Board Director",    "48 hrs"],
            ["Reserve Report",       "Treasury Officer",   "Board Director",    "120 hrs"],
            ["Reserve Lot Addition", "Treasury Officer",   "Board Director",    "72 hrs"],
            ["Investor Override",    "Compliance Officer", "Board Director",    "24 hrs"],
          ]}
        />

        <SubTitle>Audit Chain Design</SubTitle>
        <BodyText>
          The Dignity audit chain is an append-only sequence of AuditEvents stored in a dedicated
          relation. Each event carries: category, action, actor identity, actor role, entity type,
          entity ID, before/after state, human-readable description, and a SHA-256 hash computed
          over the event content plus the hash of the immediately prior event. This creates a
          cryptographic chain that makes retroactive alteration detectable by any verifier.
        </BodyText>
        <Bullet>Events cannot be updated or deleted — only appended.</Bullet>
        <Bullet>Chain integrity can be independently verified by any party with read access.</Bullet>
        <Bullet>All write tool invocations by AI agents are logged with agent identity.</Bullet>
        <Bullet>Out-of-sequence or hash-break attempts are flagged automatically.</Bullet>
      </ContentPage>

      {/* ── Page 2: Compliance & Regulatory ────────────────────────────── */}
      <ContentPage title="Governance Framework" section="Compliance & Regulatory">
        <SectionTitle>KYC / AML Framework</SectionTitle>
        <BodyText>
          All investors in Dignity tokens must complete a full KYC/AML verification before
          acquiring any position. Verification is performed by the Compliance Agent using
          documented procedures aligned with FinCEN CDD Rule requirements and FATF
          Recommendation 10. Every check is logged to the audit chain with a timestamped
          event that includes the investor ID and KYC status outcome.
        </BodyText>

        <TableBlock
          headers={["KYC Status", "Description", "Permitted Actions"]}
          rows={[
            ["PENDING",   "Verification in progress",     "None"],
            ["APPROVED",  "Fully verified and compliant", "Buy, sell, redeem"],
            ["FLAGGED",   "Under additional review",      "Holds only, no new buys"],
            ["REJECTED",  "Failed verification",          "Exit only — forced redemption"],
          ]}
        />

        <SubTitle>Accreditation Requirements</SubTitle>
        <Bullet>Individual investors: accredited status per Regulation D.</Bullet>
        <Bullet>Institutional investors: QIB status per Rule 144A or equivalent foreign standard.</Bullet>
        <Bullet>Accreditation is verified annually and on material change of investor status.</Bullet>
        <Bullet>Non-accredited holdings are blocked at the transfer restriction layer.</Bullet>

        <SectionTitle>Regulatory Posture</SectionTitle>
        <BodyText>
          Dignity operates as a registered digital asset issuer. The platform is designed to
          facilitate regulatory reporting, including suspicious activity reporting (SAR), large
          transaction reporting, and investor status attestation. The compliance infrastructure
          exports structured reports in standard regulatory formats.
        </BodyText>
        <BodyText>
          The platform architecture anticipates regulatory engagement and is designed to be
          transparent by default to authorized regulators — read-only audit access can be
          provisioned to regulatory observers without granting any write or operational access.
        </BodyText>

        <SubTitle>Data Governance</SubTitle>
        <Bullet>All investor PII is stored in encrypted, access-controlled data stores.</Bullet>
        <Bullet>Data minimization principles applied — only data required for regulatory compliance is retained.</Bullet>
        <Bullet>Retention schedules are defined per category in the Data Governance Policy, minimum 7 years for KYC records.</Bullet>
        <Bullet>Right to erasure is handled in compliance with applicable law — audit records are exempt from erasure.</Bullet>

        <SectionTitle>Board Oversight</SectionTitle>
        <BodyText>
          The Board of Directors reviews all material platform events at least quarterly, including:
          reserve coverage position, token issuance volume, compliance flags, audit chain events,
          and active approval request queue. Board minutes are stored in the platform and
          cryptographically linked to the relevant operational events they reference.
        </BodyText>
      </ContentPage>
    </Document>
  );
}
