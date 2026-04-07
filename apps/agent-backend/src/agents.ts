/**
 * Platform Agent Registry — @dignity/agent-backend
 *
 * Defines the canonical AI agent personas for the Dignity institutional
 * platform. These are seeded into the in-memory registry on startup and
 * represent the named agent identities that consume MCP tools.
 *
 * In Phase II: agents will be persisted to the DB (AgentRecord table).
 * In Phase IV: each agent gets an Apostle Chain wallet + ATP balance.
 */

export interface PlatformAgent {
  id:           string;
  name:         string;
  displayName:  string;
  role:         string;
  description:  string;
  capabilities: string[];  // tool domains this agent can access
  readOnly:     boolean;   // true = only readOnly: true tools
  x402Budget:   string;    // ATP string, "0" until Phase IV
}

/**
 * Canonical platform agents. These map to dignit admin roles.
 *
 * Separation of duties is enforced at the tool invocation level:
 *   - treasury-agent can request mints but not approve them
 *   - compliance-agent can check investors but not approve market ops
 *   - market-ops-agent can toggle venues (via approval request), not mint
 *   - audit-agent is permanently read-only
 */
export const PLATFORM_AGENTS: PlatformAgent[] = [
  {
    id:          "treasury-agent",
    name:        "treasury-agent",
    displayName: "Treasury Agent",
    role:        "TREASURY_OFFICER",
    description:
      "Monitors reserve coverage, manages token supply snapshots, and initiates " +
      "mint/redemption approval requests. Cannot self-approve.",
    capabilities: ["reserve", "token", "analytics"],
    readOnly:    false,
    x402Budget:  "0",
  },
  {
    id:          "compliance-agent",
    name:        "compliance-agent",
    displayName: "Compliance Agent",
    role:        "COMPLIANCE_OFFICER",
    description:
      "Performs KYC/AML investor checks, surfaces compliance flags, and can " +
      "block or clear investors. Can read audit events but not modify them.",
    capabilities: ["compliance", "audit"],
    readOnly:    false,
    x402Budget:  "0",
  },
  {
    id:          "market-ops-agent",
    name:        "market-ops-agent",
    displayName: "Market Operations Agent",
    role:        "MARKET_OPS",
    description:
      "Manages trading venue status and spread policies. Venue toggles are " +
      "submitted as approval requests (four-eyes principle).",
    capabilities: ["market", "analytics"],
    readOnly:    false,
    x402Budget:  "0",
  },
  {
    id:          "audit-agent",
    name:        "audit-agent",
    displayName: "Audit Agent",
    role:        "AUDITOR",
    description:
      "Read-only access to the SHA-256 hash-chain audit log. Can query events, " +
      "verify chain integrity, and export audit records. Never writes.",
    capabilities: ["audit"],
    readOnly:    true,
    x402Budget:  "0",
  },
  {
    id:          "analytics-agent",
    name:        "analytics-agent",
    displayName: "Analytics Agent",
    role:        "ANALYTICS",
    description:
      "Generates coverage timelines and issuance summaries for board reporting " +
      "and public proof-of-reserve disclosures.",
    capabilities: ["analytics", "reserve"],
    readOnly:    true,
    x402Budget:  "0",
  },
  {
    id:          "approval-agent",
    name:        "approval-agent",
    displayName: "Approval Orchestrator",
    role:        "BOARD_DIRECTOR",
    description:
      "Reviews and decides pending approval requests (mint, redemption, venue " +
      "toggle). Enforces separation of duties — cannot approve its own requests.",
    capabilities: ["approval", "token", "market", "reserve"],
    readOnly:    false,
    x402Budget:  "0",
  },
];

/** Lookup by id or name */
export function getPlatformAgent(idOrName: string): PlatformAgent | undefined {
  return PLATFORM_AGENTS.find(
    (a) => a.id === idOrName || a.name === idOrName
  );
}

/** Does this agent have access to a given tool domain? */
export function agentCanAccessDomain(agentId: string, domain: string): boolean {
  const agent = getPlatformAgent(agentId);
  if (!agent) return false;
  return agent.capabilities.includes(domain);
}
