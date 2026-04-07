import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDemoPortfolio } from "@/lib/adapters";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const data = getDemoPortfolio(session.user.id);
  return NextResponse.json(data);
}
