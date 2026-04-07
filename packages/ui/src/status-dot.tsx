import React from "react";
import { cn } from "./utils";

type Status = "online" | "offline" | "warning" | "unknown";

const colors: Record<Status, string> = {
  online: "bg-emerald-400",
  offline: "bg-red-500",
  warning: "bg-amber-400",
  unknown: "bg-white/30",
};

export function StatusDot({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn("inline-block rounded-full h-2 w-2", colors[status], className)} />
  );
}
