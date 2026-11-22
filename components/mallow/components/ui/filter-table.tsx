"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { focusRing, pressScale, selectedOption, optionTrack } from "./_shared"

// FilterTable: status filters over a table of pages. Rows that a filter hides
// fold shut, so the list reflows instead of jumping.
//
// Usage:
//   <FilterTable />

type Status = "todo" | "progress" | "done"

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "Draft", dot: "var(--muted-foreground)", count: 2 },
  { key: "progress", label: "In review", dot: "var(--info)", count: 2 },
  { key: "done", label: "Published", dot: "var(--success)", count: 1 },
]

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Sign in", date: "Dec 03", status: "todo", owner: "reference" },
  { task: "Request limits", date: "Sep 22", status: "progress", owner: "guides" },
  { task: "Event hooks", date: "Jan 02", status: "todo", owner: "reference" },
  { task: "Paging", date: "Nov 08", status: "progress", owner: "guides" },
  { task: "First steps", date: "Apr 14", status: "done", owner: "start" },
]

/** Every status sits on the same quiet chip; only its text takes a hue. */
const PILLS: { [status in Status]: { label: string; className: string } } = {
  todo: { label: "Draft", className: "text-muted-foreground" },
  progress: { label: "In review", className: "text-info-text" },
  done: { label: "Published", className: "text-success-text" },
}

const COLUMNS = "grid-cols-12 [&>*:nth-child(1)]:col-span-4 [&>*:nth-child(2)]:col-span-2 [&>*:nth-child(3)]:col-span-3 [&>*:nth-child(4)]:col-span-3"

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS
  filters?: typeof DEFAULT_FILTERS
}

/**
 * Mallow FilterTable: filters on a lilac option track where the chosen one
 * takes the violet tint inside a violet ring, over a track of rows that fold
 * shut when a filter hides them.
 */
function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div
        role="group"
        aria-label="Filter by status"
        className={cn(optionTrack, "mb-3 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full p-1")}
      >
        {filters.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={cn(
                focusRing,
                pressScale,
                "flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm",
                active ? cn(selectedOption, "font-medium") : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.dot && <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: f.dot }} />}
              {f.label}
              <span className="text-xs tabular-nums text-muted-foreground">{f.count}</span>
            </button>
          )
        })}
      </div>

      <div
        aria-label="Scrollable page table"
        className={cn(optionTrack, focusRing, "overflow-x-auto rounded-2xl p-1")}
        role="region"
        tabIndex={0}
      >
        <div className="min-w-md" role="table" aria-label="Pages">
          <div role="row" className={cn("grid px-3.5 py-2.5 text-sm text-muted-foreground", COLUMNS)}>
            <span role="columnheader">Page</span>
            <span role="columnheader">Updated</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Section</span>
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter
            const pill = PILLS[row.status]
            return (
              <div
                key={row.task}
                aria-hidden={!shown}
                className="grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out) motion-reduce:transition-none"
                style={{ gridTemplateRows: shown ? "1fr" : "0fr", opacity: shown ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div
                    role="row"
                    className={cn(
                      "grid items-center rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-fast hover:bg-accent/40",
                      COLUMNS,
                    )}
                  >
                    <span role="cell" className="truncate font-medium text-foreground">{row.task}</span>
                    <span role="cell" className="tabular-nums text-muted-foreground">{row.date}</span>
                    <span role="cell">
                      <span className={cn("inline-flex h-6 items-center rounded-full bg-(--tag) px-2.5 text-xs", pill.className)}>
                        {pill.label}
                      </span>
                    </span>
                    <span role="cell" className="truncate font-mono text-xs text-muted-foreground">{row.owner}</span>
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
