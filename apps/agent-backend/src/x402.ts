/**
 * @dignity/agent-backend — x402 AI-to-AI Payment Rail
 *
 * STATUS: Phase IV — Not yet active.
 *
 * This module documents the x402 integration design for Dignity's agent mesh.
 * When the x402 payment rail is enabled:
 *
 *   1. Each MCP tool invocation will carry an optional `x402Cost` (ATP string amount).
 *   2. The invoking agent must have a funded balance on the Apostle Chain (chain_id 7332).
 *   3. The agent-backend will call POST /v1/tx on the Apostle Chain API before executing
 *      any write tool to debit the invoking agent's budget.
 *   4. A payment receipt (TxEnvelope hash) will be included in every tool response.
 *   5. The x402 facilitator (UnyKorn-X402-aws) will handle PASS tier subscription billing
 *      for agents with recurring access to the Dignity platform tools.
 *
 * Integration points:
 *   - Apostle Chain: http://apostle-chain:7332 (chain_id 7332, ATP asset)
 *   - x402 Facilitator: https://x402.unykorn.org
 *   - Agent registration: POST /v1/agents/register → assigns agent:UUID
 *   - Budget management: GET /v1/agent/{id}/balance
 *
 * All x402Cost values in TOOLS are currently null. They will be populated when
 * the payment rail is enabled following board sign-off and legal review.
 */

export const X402_PHASE = "IV" as const;

export const X402_CONFIG = {
  enabled: false,
  apostleChainUrl: process.env.APOSTLE_CHAIN_URL ?? "http://localhost:7332",
  facilitatorUrl: process.env.X402_FACILITATOR_URL ?? "https://x402.unykorn.org",
  chainId: 7332,
  asset: "ATP",
  /** Default microtransaction cost for read tools (ATP in base units) */
  readCostAtp: "0",
  /** Default microtransaction cost for write tools (ATP in base units) */
  writeCostAtp: "0",
} as const;

/**
 * Stub: debit an agent's ATP balance before a write tool executes.
 * Noop while X402_CONFIG.enabled === false.
 */
export async function debitAgent(agentId: string, toolName: string, costAtp: string): Promise<void> {
  if (!X402_CONFIG.enabled) return;

  // Phase IV implementation:
  //   1. GET /v1/agent/{agentId}/balance — verify sufficient ATP
  //   2. POST /v1/tx with TxPayload { type: "transfer", to: DIGNITY_TREASURY_AGENT, asset: "ATP", amount: costAtp }
  //   3. Attach receipt hash to tool response

  console.info(`[x402 stub] debit ${costAtp} ATP from agent ${agentId} for tool ${toolName} — noop (Phase IV)`);
}
