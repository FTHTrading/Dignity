/**
 * PDF 3 — Investor Prospectus & Token Economics
 * Investment thesis, token mechanics, distribution, and economic framework.
 */
import React from "react";
import { Document, View, Text } from "@react-pdf/renderer";
import {
  CoverPage, ContentPage, SectionTitle, SubTitle,
  BodyText, Bullet, StatBlock, Highlight, TableBlock, S, C,
} from "./design";

export function InvestorProspectusPDF() {
  return (
    <Document
      title="Dignity — Investor Prospectus & Token Economics"
      author="Dignity Institutional"
      subject="Investment Overview and Token Structure"
      keywords="investor, prospectus, token economics, gold, digital securities"
      creator="Dignity Platform"
    >
      <CoverPage
        eyebrow="Investor Relations · Q2 2026"
        title={"Investor Prospectus\n& Token Economics"}
        subtitle="Investment thesis, token issuance mechanics, economic structure, redemption rights, and market access framework for institutional participants."
        docNumber="DIG-IP-2026-001"
        date="April 2026"
        classification="Confidential — Qualified Institutional Investors Only"
      />

      {/* ── Page 1: Investment Thesis ──────────────────────────────────── */}
      <ContentPage title="Investor Prospectus" section="Investment Thesis">
        <SectionTitle>Investment Thesis</SectionTitle>
        <BodyText>
          Gold has been the definitive global store of value for 5,000 years. Its scarcity,
          durability, and universal recognition make it the foundational asset for institutional
          capital preservation mandates. Yet physical gold remains operationally complex: costly
          to custody, slow to transfer, difficult to fractionalize, and challenging to audit at
          scale.
        </BodyText>
        <BodyText>
          Dignity digitizes the gold claim — not the gold itself. Each token represents a
          proven, audited, legal claim on allocated physical metal. The Dignity platform provides
          the operational and compliance infrastructure that makes this claim institutionally
          credible, not just technically possible.
        </BodyText>

        <Highlight>
          The Dignity token is not a synthetic, a derivative, or a representation of a basket.
          It is a direct, allocated claim on physical gold held in qualified custody, provable
          in real time by any authorized investor at any time.
        </Highlight>

        <StatBlock stats={[
          { label: "Asset Backing",       value: "1:1 Au" },
          { label: "Proof Mechanism",     value: "Chain" },
          { label: "Redemption Right",    value: "Physical" },
          { label: "Governance",          value: "Board" },
        ]} />

        <SubTitle>Why Now</SubTitle>
        <Bullet>Institutional allocation to digital assets is accelerating — demand for reserve-quality products is structurally underserved.</Bullet>
        <Bullet>Regulatory clarity in major jurisdictions has materially improved the operating environment for gold-backed securities.</Bullet>
        <Bullet>Prior tokenized gold products failed due to opacity and governance weakness — Dignity addresses both with verifiable infrastructure.</Bullet>
        <Bullet>AI agent consumption of financial data creates a new class of institutional buyer that requires machine-readable reserve state.</Bullet>

        <SectionTitle>Token Structure</SectionTitle>
        <BodyText>
          Dignity tokens are minted through a formal board approval process. Minting requires
          verified reserve coverage at or above the minimum threshold. Tokens are non-transferable
          to non-KYC-verified addresses. Redemption for physical metal is available to accredited
          investors in qualifying jurisdictions above minimum lot sizes.
        </BodyText>

        <TableBlock
          headers={["Token Parameter", "Specification"]}
          rows={[
            ["Denomination",       "1 DIGN = 1 troy ounce equivalent"],
            ["Fractional Units",   "0.001 troy oz minimum"],
            ["Backing Requirement","100% allocated gold (≥ 1.000 coverage)"],
            ["Issuance Authority", "Board + Treasury (dual approval)"],
            ["Redemption Right",   "Physical | Cash at spot, investor election"],
            ["Transfer Restriction","KYC/AML-verified counterparties only"],
            ["Jurisdiction Limit", "Qualified investors, eligible jurisdictions"],
          ]}
        />
      </ContentPage>

      {/* ── Page 2: Economics & Market Access ──────────────────────────── */}
      <ContentPage title="Investor Prospectus" section="Economics & Market Access">
        <SectionTitle>Token Economics</SectionTitle>

        <SubTitle>Issuance Mechanics</SubTitle>
        <BodyText>
          New tokens may only be minted after a formal mint request is submitted by the Treasury
          Agent and approved by a Board Director — these must be different actors (separation of
          duties enforced at the API level). The system automatically verifies that post-mint
          coverage ratio would remain at or above 1.000 before processing.
        </BodyText>

        <SubTitle>Fee Structure</SubTitle>
        <TableBlock
          headers={["Fee Type", "Rate", "Payable By"]}
          rows={[
            ["Issuance Spread",    "0.50% of notional",    "Issuer"],
            ["Annual Custody Fee", "0.20% p.a. on AUM",   "Token holders, pro-rata"],
            ["Redemption Fee",     "0.25% (physical only)","Redeeming investor"],
            ["Transfer Fee",       "0.05% per trade",      "Seller"],
            ["Early Redemption",   "0.50% (< 90 days)",   "Redeeming investor"],
          ]}
        />

        <SectionTitle>Market Access & Liquidity</SectionTitle>
        <BodyText>
          Dignity tokens are listed on qualified alternative trading venues. The spreads and
          market-making policy are governed by the Platform Spread Policy, which establishes
          maximum allowable bid-ask spread, minimum market depth, and circuit-breaker parameters.
          Venue activation requires board approval.
        </BodyText>

        <SubTitle>Investor Eligibility</SubTitle>
        <Bullet>Accredited investors and Qualified Institutional Buyers (QIBs) under Rule 144A.</Bullet>
        <Bullet>Eligible foreign institutional investors in reciprocal jurisdictions.</Bullet>
        <Bullet>All investors must complete KYC/AML verification before any purchase or transfer.</Bullet>
        <Bullet>Compliance status is checked at every transaction by the Compliance Agent.</Bullet>

        <SectionTitle>Redemption Rights</SectionTitle>
        <BodyText>
          Holders have the right to redeem tokens for either (a) physical allocated gold delivered
          to an approved custodian account, or (b) cash equivalent at the LBMA AM fix price on
          the redemption date. Redemption requests above defined thresholds require board approval
          and a minimum notice period to allow orderly physical delivery.
        </BodyText>
        <Highlight>
          All redemption requests are logged in the immutable audit chain. The platform cannot
          process a redemption that would bring coverage below 1.000 without a simultaneous
          reserve lot addition. This protects remaining token holders at all times.
        </Highlight>
      </ContentPage>
    </Document>
  );
}
