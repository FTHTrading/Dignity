/**
 * @dignity/agent-backend — MCP Tool Catalog
 *
 * Defines every MCP tool the Dignity agent mesh exposes.
 * Tools are grouped by domain. Each tool declares:
 *   - name, description, inputSchema (JSON Schema)
 *   - readOnly flag (write tools require APPROVE_MINT / elevated role)
 *   - auditRequired (all state-changing tools are audit-logged)
 *   - x402Cost: null for Phase III; will carry ATP microtransaction
 *     cost when x402 payment rail ships in Phase IV.
 */

export interface ToolDef {
  name: string;
  domain: string;
  description: string;
  inputSchema: Record<string, unknown>;
  readOnly: boolean;
  auditRequired: boolean;
  x402Cost: string | null; // ATP string amount — null until Phase IV
}

export const TOOLS: ToolDef[] = [
  // ─── Audit ────────────────────────────────────────────────────────────────
  {
    name: "audit.query_events",
    domain: "audit",
    description:
      "Return a paginated slice of the hash-chain audit event log, optionally filtered by category, actor, entity type, or date range.",
    inputSchema: {
      type: "object",
      properties: {
        category:   { type: "string" },
        actorId:    { type: "string" },
        entityType: { type: "string" },
        entityId:   { type: "string" },
        from:       { type: "string", format: "date-time" },
        to:         { type: "string", format: "date-time" },
        limit:      { type: "number", default: 25 },
        offset:     { type: "number", default: 0 },
      },
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "audit.verify_chain_integrity",
    domain: "audit",
    description:
      "Walk the full audit event chain from genesis, recompute every SHA-256 hash, and return pass/fail with first-break index if the chain is broken.",
    inputSchema: { type: "object", properties: {} },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "audit.get_event",
    domain: "audit",
    description: "Retrieve a single audit event by ID with full payload and hash.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },

  // ─── Reserve ──────────────────────────────────────────────────────────────
  {
    name: "reserve.get_coverage",
    domain: "reserve",
    description:
      "Return the current reserve coverage ratio (reserve value USD / outstanding token value USD), breakdowns by asset class, and coverage status (OVER | AT | UNDER).",
    inputSchema: { type: "object", properties: {} },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "reserve.list_lots",
    domain: "reserve",
    description:
      "List all custodied reserve lots with asset class, custodian, weight, purity, valuation, and status.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["ACTIVE", "PENDING", "REDEEMED", "ALL"] },
        limit:  { type: "number", default: 50 },
      },
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "reserve.get_report",
    domain: "reserve",
    description:
      "Retrieve a specific reserve report (DRAFT or PUBLISHED) by ID, including attestation reference if present.",
    inputSchema: {
      type: "object",
      properties: { reportId: { type: "string" } },
      required: ["reportId"],
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "reserve.publish_report",
    domain: "reserve",
    description:
      "Submit a DRAFT reserve report for approval. Moves it to PENDING_APPROVAL state. Requires TREASURY_OFFICER role.",
    inputSchema: {
      type: "object",
      properties: {
        reportId: { type: "string" },
        notes:    { type: "string" },
      },
      required: ["reportId"],
    },
    readOnly: false,
    auditRequired: true,
    x402Cost: null,
  },

  // ─── Token ────────────────────────────────────────────────────────────────
  {
    name: "token.get_status",
    domain: "token",
    description:
      "Return DIGAU token status: current supply, pending mint requests, freeze status, and reserve gate state.",
    inputSchema: { type: "object", properties: {} },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "token.request_mint",
    domain: "token",
    description:
      "Create a MINT_REQUEST approval workflow for a specified DIGAU quantity. Requires reserve coverage ≥ 100 %. Creates an ApprovalRequest in PENDING state.",
    inputSchema: {
      type: "object",
      properties: {
        quantity:  { type: "string", description: "Amount in base units (string to avoid float loss)" },
        rationale: { type: "string" },
      },
      required: ["quantity"],
    },
    readOnly: false,
    auditRequired: true,
    x402Cost: null,
  },
  {
    name: "token.request_redemption",
    domain: "token",
    description:
      "Initiate a REDEMPTION_APPROVE workflow for an investor redemption request.",
    inputSchema: {
      type: "object",
      properties: {
        investorId: { type: "string" },
        quantity:   { type: "string" },
        reason:     { type: "string" },
      },
      required: ["investorId", "quantity"],
    },
    readOnly: false,
    auditRequired: true,
    x402Cost: null,
  },

  // ─── Approvals ────────────────────────────────────────────────────────────
  {
    name: "approval.list_pending",
    domain: "approval",
    description:
      "List all approval requests in PENDING state, optionally filtered by type.",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["MINT_REQUEST", "REDEMPTION_APPROVE", "VENUE_TOGGLE", "SPREAD_POLICY_CHANGE", "RESERVE_REPORT_PUBLISH"],
        },
        limit: { type: "number", default: 20 },
      },
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "approval.approve",
    domain: "approval",
    description:
      "Approve a pending approval request. The approving agent must not be the same actor that created the request (separation of duties enforced).",
    inputSchema: {
      type: "object",
      properties: {
        requestId: { type: "string" },
        notes:     { type: "string" },
      },
      required: ["requestId"],
    },
    readOnly: false,
    auditRequired: true,
    x402Cost: null,
  },
  {
    name: "approval.reject",
    domain: "approval",
    description: "Reject a pending approval request with a mandatory reason.",
    inputSchema: {
      type: "object",
      properties: {
        requestId: { type: "string" },
        reason:    { type: "string" },
      },
      required: ["requestId", "reason"],
    },
    readOnly: false,
    auditRequired: true,
    x402Cost: null,
  },

  // ─── Compliance ───────────────────────────────────────────────────────────
  {
    name: "compliance.check_investor",
    domain: "compliance",
    description:
      "Run compliance checks for an investor: KYC status, accreditation, jurisdiction eligibility, and AML flags.",
    inputSchema: {
      type: "object",
      properties: {
        investorId: { type: "string" },
      },
      required: ["investorId"],
    },
    readOnly: true,
    auditRequired: true,
    x402Cost: null,
  },
  {
    name: "compliance.list_flags",
    domain: "compliance",
    description:
      "List all active compliance flags across the investor registry, optionally filtered by severity.",
    inputSchema: {
      type: "object",
      properties: {
        severity: { type: "string", enum: ["HIGH", "MEDIUM", "LOW", "ALL"] },
      },
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },

  // ─── Market Ops ───────────────────────────────────────────────────────────
  {
    name: "market.list_venues",
    domain: "market",
    description: "List all registered trading venues with status, spread policy reference, and market-maker assignments.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["ACTIVE", "SUSPENDED", "ALL"] },
      },
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "market.toggle_venue",
    domain: "market",
    description:
      "Initiate a VENUE_TOGGLE approval workflow to activate or suspend a trading venue.",
    inputSchema: {
      type: "object",
      properties: {
        venueId:    { type: "string" },
        targetState: { type: "string", enum: ["ACTIVE", "SUSPENDED"] },
        reason:     { type: "string" },
      },
      required: ["venueId", "targetState"],
    },
    readOnly: false,
    auditRequired: true,
    x402Cost: null,
  },
  {
    name: "market.get_spread_policy",
    domain: "market",
    description: "Retrieve the current spread policy for a venue.",
    inputSchema: {
      type: "object",
      properties: { venueId: { type: "string" } },
      required: ["venueId"],
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },

  // ─── Analytics ────────────────────────────────────────────────────────────
  {
    name: "analytics.coverage_timeline",
    domain: "analytics",
    description:
      "Return reserve coverage ratio snapshots over a date range, suitable for trend visualisation.",
    inputSchema: {
      type: "object",
      properties: {
        from:       { type: "string", format: "date-time" },
        to:         { type: "string", format: "date-time" },
        granularity: { type: "string", enum: ["hourly", "daily", "weekly"] },
      },
    },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
  {
    name: "analytics.issuance_summary",
    domain: "analytics",
    description:
      "Return total minted, total redeemed, net outstanding, and mint/redemption cadence.",
    inputSchema: { type: "object", properties: {} },
    readOnly: true,
    auditRequired: false,
    x402Cost: null,
  },
];

export const TOOL_DOMAINS = [...new Set(TOOLS.map((t) => t.domain))];

export function getTool(name: string): ToolDef | undefined {
  return TOOLS.find((t) => t.name === name);
}
