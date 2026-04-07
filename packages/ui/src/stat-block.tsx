import React from "react";
import { cn } from "./utils";

interface StatBlockProps {
  label: string;
  value: string | number;
  sub?: string;
  variant?: "default" | "gold" | "green" | "red" | "yellow";
  className?: string;
}

const variantValue: Record<string, string> = {
  default: "text-white",
  gold: "text-gold",
  green: "text-emerald-400",
  red: "text-red-400",
  yellow: "text-amber-300",
};

export function StatBlock({ label, value, sub, variant = "default", className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</span>
      <span className={cn("text-2xl font-semibold tabular-nums", variantValue[variant])}>
        {value}
      </span>
      {sub && <span className="text-xs text-white/30">{sub}</span>}
    </div>
  );
}
