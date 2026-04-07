/**
 * PDF 5 — Technology & Infrastructure Brief
 * Platform architecture, AI agent mesh, security, and x402 integration roadmap.
 */
import React from "react";
import { Document, View, Text } from "@react-pdf/renderer";
import {
  CoverPage, ContentPage, SectionTitle, SubTitle,
  BodyText, Bullet, StatBlock, Highlight, TableBlock, S, C,
} from "./design";

export function TechnologyBriefPDF() {
  return (
    <Document
      title="Dignity — Technology & Infrastructure Brief"
      author="Dignity Institutional"
      subject="Platform Architecture, Security, and AI Agent Infrastructure"
      keywords="technology, infrastructure, MCP, AI agents, x402, security, architecture"
      creator="Dignity Platform"
    >
      <CoverPage
        eyebrow="Technology Brief · Q2 2026"
        title={"Technology &\nInfrastructure Brief"}
        subtitle="Platform architecture, security posture, AI agent mesh design, MCP tool registry, and the x402 AI-to-AI payment rail roadmap for institutional data consumers."
        docNumber="DIG-TB-2026-001"
        date="April 2026"
        classification="Confidential — Qualified Institutional Investors Only"
      />

      {/* ── Page 1: Platform Architecture ─────────────────────────────── */}
      <ContentPage title="Technology Brief" section="Platform Architecture">
        <SectionTitle>Platform Architecture</SectionTitle>
        <BodyText>
          The Dignity platform is built on a three-tier architecture: a Next.js 15 institutional
          web application, a PostgreSQL operational database with cryptographic audit extension,
          and a Fastify-based AI agent backend service. The web application and agent backend
          share a single database, ensuring real-time consistency between the institutional
          interface and programmatic API consumers.
        </BodyText>

        <StatBlock stats={[
          { label: "Web Framework",    value: "Next 15" },
          { label: "Agent Service",    value: "Fastify 5" },
          { label: "Database",         value: "Postgres" },
          { label: "Edge CDN",         value: "Cloudflare" },
        ]} />

        <TableBlock
          headers={["Service", "Role", "Port"]}
          rows={[
            ["Web App (Next.js)",    "Institutional UI + admin panel",          "3300"],
            ["Agent Backend",       "MCP tool service + A2A routing",          "5100"],
            ["PostgreSQL",          "Operational DB + audit chain",            "5433"],
            ["API Proxy",           "/api/agent/* → agent backend",            "internal"],
            ["Cloudflare Pages",    "Edge CDN + DDoS protection (production)", "443"],
          ]}
        />

        <SectionTitle>Security Architecture</SectionTitle>
        <SubTitle>Defense in Depth</SubTitle>
        <Bullet>HTTPS enforced at all layers — Cloudflare TLS termination with HSTS.</Bullet>
        <Bullet>Content Security Policy and security headers served on every response.</Bullet>
        <Bullet>All admin routes protected by NextAuth session authentication.</Bullet>
        <Bullet>Database access restricted to application layer — no direct external exposure.</Bullet>
        <Bullet>API proxy prevents direct browser access to the agent backend service.</Bullet>

        <SubTitle>Input Validation</SubTitle>
        <BodyText>
          All API inputs — both web application and agent backend — are validated with Zod
          TypeScript-first schema validation before reaching any database operation. There are no
          raw SQL queries; all database operations use Prisma ORM with parameterized queries,
          eliminating SQL injection attack surfaces.
        </BodyText>

        <SubTitle>Audit Trail as Security Primitive</SubTitle>
        <BodyText>
          The SHA-256 hash-chain audit log serves dual purpose: operational governance record
          AND security audit trail. Any unauthorized access that modifies data would produce a
          detectable hash break. Security events — failed authentication, access denials, unusual
          query patterns — are logged as their own audit category, permanently and immutably.
        </BodyText>
      </ContentPage>

      {/* ── Page 2: AI Agent Mesh & x402 ──────────────────────────────── */}
      <ContentPage title="Technology Brief" section="AI Agent Mesh">
        <SectionTitle>AI Agent Mesh</SectionTitle>
        <BodyText>
          Dignity is the first institutional digital asset platform to expose its operational
          state as a structured Model Context Protocol (MCP) tool catalog. The agent backend
          service provides 21 typed tools across 7 operational domains, enabling authorized AI
          agents to query reserve state, verify audit integrity, initiate compliance checks, and
          trigger approval workflows — all with full auditability.
        </BodyText>
        <BodyText>
          This is not a future capability — the MCP tool mesh is live and operational. The same
          data powering the institutional web interface is available in machine-readable form to
          credentialed AI agents through the agent backend service.
        </BodyText>

        <TableBlock
          headers={["Domain", "Tools", "Access"]}
          rows={[
            ["Audit",      "query_events, verify_chain, get_event",      "Read-only"],
            ["Reserve",    "get_coverage, list_lots, get_report",         "Mixed"],
            ["Token",      "get_status, request_mint, request_redeem",   "Write (approval req'd)"],
            ["Approval",   "list_pending, approve, reject",              "Write (sep. of duties)"],
            ["Compliance", "check_investor, list_flags",                 "Mixed"],
            ["Market",     "list_venues, toggle_venue, get_spread",      "Mixed"],
            ["Analytics",  "coverage_timeline, issuance_summary",       "Read-only"],
          ]}
        />

        <SubTitle>Platform Agent Registry</SubTitle>
        <BodyText>
          Six canonical AI agent personas operate within the Dignity platform, each with a defined
          role, capability scope, and separation of duties position. The Treasury Agent initiates
          mint requests; the Approval Orchestrator approves them — they are definitionally
          distinct. This mirrors the four-eyes principle of the human governance layer.
        </BodyText>

        <SectionTitle>x402 AI-to-AI Payment Rail (Phase IV)</SectionTitle>
        <BodyText>
          The x402 payment protocol enables AI agents to pay other AI agents for service access
          using ATP (Apostle Token Protocol) on the Apostle Chain (chain_id 7332). Dignity is
          architected to integrate x402 in Phase IV — the infrastructure stubs are in place and
          documented, with all current tool costs set to zero.
        </BodyText>
        <BodyText>
          When activated, external AI agents will be able to pay ATP micro-fees to invoke read
          and analytics tools, with write tools requiring both ATP payment and valid agent
          credentials. Revenue from agent-to-agent tool consumption represents a structurally
          new institutional revenue stream — the first platform to monetize machine consumption
          of institutional financial data.
        </BodyText>
        <Highlight>
          x402 Phase IV is a planned capability, not a current feature. The current platform
          operates with x402.enabled = false. All tool costs are $0. This document provides
          forward-looking architectural intent only.
        </Highlight>

        <SubTitle>x402 Phase Roadmap</SubTitle>
        <TableBlock
          headers={["Phase", "Description", "Status"]}
          rows={[
            ["Phase I",   "Platform foundation + DB + audit chain",       "Complete"],
            ["Phase II",  "MCP tool mesh + agent registry + A2A routing", "Active"],
            ["Phase III", "External agent JWT access + rate limiting",     "Planned"],
            ["Phase IV",  "x402 ATP payment rail + per-tool micro-fees",  "Roadmap"],
          ]}
        />
      </ContentPage>
    </Document>
  );
}
