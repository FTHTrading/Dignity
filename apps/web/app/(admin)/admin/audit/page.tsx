import { TopBar } from "@/components/shell";
import { Card, CardContent } from "@dignity/ui";

export const metadata = { title: "Audit Log" };

// Demo audit entries — replace with live AuditLogger.query() call
const DEMO_EVENTS = [
  { id: "evt-001", category: "ISSUANCE", actorId: "system", entityType: "Subscription", entityId: "sub-001", action: "issuance.approved", hash: "abc123…", createdAt: new Date(Date.now() - 3600_000).toISOString() },
  { id: "evt-002", category: "COMPLIANCE", actorId: "compliance-officer@dignity.io", entityType: "Investor", entityId: "inv-007", action: "kyc.approved", hash: "def456…", createdAt: new Date(Date.now() - 7200_000).toISOString() },
  { id: "evt-003", category: "RESERVE", actorId: "system", entityType: "CoverageSnapshot", entityId: "snap-003", action: "coverage.snapshot.created", hash: "ghi789…", createdAt: new Date(Date.now() - 86400_000).toISOString() },
  { id: "evt-004", category: "TREASURY", actorId: "admin@dignity.io", entityType: "TreasuryMovement", entityId: "mv-003", action: "treasury.movement.recorded", hash: "jkl012…", createdAt: new Date(Date.now() - 2 * 86400_000).toISOString() },
];

const CATEGORY_COLORS: Record<string, string> = {
  ISSUANCE: "text-gold",
  COMPLIANCE: "text-blue-400",
  RESERVE: "text-green-400",
  TREASURY: "text-purple-400",
  ADMIN: "text-red-400",
};

export default function AdminAuditPage() {
  return (
    <>
      <TopBar title="Audit Log" subtitle="Immutable hash-chained event log" />
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        <p className="text-xs text-white/30">
          Each entry is SHA-256 hashed and chained to its predecessor. Verify integrity via{" "}
          <code className="text-white/50">AuditLogger.query()</code>.
        </p>

        <div className="space-y-3">
          {DEMO_EVENTS.map((evt) => (
            <Card key={evt.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium uppercase tracking-wider ${CATEGORY_COLORS[evt.category] ?? "text-white/50"}`}>
                        {evt.category}
                      </span>
                      <span className="text-xs text-white/30">·</span>
                      <span className="text-xs text-white/50">{evt.action}</span>
                    </div>
                    <p className="text-sm text-white/70 truncate">
                      {evt.entityType}: <span className="text-white/50">{evt.entityId}</span>
                    </p>
                    <p className="text-xs text-white/30">actor: {evt.actorId}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-white/30">{new Date(evt.createdAt).toLocaleString()}</p>
                    <p className="text-xs font-mono text-white/20 mt-1">{evt.hash}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </>
  );
}
