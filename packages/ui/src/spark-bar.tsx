import React from "react";
import { cn } from "./utils";

interface SparkBarProps {
  data: number[];
  color?: string;
  className?: string;
}

export function SparkBar({ data, color = "bg-gold/60", className }: SparkBarProps) {
  if (data.length === 0) return null;
  const max = Math.max(...data, 1);

  return (
    <div className={cn("flex items-end gap-0.5 h-10", className)}>
      {data.map((v, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-sm", color)}
          style={{ height: `${(v / max) * 100}%`, minHeight: "2px" }}
        />
      ))}
    </div>
  );
}
