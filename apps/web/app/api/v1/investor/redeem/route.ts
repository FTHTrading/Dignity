import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  tokenAmount: z.number().positive(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  // TODO: call RedemptionService.process() once DB is seeded
  return NextResponse.json({
    ok: true,
    message: "Redemption request received. Tokens held in escrow pending confirmation.",
    tokenAmount: parsed.data.tokenAmount,
    dataSource: "DEMO",
  });
}
