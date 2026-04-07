import { notFound } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/shell";
import { Card, CardContent, Badge, GoldDivider } from "@dignity/ui";
import { PublishReportButton } from "@/components/admin/forms";
import { prisma } from "@dignity/db";

export const metadata = { title: "Reserve Report" };

const STATUS_VARIANT: Record<string, "gold" | "green" | "red" | "yellow" | "muted" | "blue"> = {
  DRAFT: "yellow",
  PUBLISHED: "green",
  ARCHIVED: "muted",
};

function fmt(d: Date | null | undefined, opts?: Intl.DateTimeFormatOptions) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...opts,
  }).format(new Date(d));
}

function fmtUsd(n: number | null | undefined) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 }).format(n);
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let report;
  try {
    report = await prisma.reserveReport.findUnique({ where: { id } });
  } catch {
    report = null;
  }

  if (!report) notFound();

  return (
    <>
      <TopBar title={report.title} subtitle={`${fmt(report.periodStart)} – ${fmt(report.periodEnd)}`} />
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Link href="/admin/reserve" className="hover:text-gold transition-colors">
            Reserve Admin
          </Link>
          <span>›</span>
          <span>{report.title}</span>
        </div>

        <Card>
          <CardContent className="py-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold text-white leading-tight">{report.title}</h2>
              <Badge variant={STATUS_VARIANT[report.status] ?? "muted"}>{report.status}</Badge>
            </div>

            <GoldDivider />

            <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["Period Start", fmt(report.periodStart)],
                ["Period End", fmt(report.periodEnd)],
                ["Published At", fmt(report.publishedAt)],
                ["Total Reserve", fmtUsd(report.totalReserveUsd ?? undefined)],
                ["Coverage Ratio", report.coverageRatio != null ? (Number(report.coverageRatio) * 100).toFixed(2) + "%" : "—"],
                ["NAV / Token", report.navPerToken != null ? "$" + Number(report.navPerToken).toFixed(4) : "—"],
                ["Circulating Supply", report.circulatingSupply != null ? Number(report.circulatingSupply).toLocaleString() : "—"],
                ["Gold (oz)", report.goldOz != null ? Number(report.goldOz).toLocaleString() : "—"],
                ["Prepared By", report.preparedBy ?? "—"],
              ].map(([label, value]) => (
                <div key={label} className="space-y-0.5">
                  <dt className="text-xs text-white/40 uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm text-white/80">{value}</dd>
                </div>
              ))}
            </dl>

            {report.proofCid && (
              <>
                <GoldDivider />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 uppercase tracking-wide">Proof CID (IPFS)</p>
                  <p className="text-xs text-white/60 font-mono break-all">{report.proofCid}</p>
                </div>
              </>
            )}

            {report.notes && (
              <>
                <GoldDivider />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 uppercase tracking-wide">Notes</p>
                  <p className="text-sm text-white/60">{report.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {report.status === "DRAFT" && (
          <Card>
            <CardContent className="py-5 space-y-3">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Publish Report
              </h3>
              <p className="text-xs text-white/40">
                Publishing makes this report visible on the public proof center. Requires separation-of-duties — cannot be published by the same role that prepared it.
              </p>
              <PublishReportButton
                reportId={report.id}
                reportTitle={report.title}
                currentStatus={report.status}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
