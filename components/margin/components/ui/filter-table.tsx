"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

type Status = "todo" | "progress" | "done";

const DEFAULT_FILTERS: { key: "all" | Status; label: string; dot?: string; count: number }[] = [
  { key: "all", label: "All", count: 5 },
  { key: "todo", label: "Draft", dot: "bg-warning", count: 2 },
  { key: "progress", label: "In review", dot: "bg-info", count: 2 },
  { key: "done", label: "Shared", dot: "bg-success", count: 1 },
];

const DEFAULT_ROWS: { task: string; date: string; status: Status; owner: string }[] = [
  { task: "Weekly planning", date: "Nov 04", status: "todo", owner: "team" },
  { task: "Launch checklist", date: "Oct 21", status: "progress", owner: "projects" },
  { task: "Reading list", date: "Nov 12", status: "todo", owner: "personal" },
  { task: "Research summary", date: "Oct 30", status: "progress", owner: "projects" },
  { task: "Onboarding notes", date: "Sep 18", status: "done", owner: "team" },
];

/** Each status keeps one hue: a light tint behind text deep in that hue. */
const PILLS: { [status in Status]: { label: string; className: string } } = {
  todo: { label: "Draft", className: "bg-warning/15 text-warning-text" },
  progress: { label: "In review", className: "bg-info/12 text-info-text" },
  done: { label: "Shared", className: "bg-success/12 text-success-text" },
};

const COLUMNS = "grid-cols-[1.4fr_0.6fr_0.9fr_0.8fr]";

interface FilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: typeof DEFAULT_ROWS;
  filters?: typeof DEFAULT_FILTERS;
}

/**
 * Margin FilterTable: status filters in a paper field track, the chosen one a
 * paper tab, above a white sheet whose rows fold shut when filtered out.
 */
function FilterTable({ rows = DEFAULT_ROWS, filters = DEFAULT_FILTERS, className, ...props }: FilterTableProps) {
  const [filter, setFilter] = React.useState<"all" | Status>("all");

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div className="mb-3 flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-lg bg-(--field) p-0.5">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={cn(
                focusRing,
                "flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-sm transition duration-fast ease-(--ease-out)",
                active
                  ? "bg-card font-medium text-foreground shadow-sm"
                  : "text-muted-foreground pointer-fine:hover:text-foreground",
              )}
            >
              {f.dot && <span aria-hidden="true" className={cn("size-1.5 rounded-full", f.dot)} />}
              {f.label}
              <span className="text-xs tabular-nums text-muted-foreground">{f.count}</span>
            </button>
          );
        })}
      </div>

      <div
        aria-label="Scrollable notes table"
        className={cn(focusRing, "overflow-x-auto rounded-xl border border-border bg-card text-card-foreground")}
        role="region"
        tabIndex={0}
      >
        <div className="min-w-md">
          <div className={cn("grid h-8 items-center border-b border-border bg-muted px-3 text-xs font-medium text-muted-foreground", COLUMNS)}>
            <span>Note</span>
            <span>Edited</span>
            <span>Status</span>
            <span>Notebook</span>
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter;
            const pill = PILLS[row.status];
            return (
              <div
                key={row.task}
                aria-hidden={!shown}
                className={cn(
                  "grid transition-all duration-slow ease-(--ease-out)",
                  shown ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "grid h-10 items-center border-b border-border px-3 text-sm transition-colors duration-fast pointer-fine:hover:bg-accent/60",
                      COLUMNS,
                    )}
                  >
                    <span className="truncate font-medium text-foreground">{row.task}</span>
                    <span className="text-xs tabular-nums text-muted-foreground">{row.date}</span>
                    <span>
                      <span className={cn("inline-flex h-5 items-center rounded-sm px-1.5 text-xs font-medium", pill.className)}>
                        {pill.label}
                      </span>
                    </span>
                    <span className="truncate text-xs text-muted-foreground">{row.owner}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { FilterTable };
