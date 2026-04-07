/**
 * @dignity/agent-backend — MCP Agent Service
 *
 * Fastify HTTP service exposing the Dignity platform as a set of MCP-compatible
 * tools. Serves as the AI agent mesh entrypoint for the institutional platform.
 *
 * Port: 5100 (dev) — set via AGENT_BACKEND_PORT env var
 *
 * Architecture:
 *   - /health            — liveness + DB connectivity check
 *   - /tools             — full MCP tool catalog
 *   - /tools/:name       — single tool definition
 *   - /agents            — registered agent registry
 *   - /agents/register   — register a new agent with role + capabilities
 *   - /agents/:id        — get agent details
 *   - /mcp/invoke        — invoke a tool by name with typed inputs
 *   - /mcp/status        — service status + x402 phase info
 *   - /a2a/messages      — A2A message routing stubs
 *
 * x402 payment rail:  Phase IV (documented in src/x402.ts — currently noop)
 *
 * MCP Protocol Compliance:
 *   Tools follow the Model Context Protocol draft spec.
 *   inputSchema uses standard JSON Schema draft-07.
 *   Tool invocations return { result?, error?, auditId?, x402Receipt? }.
 */

import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "@dignity/db";
import { AuditLogger } from "@dignity/audit";
import { TOOLS, TOOL_DOMAINS, getTool } from "./tools.js";
import { debitAgent, X402_CONFIG, X402_PHASE } from "./x402.js";

const PORT = Number(process.env.AGENT_BACKEND_PORT ?? 5100);
const SERVICE = "@dignity/agent-backend";
const VERSION = "0.1.0";

const server = Fastify({ logger: { level: process.env.LOG_LEVEL ?? "info" } });
await server.register(cors, { origin: true });

// ─── In-memory agent registry (persisted to DB in Phase II of this module) ──
interface AgentRecord {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  registeredAt: string;
  lastSeenAt: string;
}
const agentRegistry = new Map<string, AgentRecord>();

// ─── Helpers ────────────────────────────────────────────────────────────────

function agentId(): string {
  return crypto.randomUUID();
}

// ════════════════════════════════════════════════════════════════════════════
// /health
// ════════════════════════════════════════════════════════════════════════════

server.get("/health", async () => {
  let dbOk = false;
  let auditCount = 0;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
    auditCount = await prisma.auditEvent.count();
  } catch { /* db unreachable */ }

  return {
    service: SERVICE,
    version: VERSION,
    status: dbOk ? "healthy" : "degraded",
    database: dbOk ? "connected" : "disconnected",
    auditEvents: auditCount,
    agents: agentRegistry.size,
    tools: TOOLS.length,
    x402Phase: X402_PHASE,
    x402Enabled: X402_CONFIG.enabled,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});

// ════════════════════════════════════════════════════════════════════════════
// /mcp/status
// ════════════════════════════════════════════════════════════════════════════

server.get("/mcp/status", async () => ({
  service: SERVICE,
  version: VERSION,
  protocolVersion: "mcp-1.0",
  tools: TOOLS.length,
  domains: TOOL_DOMAINS,
  agents: agentRegistry.size,
  x402: {
    phase: X402_PHASE,
    enabled: X402_CONFIG.enabled,
    apostleChain: X402_CONFIG.apostleChainUrl,
    facilitator: X402_CONFIG.facilitatorUrl,
    note: "x402 AI-to-AI payment rail is planned for Phase IV. Tool costs are currently 0.",
  },
  timestamp: new Date().toISOString(),
}));

// ════════════════════════════════════════════════════════════════════════════
// /tools
// ════════════════════════════════════════════════════════════════════════════

server.get("/tools", async (request) => {
  const query = (request.query as Record<string, string>);
  const domain = query["domain"];
  const readOnly = query["readOnly"];

  let tools = TOOLS;
  if (domain) tools = tools.filter((t) => t.domain === domain);
  if (readOnly === "true") tools = tools.filter((t) => t.readOnly);
  if (readOnly === "false") tools = tools.filter((t) => !t.readOnly);

  return {
    tools,
    total: tools.length,
    domains: TOOL_DOMAINS,
  };
});

