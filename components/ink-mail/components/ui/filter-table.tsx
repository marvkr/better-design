"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// FilterTable: delivery-status chips that filter a live table of sent email.
// Hidden rows collapse on a grid-rows transition, so the table reflows
// smoothly. Colour appears only as status: queued yellow, sending blue,
// delivered green.
//
// Usage:
//   <FilterTable />

type Status = "todo" | "progress" | "done"

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "Queued", dot: "bg-warning", count: 2 },
  { key: "progress", label: "Sending", dot: "bg-info", count: 2 },
  { key: "done", label: "Delivered", dot: "bg-success", count: 1 },
]

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Confirm your email address", date: "Dec 03", status: "todo", owner: "ada@example.com" },
  { task: "Your invoice is ready", date: "Sep 22", status: "progress", owner: "linus@example.com" },
  { task: "Reset your password", date: "Jan 02", status: "todo", owner: "grace@example.com" },
  { task: "Weekly usage report", date: "Nov 08", status: "progress", owner: "ken@example.com" },
  { task: "Welcome aboard", date: "Apr 14", status: "done", owner: "margaret@example.com" },
]

/** Each status pill pairs its tint with the matching readable ink and a solid dot. */
const PILLS = {
  todo: { label: "Queued", tint: "bg-(--warning-tint) text-(--warning-text)", dot: "bg-warning" },
  progress: { label: "Sending", tint: "bg-(--info-tint) text-(--info-text)", dot: "bg-info" },
  done: { label: "Delivered", tint: "bg-(--success-tint) text-(--success-text)", dot: "bg-success" },
} as const satisfies Record<Status, { label: string; tint: string; dot: string }>

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS
  filters?: typeof DEFAULT_FILTERS
}

function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  return (
    <div className={cn("w-full max-w-[30rem]", className)} {...props}>
      {/* filter chips on a tray */}
      <div className="mb-2 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border bg-secondary p-1 [scrollbar-width:none]">
        {filters.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium outline-none transition-colors duration-fast ease-out focus-visible:ring-3 focus-visible:ring-ring",
                active ? "bg-(--wash) text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.dot && <span aria-hidden="true" className={cn("size-1.5 rounded-full", f.dot)} />}
              {f.label}
              <span className="font-mono text-xs tabular-nums text-muted-foreground">{f.count}</span>
            </button>
          )
        })}
      </div>

      {/* table */}
      <div
        aria-label="Scrollable message table"
        className="overflow-x-auto rounded-lg border border-border bg-card outline-none [scrollbar-width:none] focus-visible:ring-3 focus-visible:ring-ring"
        role="region"
        tabIndex={0}
      >
        <div className="min-w-[30rem]">
          <div className="grid grid-cols-[1.4fr_0.55fr_0.85fr_1.1fr] gap-3 border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
            <span>Subject</span>
            <span>Date</span>
            <span>Status</span>
            <span>Recipient</span>
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter
            const pill = PILLS[row.status]
            return (
              <div
                key={row.task}
                aria-hidden={!shown || undefined}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
                  shown ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-[1.4fr_0.55fr_0.85fr_1.1fr] items-center gap-3 border-b border-border px-4 py-2.5 text-sm transition-colors duration-fast hover:bg-secondary">
                    <span className="truncate font-medium text-foreground">{row.task}</span>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{row.date}</span>
                    <span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                          pill.tint,
                        )}
                      >
                        <span aria-hidden="true" className={cn("size-1.5 rounded-full", pill.dot)} />
                        {pill.label}
                      </span>
                    </span>
                    <span className="truncate font-mono text-xs text-(--foreground-secondary)">{row.owner}</span>
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
