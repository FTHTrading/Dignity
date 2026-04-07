"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ApprovalCount {
  type: string;
  count: number;
}

interface OverviewChartsProps {
  approvalsByType: ApprovalCount[];
  coverageRatio: number;
  navPerToken: number;
  pendingApprovals: number;
}

const TYPE_SHORT: Record<string, string> = {
  MINT_REQUEST: "Mint",
  REDEMPTION_APPROVE: "Redemption",
  VENUE_TOGGLE: "Venue",
  SPREAD_POLICY_CHANGE: "Spread",
  RESERVE_REPORT_PUBLISH: "Reserve",
  LP_ONBOARD: "LP",
  TREASURY_WIRE: "Treasury",
};

const TOOLTIP_STYLE = {
  background: "#1C1C21",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.88)",
  fontSize: 12,
  borderRadius: 6,
};

export function OverviewCharts({
  approvalsByType,
  coverageRatio,
  navPerToken,
  pendingApprovals,
}: OverviewChartsProps) {
  const coveragePct = (coverageRatio * 100).toFixed(1);
  const coverageOk = coverageRatio >= 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Approvals by type bar chart */}
      <div className="space-y-2">
        <p className="text-xs text-white/40 uppercase tracking-widest">
          Approvals by Type
        </p>
        {approvalsByType.length === 0 ? (
          <p className="text-sm text-white/30 py-8 text-center">No approval data</p>
        ) : (
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={approvalsByType.map((d) => ({
                  ...d,
                  label: TYPE_SHORT[d.type] ?? d.type,
                }))}
                margin={{ top: 4, right: 4, left: -20, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar
                  dataKey="count"
                  fill="#C9A84C"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Coverage / NAV snapshot */}
      <div className="space-y-2">
        <p className="text-xs text-white/40 uppercase tracking-widest">
          Reserve Coverage Snapshot
        </p>
        <div className="flex flex-col items-center justify-center h-44 gap-3">
          <div
            className={`text-5xl font-semibold tabular-nums ${
              coverageOk ? "text-gold" : "text-red-400"
            }`}
          >
            {coveragePct}%
          </div>
          <div className="text-xs text-white/40">Reserve Coverage Ratio</div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="text-white/80 font-medium">
                ${navPerToken.toFixed(4)}
              </div>
              <div className="text-xs text-white/40">NAV / Token</div>
            </div>
            <div className="text-center">
              <div
                className={`font-medium ${
                  pendingApprovals > 0 ? "text-yellow-400" : "text-white/80"
                }`}
              >
                {pendingApprovals}
              </div>
              <div className="text-xs text-white/40">Pending Approvals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
