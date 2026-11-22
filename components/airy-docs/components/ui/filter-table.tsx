"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// FilterTable: status chips that filter a table of docs pages. Hidden rows
// collapse with the grid-rows technique, so the table reflows smoothly.
//
// Usage:
//   <FilterTable />

type Status = "todo" | "progress" | "done"

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "Draft", dot: "var(--warning)", count: 2 },
  { key: "progress", label: "In review", dot: "var(--info)", count: 2 },
  { key: "done", label: "Published", dot: "var(--primary)", count: 1 },
]

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Authentication", date: "Dec 03", status: "todo", owner: "api-reference" },
  { task: "Rate limits", date: "Sep 22", status: "progress", owner: "guides" },
  { task: "Webhooks", date: "Jan 02", status: "todo", owner: "api-reference" },
  { task: "Pagination", date: "Nov 08", status: "progress", owner: "guides" },
  { task: "Quickstart", date: "Apr 14", status: "done", owner: "get-started" },
]

// Each status keeps one colour for its dot, and a readable text token on its tint.
const PILLS: Record<Status, { label: string; tint: string; ink: string }> = {
  todo: { label: "Draft", tint: "var(--warning-tint)", ink: "var(--warning-text)" },
  progress: { label: "In review", tint: "var(--info-tint)", ink: "var(--info-text)" },
  done: { label: "Published", tint: "var(--success-tint)", ink: "var(--success-text)" },
}

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS
  filters?: typeof DEFAULT_FILTERS
}

function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  return (
    <div className={cn("w-full max-w-[26.25rem]", className)} {...props}>
      <div className="-mx-1 mb-2 flex items-center gap-1 overflow-x-auto px-1 py-1" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
                active
                  ? "border-(--primary-line) bg-(--primary-wash) text-(--primary-text)"
                  : "border-border bg-background text-(--foreground-secondary) hover:bg-secondary",
              )}
            >
              {f.dot && <span className="size-1.5 rounded-full" style={{ background: f.dot }} />}
              {f.label}
              <span className="text-[0.6875rem] tabular-nums text-muted-foreground">{f.count}</span>
            </button>
          )
        })}
      </div>

      <div
        aria-label="Scrollable page table"
        className="overflow-x-auto rounded-lg border border-border bg-card"
        role="region"
        tabIndex={0}
        style={{ scrollbarWidth: "none" }}
      >
        <div className="min-w-[26.25rem]">
          <div className="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] border-b border-border bg-secondary px-3 py-2 text-xs font-medium text-muted-foreground">
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
                className="grid transition-[grid-template-rows,opacity] duration-slow ease-out"
                style={{
                  gridTemplateRows: shown ? "1fr" : "0fr",
                  opacity: shown ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] items-center border-b border-border px-3 py-2 text-xs transition-colors duration-fast hover:bg-secondary">
                    <span className="truncate font-medium text-foreground">{row.task}</span>
                    <span className="tabular-nums text-muted-foreground">{row.date}</span>
                    <span>
                      <span
                        className="inline-flex h-5 items-center rounded-full px-2 text-[0.6875rem] font-medium"
                        style={{ color: pill.ink, background: pill.tint }}
                      >
                        {pill.label}
                      </span>
                    </span>
                    <span className="truncate font-mono text-[0.6875rem] text-muted-foreground">{row.owner}</span>
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
