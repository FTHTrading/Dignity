import React from "react";
import { cn } from "./utils";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  className,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium tracking-wider text-white/40 uppercase",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-white/30 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className={cn("px-4 py-3 text-white/80", col.className)}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