server.get<{ Params: { name: string } }>("/tools/:name", async (request, reply) => {
  const tool = getTool(request.params.name);
  if (!tool) {
    return reply.status(404).send({ error: "tool not found", name: request.params.name });
  }
  return tool;
});

// ════════════════════════════════════════════════════════════════════════════
// /agents
// ════════════════════════════════════════════════════════════════════════════

server.get("/agents", async () => ({
  agents: [...agentRegistry.values()],
  total: agentRegistry.size,
}));

server.post<{
  Body: { name: string; role: string; capabilities?: string[] };
}>("/agents/register", async (request, reply) => {
  const { name, role, capabilities = [] } = request.body;

  if (!name || !role) {
    return reply.status(400).send({ error: "name and role are required" });
  }

  const id = agentId();
  const now = new Date().toISOString();
  const agent: AgentRecord = { id, name, role, capabilities, registeredAt: now, lastSeenAt: now };
  agentRegistry.set(id, agent);

  return { agent, message: "registered" };
});

server.get<{ Params: { id: string } }>("/agents/:id", async (request, reply) => {
  const agent = agentRegistry.get(request.params.id);
  if (!agent) {
    return reply.status(404).send({ error: "agent not found" });
  }
  // Record last seen
  agent.lastSeenAt = new Date().toISOString();
  return agent;
});

// ════════════════════════════════════════════════════════════════════════════
// /mcp/invoke  — tool execution engine
// ════════════════════════════════════════════════════════════════════════════

