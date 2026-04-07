/**
 * Next.js App Router — Agent Backend Proxy
 *
 * Forwards all /api/agent/* requests to the @dignity/agent-backend
 * service on localhost:5100.
 *
 * This avoids CORS issues from the browser and lets the web app
 * remain the single Origin for institutional users.
 *
 * Route: /api/agent/[...path]
 *
 * Examples:
 *   GET  /api/agent/health           → http://localhost:5100/health
 *   GET  /api/agent/tools            → http://localhost:5100/tools
 *   POST /api/agent/mcp/invoke       → http://localhost:5100/mcp/invoke
 *   GET  /api/agent/agents           → http://localhost:5100/agents
 *   POST /api/agent/a2a/messages     → http://localhost:5100/a2a/messages
 */

import { NextRequest, NextResponse } from "next/server";

const AGENT_BACKEND = process.env.AGENT_BACKEND_URL ?? "http://localhost:5100";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await params;
  const upstreamPath = "/" + path.join("/");
  const url = new URL(upstreamPath, AGENT_BACKEND);

  // Forward query string
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("X-Dignity-Source", "web");
  headers.set("X-Forwarded-For", request.headers.get("x-forwarded-for") ?? "");

  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.text();
    } catch { /* empty body */ }
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(url.toString(), {
      method: request.method,
      headers,
      body,
      // Give agent backend 30s for complex tool invocations
      signal: AbortSignal.timeout(30_000),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "agent backend unreachable";
    return NextResponse.json(
      { error: "agent_backend_unavailable", detail: message },
      { status: 503 }
    );
  }

  const responseBody = await upstreamResponse.text();

  return new NextResponse(responseBody, {
    status: upstreamResponse.status,
    headers: {
      "Content-Type": upstreamResponse.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export const GET    = handler;
export const POST   = handler;
export const PUT    = handler;
export const PATCH  = handler;
export const DELETE = handler;
