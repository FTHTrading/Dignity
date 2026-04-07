/**
 * Generate static PDFs from @react-pdf/renderer components.
 * Run: node scripts/generate-pdfs.mjs
 * Output: public/docs/*.pdf
 */
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "docs");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

async function generate(name, factory) {
  try {
    const mod = await factory();
    const Component = mod[Object.keys(mod).find(k => k.endsWith("PDF"))];
    const React = (await import("react")).default;
    const el = React.createElement(Component);
    const buf = await renderToBuffer(el);
    const path = join(OUT_DIR, name);
    writeFileSync(path, buf);
    console.log(`  ✓ ${name} (${(buf.byteLength / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
  }
}

console.log("Generating PDFs...\n");

const docs = [
  ["Dignity_Executive_Summary_2026.pdf", () => import("../lib/pdf/executive-summary.tsx")],
  ["Dignity_Proof_of_Reserve_2026.pdf", () => import("../lib/pdf/proof-of-reserve.tsx")],
  ["Dignity_Investor_Prospectus_2026.pdf", () => import("../lib/pdf/investor-prospectus.tsx")],
  ["Dignity_Governance_Framework_2026.pdf", () => import("../lib/pdf/governance-framework.tsx")],
  ["Dignity_Technology_Brief_2026.pdf", () => import("../lib/pdf/technology-brief.tsx")],
];

for (const [name, factory] of docs) {
  await generate(name, factory);
}

console.log("\nDone.");
