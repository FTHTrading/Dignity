import React from "react";
import { cn } from "./utils";

interface CoverageGaugeProps {
  ratio: number; // e.g. 1.04 = 104%
  className?: string;
}

export function CoverageGauge({ ratio, className }: CoverageGaugeProps) {
  const pct = Math.min(ratio * 100, 200);
  const isHealthy = ratio >= 1.0;
  const color = ratio >= 1.1 ? "bg-emerald-400" : ratio >= 1.0 ? "bg-gold" : "bg-red-500";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold tabular-nums text-white">
          {(ratio * 100).toFixed(1)}%
        </span>
        <span className={cn("text-xs font-medium", isHealthy ? "text-emerald-400" : "text-red-400")}>
          {isHealthy ? "Fully Covered" : "Under-Covered"}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/[0.08] overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${(pct / 200) * 100}%` }}
        />
      </div>
      <p className="text-xs text-white/30">Coverage target: ≥100% reserve backing</p>
    </div>
  );
}
