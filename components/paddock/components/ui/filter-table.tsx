"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing, wellInset } from "./_shared"

// FilterTable: stage filters over a list of projects. Hidden rows fold shut
// with the grid-rows technique, so the list reflows smoothly.
//
// Usage:
//   <FilterTable />

type Status = "todo" | "progress" | "done"

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "To do", dot: "bg-muted-foreground", count: 2 },
  { key: "progress", label: "In progress", dot: "bg-(--status-in-room)", count: 2 },
  { key: "done", label: "Done", dot: "bg-success", count: 1 },
]

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Invoice reminders", date: "Nov 14", status: "todo", owner: "Billing" },
  { task: "Team calendar sync", date: "Nov 02", status: "progress", owner: "Platform" },
  { task: "Export to spreadsheet", date: "Dec 01", status: "todo", owner: "Reports" },
  { task: "Guest access review", date: "Nov 09", status: "progress", owner: "Security" },
  { task: "New pricing table", date: "Oct 21", status: "done", owner: "Growth" },
]

/** Each stage is a flat chip; work in progress takes the violet in-room hue and done takes green. */
const PILLS: { [status in Status]: { label: string; className: string } } = {
  todo: { label: "To do", className: "bg-secondary text-secondary-foreground" },
  progress: { label: "In progress", className: "bg-(--status-in-room)/12 text-(--status-in-room-text)" },
  done: { label: "Done", className: "bg-success/12 text-success-text" },
}

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS
  filters?: typeof DEFAULT_FILTERS
}

/**
 * Paddock FilterTable: the stage filters sit in a recessed grey track, and
 * the chosen one rises as a white tab. The list below is a white bordered
 * card whose rows fold shut when filtered out.
 */
function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div
        className={cn(
          wellInset,
          "mb-3 flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-md p-1",
        )}
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
                "flex h-8 shrink-0 items-center gap-1.5 rounded-sm px-3 text-[0.8125rem] transition-[color,background-color,box-shadow] duration-base ease-out",
                active
                  ? "bg-card font-medium text-foreground shadow-(--segment-lift)"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.dot && <span aria-hidden="true" className={cn("size-1.5 rounded-full", f.dot)} />}
              {f.label}
              <span className="text-xs tabular-nums text-muted-foreground">{f.count}</span>
            </button>
          )
        })}
      </div>

      <div
        aria-label="Scrollable project list"
        className={cn(cardSlab, focusRing, "overflow-x-auto rounded-xl")}
        role="region"
        tabIndex={0}
      >
        <div className="min-w-sm">
          <div className="grid grid-cols-12 gap-2 border-b border-border bg-muted px-4 py-2.5 text-xs font-medium text-muted-foreground">
            <span className="col-span-5">Project</span>
            <span className="col-span-2">Due</span>
            <span className="col-span-3">Stage</span>
            <span className="col-span-2">Team</span>
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter
            const pill = PILLS[row.status]
            return (
              <div
                key={row.task}
                className="grid transition-[grid-template-rows,opacity] duration-slow ease-out"
                style={{
                  gridTemplateRows: shown ? "1fr" : "0fr",
                  opacity: shown ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-12 items-center gap-2 border-b border-border px-4 py-2.5 text-[0.8125rem] transition-colors duration-fast hover:bg-accent/60">
                    <span className="col-span-5 truncate font-medium text-foreground">{row.task}</span>
                    <span className="col-span-2 tabular-nums text-muted-foreground">{row.date}</span>
                    <span className="col-span-3">
                      <span
                        className={cn(
                          "inline-flex h-5.5 items-center rounded-sm px-2 text-xs font-medium",
                          pill.className,
                        )}
                      >
                        {pill.label}
                      </span>
                    </span>
                    <span className="col-span-2 truncate text-muted-foreground">{row.owner}</span>
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
