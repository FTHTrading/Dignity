import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  investmentAmountUsd: z.number().positive().min(5000),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  // TODO: call IssuanceService.process() once DB is seeded
  return NextResponse.json({
    ok: true,
    message: "Subscription request received. Pending compliance review.",
    investmentAmountUsd: parsed.data.investmentAmountUsd,
    dataSource: "DEMO",
  });
}
