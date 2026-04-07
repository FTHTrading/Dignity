import { notFound } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/shell";
import { Card, CardContent, Badge, GoldDivider } from "@dignity/ui";
import { VenueToggleButton } from "@/components/admin/forms";
import { prisma } from "@dignity/db";

export const metadata = { title: "Venue Detail" };

const TYPE_LABEL: Record<string, string> = {
  OTC_BROKER: "OTC Broker",
  APPROVED_EXCHANGE: "Approved Exchange",
  ATS: "Alternative Trading System",
  BILATERAL_OTC: "Bilateral OTC",
  INTERNAL_DESK: "Internal Desk",
};

const STATUS_VARIANT: Record<string, "gold" | "green" | "red" | "yellow" | "muted" | "blue"> = {
  ACTIVE: "green",
  SUSPENDED: "red",
  UNDER_REVIEW: "yellow",
  TERMINATED: "muted",
  PENDING_APPROVAL: "gold",
};

function fmt(d: Date | null | undefined) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(d));
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let venue;
  try {
    venue = await prisma.venue.findUnique({ where: { id } });
  } catch {
    venue = null;
  }

  if (!venue) notFound();

  return (
    <>
      <TopBar title={venue.name} subtitle={TYPE_LABEL[venue.venueType] ?? venue.venueType} />
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Link href="/admin/lp" className="hover:text-gold transition-colors">
            LP Registry
          </Link>
          <span>›</span>
          <span>{venue.name}</span>
        </div>

        <Card>
          <CardContent className="py-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold text-white leading-tight">{venue.name}</h2>
              <Badge variant={STATUS_VARIANT[venue.status] ?? "muted"}>{venue.status}</Badge>
            </div>

            <GoldDivider />

            <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["Venue Type", TYPE_LABEL[venue.venueType] ?? venue.venueType],
                ["Jurisdiction", venue.jurisdiction ?? "—"],
                ["URL", venue.url ?? "—"],
                ["API Endpoint", venue.apiEndpoint ?? "—"],
                ["Approved At", fmt(venue.approvedAt)],
                ["Suspended At", fmt(venue.suspendedAt)],
              ].map(([label, value]) => (
                <div key={label} className="space-y-0.5">
                  <dt className="text-xs text-white/40 uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm text-white/80 break-all">{value}</dd>
                </div>
              ))}
            </dl>

            {venue.notes && (
              <>
                <GoldDivider />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 uppercase tracking-wide">Notes</p>
                  <p className="text-sm text-white/60">{venue.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {venue.status !== "TERMINATED" && (
          <Card>
            <CardContent className="py-5 space-y-3">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                Status Management
              </h3>
              <p className="text-xs text-white/40">
                Venue status changes are queued as approval requests and logged to the audit trail.
              </p>
              <VenueToggleButton
                venueId={venue.id}
                venueName={venue.name}
                currentStatus={venue.status}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
