/**
 * PDF 1 — Executive Summary
 * Dignity institutional gold-backed digital securities platform overview.
 */
import React from "react";
import { Document, View, Text } from "@react-pdf/renderer";
import {
  CoverPage, ContentPage, SectionTitle, SubTitle,
  BodyText, Bullet, StatBlock, Highlight, TableBlock, S, C,
} from "./design";

export function ExecutiveSummaryPDF() {
  return (
    <Document
      title="Dignity — Executive Summary 2026"
      author="Dignity Institutional"
      subject="Executive Summary"
      keywords="dignity, gold, institutional, token, reserve"
      creator="Dignity Platform"
    >
      {/* ── Cover ─────────────────────────────────────────────────────── */}
      <CoverPage
        eyebrow="Corporate Summary · Q2 2026"
        title={"Dignity\nExecutive Summary"}
        subtitle="Gold-backed institutional digital securities. Purpose-built infrastructure for serious capital markets participation."
        docNumber="DIG-ES-2026-001"
        date="April 2026"
        classification="Confidential — Qualified Institutional Investors Only"
      />

      {/* ── Page 1: Who We Are ─────────────────────────────────────────── */}
      <ContentPage title="Executive Summary" section="Overview">
        <SectionTitle>Who We Are</SectionTitle>
        <BodyText>
          Dignity is an institutional-grade platform for the issuance, management, and audit of
          gold-backed digital securities. We are not a cryptocurrency project. We are a regulated
          operating infrastructure designed to meet the stringent requirements of institutional
          capital markets — combining physical gold custody, programmable token mechanics, and a
          tamper-evident audit chain into a single verified system.
        </BodyText>
        <BodyText>
          The platform was developed from first principles to address the core failure modes of
          prior tokenized asset initiatives: opacity of reserve composition, absence of real-time
          proof, inadequate governance separation, and lack of institutional-grade compliance
          tooling. Dignity solves all four.
        </BodyText>

        <StatBlock stats={[
          { label: "Reserve Coverage Target", value: "≥ 100%" },
          { label: "Audit Chain Events", value: "Live" },
          { label: "Platform Version", value: "v1.0" },
          { label: "Jurisdiction", value: "USA" },
        ]} />

        <SectionTitle>The Opportunity</SectionTitle>
        <BodyText>
          Gold has served as the foundational store of value for five millennia. The $13 trillion
          physical gold market remains largely inaccessible to digital-native capital — fragmented
          across custodians, opaque in proof, and expensive to transfer. Digital gold products
          have failed institutional adoption because they prioritize convenience over verifiability.
        </BodyText>
        <Highlight>
          Dignity delivers what institutional investors actually require: provably-backed tokens
          with real-time reserve attestation, multi-party governance, and a complete regulatory
          compliance framework — not marketing claims.
        </Highlight>

        <SubTitle>Core Thesis</SubTitle>
        <Bullet>Gold-backed securities represent the lowest-risk entry point for institutional digital asset exposure.</Bullet>
        <Bullet>Real-time proof of reserve, enforced on-chain, eliminates the opacity that has disqualified prior products.</Bullet>
        <Bullet>Operational controls that mirror TradFi custody standard (four-eyes, dual-key, hash-chain audit) are table stakes for institutional mandates.</Bullet>
        <Bullet>AI agent integration — via MCP tool mesh — positions Dignity as the first institutional platform with machine-readable operational state.</Bullet>
      </ContentPage>

      {/* ── Page 2: Business Model & Team ──────────────────────────────── */}
      <ContentPage title="Executive Summary" section="Business & Leadership">
        <SectionTitle>Business Model</SectionTitle>
        <BodyText>
          Dignity generates revenue through issuance spreads on token creation, custody and
          administration fees on underlying gold lots, and institutional subscription access to the
          compliance and analytics API. A secondary revenue stream operates through the x402
          AI-to-AI payment rail (Phase IV), where external AI agents pay ATP micro-fees to query
          the Dignity operational state.
        </BodyText>

        <TableBlock
          headers={["Revenue Stream", "Type", "Timing"]}
          rows={[
            ["Issuance Spread", "Transaction Fee", "At mint"],
            ["Custody & Admin Fee", "Annual bps on AUM", "Quarterly"],
            ["Compliance API Access", "Subscription", "Monthly"],
            ["Analytics API Access", "Subscription", "Monthly"],
            ["x402 Agent Micro-fees", "Per-invocation ATP", "Phase IV"],
          ]}
        />

        <SectionTitle>Leadership</SectionTitle>
        <BodyText>
          The Dignity leadership team brings institutional finance, technology, and regulatory
          expertise from tier-one capital markets, custodial banking, and enterprise software.
          The platform is designed and operated to institutional standards — not startup standards.
        </BodyText>

        <SubTitle>Governance Philosophy</SubTitle>
        <BodyText>
          Every operational action on the Dignity platform — token issuance, reserve lot addition,
          venue activation, compliance flag — is recorded in a SHA-256 hash-chain audit log that
          cannot be retroactively altered. The four-eyes control principle is enforced at the API
          level: no single actor can propose and approve the same action.
        </BodyText>
        <Bullet>Board-level approval required for all token minting above defined thresholds.</Bullet>
        <Bullet>Reserve coverage must be verified and documented before any issuance event.</Bullet>
        <Bullet>All investor KYC/AML checks are logged to the immutable audit chain.</Bullet>
        <Bullet>External auditors receive read-only API access to the full audit record.</Bullet>

        <SectionTitle>Next Steps</SectionTitle>
        <BodyText>
          We are currently in active dialogue with qualified institutional investors for the Series A
          capital raise and seeking anchor custody partners for the initial reserve lot program.
          Interested parties should contact the institutional relations team via the secure inquiry
          form at dignity.unykorn.org/contact.
        </BodyText>
      </ContentPage>
    </Document>
  );
}
