/**
 * PDF 2 — Proof of Reserve Report
 * Methodology, coverage verification, and reserve attestation framework.
 */
import React from "react";
import { Document, View, Text } from "@react-pdf/renderer";
import {
  CoverPage, ContentPage, SectionTitle, SubTitle,
  BodyText, Bullet, StatBlock, Highlight, TableBlock, S, C,
} from "./design";

export function ProofOfReservePDF() {
  return (
    <Document
      title="Dignity — Proof of Reserve Report"
      author="Dignity Institutional"
      subject="Reserve Attestation & Coverage Methodology"
      keywords="proof of reserve, gold, coverage ratio, attestation, custody"
      creator="Dignity Platform"
    >
      <CoverPage
        eyebrow="Reserve Attestation Report · Q2 2026"
        title={"Proof of Reserve\nMethodology & Report"}
        subtitle="Independent reserve verification framework, coverage ratio methodology, custodian attestation standards, and real-time proof infrastructure."
        docNumber="DIG-POR-2026-001"
        date="April 2026"
        classification="Confidential — Qualified Institutional Investors Only"
      />

      {/* ── Page 1: Methodology ─────────────────────────────────────────── */}
      <ContentPage title="Proof of Reserve" section="Methodology">
        <SectionTitle>Reserve Verification Methodology</SectionTitle>
        <BodyText>
          The Dignity reserve verification framework is modeled on ISAE 3000 agreed-upon procedures
          and adapted for real-time digital asset operations. The methodology provides continuous,
          cryptographically-attested proof that tokenized gold is backed by physical metal held in
          audited, insured, professional custody facilities.
        </BodyText>
        <BodyText>
          Coverage ratio is defined as: Total Reserve Market Value (USD, at spot) divided by Total
          Outstanding Token Value (USD equivalent at par). The platform maintains a minimum coverage
          ratio of 1.000 at all times. Issuance of new tokens is blocked at the system level if
          coverage would fall below this threshold.
        </BodyText>

        <Highlight>
          Coverage Ratio = Σ(Reserve Lot Valuation) ÷ Σ(Outstanding Token Supply × Par Value). 
          Minimum threshold: 1.000. Any breach triggers an automatic issuance halt and board notification.
        </Highlight>

        <StatBlock stats={[
          { label: "Minimum Coverage Ratio", value: "1.000" },
          { label: "Target Coverage Buffer", value: "+5%" },
          { label: "Revaluation Frequency", value: "Daily" },
          { label: "Custodian Attestation", value: "Monthly" },
        ]} />

        <SubTitle>Reserve Lot Structure</SubTitle>
        <BodyText>
          Each physical gold holding is registered in the Dignity platform as a Reserve Lot — a
          discrete, uniquely identified record containing asset class, custodian identity, allocated
          lot number, LBMA bar list reference, valuation (USD at spot), and current status. Reserve
          Lots may be ACTIVE, PENDING (awaiting full attestation), or RETIRED.
        </BodyText>

        <TableBlock
          headers={["Field", "Type", "Validation"]}
          rows={[
            ["Lot ID",      "UUID",          "System-assigned"],
            ["Asset Class", "GOLD | SILVER",  "Enumerated"],
            ["Custodian",  "Verified name",  "Board-approved list"],
            ["Allocated #", "Bar number",    "LBMA format"],
            ["Valuation",  "USD at spot",    "Daily feed"],
            ["Status",     "ACTIVE/PENDING", "State machine"],
          ]}
        />

        <SubTitle>Attestation Chain</SubTitle>
        <Bullet>Monthly custodian attestation letters are uploaded and linked to each lot record.</Bullet>
        <Bullet>All lot additions are logged with SHA-256 hash-chain linking to prior events.</Bullet>
        <Bullet>Reserve Reports submitted for audit are version-stamped and immutable once approved.</Bullet>
        <Bullet>Coverage ratio recalculated on every reserve lot change and token supply update.</Bullet>
      </ContentPage>

      {/* ── Page 2: Infrastructure & Controls ──────────────────────────── */}
      <ContentPage title="Proof of Reserve" section="Infrastructure">
        <SectionTitle>Proof Infrastructure</SectionTitle>
        <BodyText>
          The Dignity proof system operates on a PostgreSQL database with cryptographic audit
          extension. Every write operation — including reserve lot changes, token supply updates,
          and report publications — is recorded as an immutable AuditEvent with a SHA-256 hash
          that chains to the prior event. This creates an append-only, tamper-evident ledger of
          the complete operational history of the platform.
        </BodyText>
        <BodyText>
          The audit chain is replicated to the public-facing Proof Center at
          dignity.unykorn.org/proof, allowing investors and regulators to verify specific events
          by their hash without accessing the full administrative system.
        </BodyText>

        <SubTitle>Reserve Report Publication</SubTitle>
        <BodyText>
          Reserve Reports are generated automatically from live lot data and submitted through a
          formal approval workflow before publication. A report in DRAFT status cannot be viewed
          externally. Submission for approval creates an AuditEvent, and board approval (by a
          different actor than the submitter) triggers publication and a final APPROVED AuditEvent.
        </BodyText>

        <TableBlock
          headers={["Report Status", "Description", "Externally Visible"]}
          rows={[
            ["DRAFT",            "In preparation by treasury team",    "No"],
            ["PENDING_APPROVAL", "Submitted for board review",         "No"],
            ["APPROVED",         "Published — full external access",   "Yes"],
            ["SUPERSEDED",       "Replaced by newer report",           "Historical only"],
          ]}
        />

        <SubTitle>Custodian Qualification</SubTitle>
        <BodyText>
          Only custodians on the board-approved qualified custodian list may hold Dignity reserve
          assets. Requirements include: LBMA member status or equivalent regulatory standing,
          minimum $500M AUM under custody, SOC 2 Type II certification, and provision of monthly
          allocated metal account statements in standard format.
        </BodyText>
        <Bullet>Custodian list is maintained in the board minutes and reviewed annually.</Bullet>
        <Bullet>Any new custodian addition requires a Venue Toggle approval by two board directors.</Bullet>
        <Bullet>Insurance requirements: 100% of held metal value, all-risk policy.</Bullet>
        <Bullet>Physical inspection rights reserved, annually at minimum.</Bullet>

        <SectionTitle>Coverage as of Q2 2026</SectionTitle>
        <BodyText>
          As of the date of this report, Dignity maintains full reserve coverage for all outstanding
          tokens. Detailed lot-level data, valuation methodology, and custodian attestation letters
          are available to qualified investors through the institutional access portal.
        </BodyText>
        <Highlight>
          Real-time coverage ratio is published at dignity.unykorn.org/proof. Each coverage figure
          is sourced from the live database and is hash-chain attested. Historical snapshots are
          permanently archived and accessible to authorized auditors.
        </Highlight>
      </ContentPage>
    </Document>
  );
}
