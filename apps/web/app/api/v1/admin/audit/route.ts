import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@dignity/auth";
import { AuditLogger } from "@dignity/audit";
import type { UserRole, AuditEventCategory } from "@dignity/shared-types";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!hasPermission(session.user.role as UserRole, "audit:read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as AuditEventCategory | null;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "50")));

  const result = await AuditLogger.query({
    category: category ?? undefined,
    page,
    pageSize,
  });

  return NextResponse.json({ ...result, dataSource: "DB" });
}