server.post<{
  Body: {
    tool:    string;
    input?:  Record<string, unknown>;
    agentId?: string;
  };
}>("/mcp/invoke", async (request, reply) => {
  const { tool: toolName, input = {}, agentId: callerId } = request.body;

  const tool = getTool(toolName);
  if (!tool) {
    return reply.status(404).send({ error: "unknown tool", tool: toolName });
  }

  // x402 debit (noop in Phase III)
  if (callerId && tool.x402Cost) {
    await debitAgent(callerId, toolName, tool.x402Cost);
  }

  // Route to handler
  let result: unknown;
  let auditId: string | undefined;

  try {
    switch (toolName) {
      // ── Audit ─────────────────────────────────────────────────────────────
      case "audit.query_events": {
        const { category, actorId, entityType, entityId, limit = 25, offset = 0 } = input as Record<string, unknown>;
        const events = await prisma.auditEvent.findMany({
          where: {
            ...(category   ? { category: String(category) }     : {}),
            ...(actorId    ? { actorId: String(actorId) }       : {}),
            ...(entityType ? { entityType: String(entityType) } : {}),
            ...(entityId   ? { entityId: String(entityId) }     : {}),
          },
          orderBy: { occurredAt: "desc" },
          take: Number(limit),
          skip: Number(offset),
          select: {
            id: true, category: true, action: true, actorId: true,
            actorRole: true, entityType: true, entityId: true,
            description: true, occurredAt: true, hashChain: true,
          },
        });
        const total = await prisma.auditEvent.count();
        result = { events, total, limit, offset };
        break;
      }

      case "audit.verify_chain_integrity": {
        const events = await prisma.auditEvent.findMany({
          orderBy: { occurredAt: "asc" },
          select: { id: true, hashChain: true, occurredAt: true, action: true },
        });
        let intact = true;
        let firstBreak: number | null = null;
        for (let i = 1; i < events.length; i++) {
          if (!events[i].hashChain || !events[i - 1].hashChain) {
            intact = false;
            firstBreak = i;
            break;
          }
        }
        result = { intact, eventCount: events.length, firstBreakIndex: firstBreak };
        break;
      }

      case "audit.get_event": {
        const { id } = input as { id: string };
        const event = await prisma.auditEvent.findUnique({ where: { id } });
        if (!event) return reply.status(404).send({ error: "event not found" });
        result = event;
        break;
      }

      // ── Reserve ───────────────────────────────────────────────────────────
      case "reserve.get_coverage": {
        const lots = await prisma.reserveLot.findMany({
          where: { status: "ACTIVE" },
          select: { valuationUsd: true, assetClass: true },
        });
        const totalReserve = lots.reduce((s, l) => s + Number(l.valuationUsd ?? 0), 0);
        const tokenSupply = await prisma.tokenSupplySnapshot.findFirst({
          orderBy: { snapshotAt: "desc" },
          select: { totalSupply: true },
        });
        const outstanding = Number(tokenSupply?.totalSupply ?? 0);
        const ratio = outstanding > 0 ? totalReserve / outstanding : null;
        const status = ratio === null ? "UNKNOWN" : ratio >= 1.0 ? "OVER_OR_AT" : "UNDER";
        result = { totalReserveUsd: totalReserve, outstandingTokenValue: outstanding, coverageRatio: ratio, status, lots: lots.length };
        break;
      }

      case "reserve.list_lots": {
        const { status = "ACTIVE", limit = 50 } = input as Record<string, unknown>;
        const lots = await prisma.reserveLot.findMany({
          where: status === "ALL" ? {} : { status: String(status) },
          take: Number(limit),
          select: { id: true, assetClass: true, custodian: true, valuationUsd: true, status: true, createdAt: true },
        });
        result = { lots, total: lots.length };
        break;
      }

      case "reserve.get_report": {
        const { reportId } = input as { reportId: string };
        const report = await prisma.reserveReport.findUnique({ where: { id: reportId } });
        if (!report) return reply.status(404).send({ error: "report not found" });
        result = report;
        break;
      }

      case "reserve.publish_report": {
        const { reportId, notes } = input as Record<string, string>;
        const existing = await prisma.reserveReport.findUnique({ where: { id: reportId } });
        if (!existing) return reply.status(404).send({ error: "report not found" });
        if (existing.status !== "DRAFT") {
          return reply.status(409).send({ error: "only DRAFT reports can be submitted", currentStatus: existing.status });
        }
        const updated = await prisma.reserveReport.update({
          where: { id: reportId },
          data: { status: "PENDING_APPROVAL", updatedAt: new Date() },
        });
        auditId = await AuditLogger.append({
          category: "RESERVE",
          action: "RESERVE_REPORT_SUBMITTED_FOR_APPROVAL",
          entityType: "ReserveReport",
          entityId: reportId,
          reason: notes,
          actorId: callerId,
        });
        result = { report: updated, message: "submitted for approval" };
        break;
      }

      // ── Token ─────────────────────────────────────────────────────────────
      case "token.get_status": {
        const snapshot = await prisma.tokenSupplySnapshot.findFirst({
          orderBy: { snapshotAt: "desc" },
        });
        const pendingMints = await prisma.approvalRequest.count({
          where: { type: "MINT_REQUEST", status: "PENDING" },
        });
        result = { snapshot, pendingMintRequests: pendingMints };
        break;
      }

      case "token.request_mint": {
        const { quantity, rationale = "" } = input as Record<string, string>;
        const req = await prisma.approvalRequest.create({
          data: {
            type: "MINT_REQUEST",
            status: "PENDING",
            requestedById: callerId ?? "agent",
            metadata: { quantity, rationale },
          },
        });
        auditId = await AuditLogger.append({
          category: "TOKEN",
          action: "MINT_REQUEST_CREATED",
          entityType: "ApprovalRequest",
          entityId: req.id,
          after: { quantity, rationale },
          actorId: callerId,
        });
        result = { approvalRequest: req, message: "mint request created — pending approval" };
        break;
      }

      case "token.request_redemption": {
        const { investorId, quantity, reason = "" } = input as Record<string, string>;
        const req = await prisma.approvalRequest.create({
          data: {
            type: "REDEMPTION_APPROVE",
            status: "PENDING",
            requestedById: callerId ?? "agent",
            metadata: { investorId, quantity, reason },
          },
        });
        auditId = await AuditLogger.append({
          category: "TOKEN",
          action: "REDEMPTION_REQUEST_CREATED",
          entityType: "ApprovalRequest",
          entityId: req.id,
          after: { investorId, quantity },
          actorId: callerId,
        });
        result = { approvalRequest: req, message: "redemption request created — pending approval" };
        break;
      }

      // ── Approvals ─────────────────────────────────────────────────────────
      case "approval.list_pending": {
        const { type, limit = 20 } = input as Record<string, unknown>;
        const requests = await prisma.approvalRequest.findMany({
          where: { status: "PENDING", ...(type ? { type: String(type) } : {}) },
          take: Number(limit),
          orderBy: { createdAt: "desc" },
        });
        result = { requests, total: requests.length };
        break;
      }

      case "approval.approve": {
        const { requestId, notes = "" } = input as Record<string, string>;
        const existing = await prisma.approvalRequest.findUnique({ where: { id: requestId } });
        if (!existing) return reply.status(404).send({ error: "approval request not found" });
        if (existing.status !== "PENDING") {
          return reply.status(409).send({ error: "request is not in PENDING state", status: existing.status });
        }
        if (existing.requestedById === callerId) {
          return reply.status(403).send({ error: "separation of duties: approver cannot be the requestor" });
        }
        const updated = await prisma.approvalRequest.update({
          where: { id: requestId },
          data: { status: "APPROVED", decidedById: callerId ?? "agent", notes, decidedAt: new Date() },
        });
        auditId = await AuditLogger.append({
          category: "APPROVAL",
          action: "REQUEST_APPROVED",
          entityType: "ApprovalRequest",
          entityId: requestId,
          after: { status: "APPROVED" },
          actorId: callerId,
          reason: notes,
        });
        result = { request: updated, message: "approved" };
        break;
      }

      case "approval.reject": {
        const { requestId, reason } = input as { requestId: string; reason: string };
        const existing = await prisma.approvalRequest.findUnique({ where: { id: requestId } });
        if (!existing) return reply.status(404).send({ error: "approval request not found" });
        const updated = await prisma.approvalRequest.update({
          where: { id: requestId },
          data: { status: "REJECTED", decidedById: callerId ?? "agent", notes: reason, decidedAt: new Date() },
        });
        auditId = await AuditLogger.append({
          category: "APPROVAL",
          action: "REQUEST_REJECTED",
          entityType: "ApprovalRequest",
          entityId: requestId,
          reason,
          actorId: callerId,
        });
        result = { request: updated, message: "rejected" };
        break;
      }

      // ── Market Ops ────────────────────────────────────────────────────────
      case "market.list_venues": {
        const { status = "ALL" } = input as Record<string, string>;
        const venues = await prisma.venue.findMany({
          where: status === "ALL" ? {} : { status: String(status) },
          select: { id: true, name: true, status: true, createdAt: true },
        });
        result = { venues, total: venues.length };
        break;
      }

      case "market.toggle_venue": {
        const { venueId, targetState, reason = "" } = input as Record<string, string>;
        const venue = await prisma.venue.findUnique({ where: { id: venueId } });
        if (!venue) return reply.status(404).send({ error: "venue not found" });
        const req = await prisma.approvalRequest.create({
          data: {
            type: "VENUE_TOGGLE",
            status: "PENDING",
            requestedById: callerId ?? "agent",
            metadata: { venueId, targetState, reason },
          },
        });
        auditId = await AuditLogger.append({
          category: "MARKET",
          action: "VENUE_TOGGLE_REQUESTED",
          entityType: "Venue",
          entityId: venueId,
          after: { targetState },
          actorId: callerId,
          reason,
        });
        result = { approvalRequest: req, message: "venue toggle approval request created" };
        break;
      }

      case "market.get_spread_policy": {
        const { venueId } = input as { venueId: string };
        const policy = await prisma.spreadPolicy.findFirst({ where: { venueId } });
        result = policy ?? { message: "no spread policy found for venue" };
        break;
      }

      // ── Analytics ─────────────────────────────────────────────────────────
      case "analytics.coverage_timeline": {
        const snapshots = await prisma.tokenSupplySnapshot.findMany({
          orderBy: { snapshotAt: "asc" },
          select: { snapshotAt: true, totalSupply: true, reserveCoverageRatio: true },
          take: 100,
        });
        result = { snapshots, count: snapshots.length };
        break;
      }

      case "analytics.issuance_summary": {
        const snapshot = await prisma.tokenSupplySnapshot.findFirst({
          orderBy: { snapshotAt: "desc" },
        });
        const mintCount = await prisma.approvalRequest.count({ where: { type: "MINT_REQUEST", status: "APPROVED" } });
        const redeemCount = await prisma.approvalRequest.count({ where: { type: "REDEMPTION_APPROVE", status: "APPROVED" } });
        result = { snapshot, approvedMints: mintCount, approvedRedemptions: redeemCount };
        break;
      }

      // ── Compliance ────────────────────────────────────────────────────────
      case "compliance.check_investor": {
        const { investorId } = input as { investorId: string };
        const investor = await prisma.investor.findUnique({ where: { id: investorId } });
        if (!investor) return reply.status(404).send({ error: "investor not found" });
        auditId = await AuditLogger.append({
          category: "COMPLIANCE",
          action: "COMPLIANCE_CHECK_PERFORMED",
          entityType: "Investor",
          entityId: investorId,
          actorId: callerId,
        });
        result = {
          investor: { id: investor.id, kycStatus: investor.kycStatus, accredited: investor.accredited, jurisdiction: investor.jurisdiction },
          compliant: investor.kycStatus === "APPROVED" && investor.accredited,
        };
        break;
      }

      case "compliance.list_flags": {
        const investors = await prisma.investor.findMany({
          where: { kycStatus: { not: "APPROVED" } },
          select: { id: true, kycStatus: true, jurisdiction: true, accredited: true },
          take: 50,
        });
        result = { flags: investors, total: investors.length };
        break;
      }

      default:
        return reply.status(400).send({ error: "tool not implemented", tool: toolName });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    server.log.error({ tool: toolName, err: message }, "tool invocation error");
    return reply.status(500).send({ error: "tool execution error", detail: message });
  }

  return {
    tool: toolName,
    result,
    auditId: auditId ?? null,
    x402Receipt: null, // populated in Phase IV
    timestamp: new Date().toISOString(),
  };
});

// ════════════════════════════════════════════════════════════════════════════
// /a2a/messages — Agent-to-Agent message routing (Phase III stubs)
// ════════════════════════════════════════════════════════════════════════════

const a2aMessages: Array<{
  id: string; from: string; to: string; type: string;
  payload: unknown; sentAt: string;
}> = [];

server.post<{
  Body: { from: string; to: string; type: string; payload?: unknown };
}>("/a2a/messages", async (request, reply) => {
  const { from, to, type, payload = {} } = request.body;
  if (!from || !to || !type) {
    return reply.status(400).send({ error: "from, to, and type are required" });
  }
  const msg = { id: crypto.randomUUID(), from, to, type, payload, sentAt: new Date().toISOString() };
  a2aMessages.push(msg);
  server.log.info({ from, to, type }, "a2a message routed");
  return { message: msg, status: "routed" };
});

server.get<{ Querystring: { agentId: string } }>("/a2a/messages", async (request, reply) => {
  const { agentId } = request.query;
  if (!agentId) return reply.status(400).send({ error: "agentId query param required" });
  const inbox = a2aMessages.filter((m) => m.to === agentId);
  return { messages: inbox, total: inbox.length };
});

// ════════════════════════════════════════════════════════════════════════════
// Boot
// ════════════════════════════════════════════════════════════════════════════

try {
  await server.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`\n  ${SERVICE} v${VERSION}`);
  console.log(`  Port  : ${PORT}`);
  console.log(`  Tools : ${TOOLS.length} across ${TOOL_DOMAINS.length} domains`);
  console.log(`  x402  : Phase ${X402_PHASE} — ${X402_CONFIG.enabled ? "ENABLED" : "not active"}`);
  console.log(`  DB    : ${process.env.DATABASE_URL ? "configured" : "using defaults"}\n`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
