"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// FilterTable: status chips that directly filter live tabular data. Hidden
// rows collapse with the grid-rows trick, so the table reflows smoothly.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <FilterTable />

type Status = "todo" | "progress" | "done"

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "To do", dot: "var(--chart-4)", count: 2 },
  { key: "progress", label: "In Progress", dot: "var(--chart-1)", count: 2 },
  { key: "done", label: "Completed", dot: "var(--chart-2)", count: 1 },
]

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Restock mango sorbet", date: "Dec 03", status: "todo", owner: "Mango Moon Gelato" },
  { task: "Churn black sesame", date: "Sep 22", status: "progress", owner: "Kumo Creamery" },
  { task: "Print summer menu", date: "Jan 02", status: "todo", owner: "Coral Coast Sorbet" },
  { task: "Taste-test batch 42", date: "Nov 08", status: "progress", owner: "Maple Orbit" },
  { task: "Order waffle cones", date: "Apr 14", status: "done", owner: "Aurora Scoops" },
]

const PILLS: Record<Status, { label: string; color: string }> = {
  todo: { label: "To do", color: "var(--chart-4)" },
  progress: { label: "In Progress", color: "var(--chart-1)" },
  done: { label: "Completed", color: "var(--chart-2)" },
}

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS
  filters?: typeof DEFAULT_FILTERS
}

function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  return (
    <div className={cn("w-full max-w-[26.25rem]", className)} {...props}>
      {/* filter chips */}
      <div className="-mx-1 mb-1 flex items-center gap-1 overflow-x-auto px-1 py-1" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex h-[1.625rem] shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[0.75rem] font-medium transition-[background-color,box-shadow,color] duration-base",
                active
                  ? "border border-border bg-card text-foreground shadow-sm"
                  : "text-foreground/70 hover:bg-accent",
              )}
            >
              {f.dot && <span className="size-1.5 rounded-full" style={{ background: f.dot }} />}
              {f.label}
              <span
                className={cn(
                  "rounded-[0.25rem] px-1 text-[0.6563rem] tabular-nums",
                  active ? "bg-muted text-foreground/70" : "text-muted-foreground",
                )}
              >
                {f.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* table */}
      <div
        aria-label="Scrollable task table"
        className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm"
        role="region"
        tabIndex={0}
        style={{ scrollbarWidth: "none" }}
      >
        <div className="min-w-[26.25rem]">
          <div className="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] border-b border-border px-3 py-2 text-[0.7188rem] font-medium text-muted-foreground">
            <span>Task name</span>
            <span>Date</span>
            <span>Status</span>
            <span>Advisor</span>
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter
            const pill = PILLS[row.status]
            return (
              <div
                key={row.task}
                className="grid transition-[grid-template-rows,opacity] duration-slow"
                style={{
                  gridTemplateRows: shown ? "1fr" : "0fr",
                  opacity: shown ? 1 : 0,
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] items-center border-b border-border px-3 py-2 text-[0.75rem] transition-colors duration-fast last:border-0 hover:bg-accent/50">
                    <span className="truncate font-medium text-foreground">{row.task}</span>
                    <span className="text-foreground/70 tabular-nums">{row.date}</span>
                    <span>
                      <span
                        className="inline-flex h-5 items-center rounded-[0.3125rem] px-1.5 text-[0.6875rem] font-medium"
                        style={{
                          color: pill.color,
                          background: `color-mix(in oklab, ${pill.color} 12%, transparent)`,
                        }}
                      >
                        {pill.label}
                      </span>
                    </span>
                    <span className="truncate text-foreground/70">{row.owner}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { FilterTable }
