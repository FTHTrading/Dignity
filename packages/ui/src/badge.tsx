import React from "react";
import { cn } from "./utils";

type BadgeVariant = "gold" | "green" | "red" | "yellow" | "muted" | "blue";

const variantMap: Record<BadgeVariant, string> = {
  gold: "bg-gold/20 text-gold border border-gold/40",
  green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  red: "bg-red-500/15 text-red-400 border border-red-500/30",
  yellow: "bg-amber-400/15 text-amber-300 border border-amber-400/30",
  muted: "bg-white/5 text-white/50 border border-white/10",
  blue: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "muted", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
