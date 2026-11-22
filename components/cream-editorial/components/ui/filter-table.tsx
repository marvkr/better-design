"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Cream editorial FilterTable: oat status chips above an oat card table.
// A chip filters the rows in place; hidden rows fold away with the
// grid-rows trick, so the table closes its gaps smoothly.
//
// Usage:
//   <FilterTable />

type Status = "todo" | "progress" | "done"

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "To do", dot: "var(--chart-4)", count: 2 },
  { key: "progress", label: "In Progress", dot: "var(--chart-1)", count: 2 },
  { key: "done", label: "Completed", dot: "var(--chart-3)", count: 1 },
]

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Draft the launch essay", date: "Dec 03", status: "todo", owner: "Editorial desk" },
  { task: "Review model card", date: "Sep 22", status: "progress", owner: "Research" },
  { task: "Proof the pricing page", date: "Jan 02", status: "todo", owner: "Copy team" },
  { task: "Annotate eval results", date: "Nov 08", status: "progress", owner: "Evaluation" },
  { task: "Publish release notes", date: "Apr 14", status: "done", owner: "Product" },
]

// Each status pill is a faint tint with its readable ink.
const PILLS = {
  todo: { label: "To do", tint: "bg-(--warning-tint)", ink: "text-(--warning-text)" },
  progress: { label: "In Progress", tint: "bg-(--primary-wash)", ink: "text-(--primary-text)" },
  done: { label: "Completed", tint: "bg-(--success-tint)", ink: "text-(--success-text)" },
} as const satisfies Record<Status, { label: string; tint: string; ink: string }>

const COLUMNS = "grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr]"

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS
  filters?: typeof DEFAULT_FILTERS
}

function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  return (
    <div className={cn("w-full max-w-[28rem]", className)} {...props}>
      <div className="-mx-1 mb-2 flex items-center gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
        {filters.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium",
                "outline-none transition-colors duration-fast ease-out focus-visible:ring-3 focus-visible:ring-ring",
                active
                  ? "bg-muted text-foreground"
                  : "text-(--foreground-secondary) hover:bg-secondary hover:text-foreground",
              )}
            >
              {f.dot && <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: f.dot }} />}
              {f.label}
              <span className="tabular-nums text-muted-foreground">{f.count}</span>
            </button>
          )
        })}
      </div>

      <div
        aria-label="Scrollable task table"
        className="overflow-x-auto rounded-xl border border-border bg-card [scrollbar-width:none]"
        role="region"
        tabIndex={0}
      >
        <div className="min-w-[28rem]">
          <div className={cn(COLUMNS, "border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground")}>
            <span>Task</span>
            <span>Date</span>
            <span>Status</span>
            <span>Owner</span>
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter
            const pill = PILLS[row.status]
            return (
              <div
                key={row.task}
                aria-hidden={!shown || undefined}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-slow ease-out motion-reduce:transition-none",
                  shown ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className={cn(COLUMNS, "items-center border-b border-border px-4 py-2.5 text-[0.8125rem] transition-colors duration-fast hover:bg-secondary/60")}>
                    <span className="truncate font-medium text-foreground">{row.task}</span>
                    <span className="tabular-nums text-(--foreground-secondary)">{row.date}</span>
                    <span>
                      <span className={cn("inline-flex h-5 items-center rounded-full px-2 text-[0.6875rem] font-medium", pill.tint, pill.ink)}>
                        {pill.label}
                      </span>
                    </span>
                    <span className="truncate text-(--foreground-secondary)">{row.owner}</span>
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
