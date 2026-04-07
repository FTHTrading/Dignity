/**
 * API route: GET /api/documents/[slug]
 * Renders an institutional PDF and streams it as an attachment.
 *
 * IMPORTANT: Must run in Node.js runtime — @react-pdf/renderer uses Node APIs
 * and is NOT compatible with the Cloudflare Workers edge runtime.
 */
import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

import { ExecutiveSummaryPDF }    from "@/lib/pdf/executive-summary";
import { ProofOfReservePDF }      from "@/lib/pdf/proof-of-reserve";
import { InvestorProspectusPDF }  from "@/lib/pdf/investor-prospectus";
import { GovernanceFrameworkPDF } from "@/lib/pdf/governance-framework";
import { TechnologyBriefPDF }     from "@/lib/pdf/technology-brief";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PDFElement = React.ReactElement<any>;

interface DocEntry {
  component: PDFElement;
  filename:  string;
}

const DOCUMENTS: Record<string, DocEntry> = {
  "executive-summary": {
    component: React.createElement(ExecutiveSummaryPDF),
    filename:  "Dignity_Executive_Summary_2026.pdf",
  },
  "proof-of-reserve": {
    component: React.createElement(ProofOfReservePDF),
    filename:  "Dignity_Proof_of_Reserve_2026.pdf",
  },
  "investor-prospectus": {
    component: React.createElement(InvestorProspectusPDF),
    filename:  "Dignity_Investor_Prospectus_2026.pdf",
  },
  "governance-framework": {
    component: React.createElement(GovernanceFrameworkPDF),
    filename:  "Dignity_Governance_Framework_2026.pdf",
  },
  "technology-brief": {
    component: React.createElement(TechnologyBriefPDF),
    filename:  "Dignity_Technology_Brief_2026.pdf",
  },
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const doc = DOCUMENTS[slug];

  if (!doc) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = await renderToStream(doc.component as any);

  // Collect stream into a buffer for the Next.js Response
  const chunks: Buffer[] = [];
  for await (const chunk of stream as AsyncIterable<Buffer>) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const pdf = Buffer.concat(chunks);

  return new Response(pdf, {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.filename}"`,
      "Content-Length":      pdf.byteLength.toString(),
      "Cache-Control":       "no-store",
    },
  });
}
