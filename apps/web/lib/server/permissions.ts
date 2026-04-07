import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@dignity/auth";
import type { Permission } from "@dignity/auth";
import type { UserRole } from "@dignity/shared-types";

/**
 * Fetches the current session and verifies the user holds the required permission.
 * Throws a tagged Error (with .status) so route handlers can map it to NextResponse.
 */
export async function requirePermission(permission: Permission) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw Object.assign(new Error("Unauthenticated"), { status: 401 });
  }
  if (!hasPermission(session.user.role as UserRole, permission)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  return session;
}

// Separation-of-duties rules: maps action → roles that are BLOCKED from performing it.
const SOD_RULES: Record<string, UserRole[]> = {
  "subscription:approve": ["TREASURY_OFFICER" as UserRole],
  "treasury:wire_execute": ["COMPLIANCE_OFFICER" as UserRole],
  "reserve:publish_report": ["MARKET_OPS" as UserRole],
};

/**
 * Throws a 403 if actorRole is barred from performing action by SoD policy.
 */
export function enforceSeparationOfDuties(actorRole: UserRole, action: string): void {
  const blocked = SOD_RULES[action] ?? [];
  if (blocked.includes(actorRole)) {
    throw Object.assign(
      new Error(`SoD violation: ${actorRole} cannot perform ${action}`),
      { status: 403 }
    );
  }
}
