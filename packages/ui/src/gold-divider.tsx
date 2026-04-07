import React from "react";
import { cn } from "./utils";

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}
