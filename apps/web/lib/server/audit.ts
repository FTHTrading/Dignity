import { AuditLogger } from "@dignity/audit";
import type { AppendParams } from "@dignity/audit";

/**
 * Fire-and-forget audit event recorder. Errors are swallowed so they never
 * break the main request path, but are logged to stderr.
 */
export async function recordAuditEvent(params: AppendParams): Promise<void> {
  try {
    await AuditLogger.append(params);
  } catch (err) {
    console.error("[audit] failed to record event:", err);
  }
}
