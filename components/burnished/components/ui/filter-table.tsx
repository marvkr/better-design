"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing, pressScale, raisedBevel, wellInset } from "./_shared"

// FilterTable: status chips that filter a table of pages. Hidden rows
// collapse with the grid-rows technique, so the table reflows smoothly.
//
// Usage:
//   <FilterTable />

type Status = "todo" | "progress" | "done"

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "Draft", dot: "var(--warning)", count: 2 },
  { key: "progress", label: "In review", dot: "var(--info)", count: 2 },
  { key: "done", label: "Published", dot: "var(--success)", count: 1 },
]

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Authentication", date: "Dec 03", status: "todo", owner: "api-reference" },
  { task: "Rate limits", date: "Sep 22", status: "progress", owner: "guides" },
  { task: "Webhooks", date: "Jan 02", status: "todo", owner: "api-reference" },
  { task: "Pagination", date: "Nov 08", status: "progress", owner: "guides" },
  { task: "Quickstart", date: "Apr 14", status: "done", owner: "get-started" },
]

/** Each status keeps one hue: a faint wash behind text of the same hue. */
const PILLS: { [status in Status]: { label: string; className: string } } = {
  todo: { label: "Draft", className: "bg-warning/12 text-warning" },
  progress: { label: "In review", className: "bg-info/12 text-info" },
  done: { label: "Published", className: "bg-success/12 text-success" },
}

const COLUMNS = "grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr]"

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS
  filters?: typeof DEFAULT_FILTERS
}

/**
 * Burnished FilterTable: the filters sit in a recessed well track, and the
 * chosen one rises as a graphite bevel pill. The table below is an umber
 * slab whose rows fold shut when filtered out.
 */
function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  return (
    <div className={cn("w-full max-w-[26.25rem]", className)} {...props}>
      <div
        className={cn(
          wellInset,
          "mb-3 flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-full p-1 [scrollbar-width:none]",
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
                pressScale,
                "flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-semibold",
                active
                  ? raisedBevel
                  : "text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
              )}
            >
              {f.dot && (
                <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: f.dot }} />
              )}
              {f.label}
              <span className="text-[0.6875rem] font-medium tabular-nums text-muted-foreground">{f.count}</span>
            </button>
          )
        })}
      </div>

      <div
        aria-label="Scrollable page table"
        className={cn(cardSlab, focusRing, "overflow-x-auto rounded-2xl [scrollbar-width:none]")}
        role="region"
        tabIndex={0}
      >
        <div className="min-w-[26.25rem]">
          <div
            className={cn(
              "grid border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground",
              COLUMNS,
            )}
          >
            <span>Page</span>
            <span>Updated</span>
            <span>Status</span>
            <span>Section</span>
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter
            const pill = PILLS[row.status]
            return (
              <div
                key={row.task}
                className="grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out)"
                style={{
                  gridTemplateRows: shown ? "1fr" : "0fr",
                  opacity: shown ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "grid items-center border-b border-border px-4 py-2.5 text-xs transition-colors duration-fast [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/60",
                      COLUMNS,
                    )}
                  >
                    <span className="truncate font-semibold text-foreground">{row.task}</span>
                    <span className="tabular-nums text-muted-foreground">{row.date}</span>
                    <span>
                      <span
                        className={cn(
                          "inline-flex h-5.5 items-center rounded-full px-2 text-[0.6875rem] font-semibold",
                          pill.className,
                        )}
                      >
                        {pill.label}
                      </span>
                    </span>
                    <span className="truncate font-mono text-[0.6875rem] tracking-normal text-muted-foreground">
                      {row.owner}
                    </span>
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
