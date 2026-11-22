"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, copperRim, creamBevel, wellInset } from "./_shared"

// TaskRows: live agent task status as rows. Rows enter in turn, a numbered
// well turns a glow arc while a task runs, one row fails with a retry pill
// and then resolves, and every row expands to its detail steps.
//
// Usage:
//   <TaskRows />
//   <TaskRows variant="List" />

const TICKS = [600, 900, 2400, 1400, 2400, 600]

/** Advances a tick once per interval, then rests on the last one. */
function useTick(intervals: number[]) {
  const [tick, setTick] = React.useState(0)
  React.useEffect(() => {
    if (tick >= intervals.length - 1) return
    const t = setTimeout(() => setTick((x) => x + 1), intervals[tick])
    return () => clearTimeout(t)
  }, [tick, intervals])
  return tick
}

/** A numbered step in a recessed well; while active, a glow arc turns around it. */
function SpinnerRing({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  return (
    <span className={cn(wellInset, "relative inline-flex size-6 shrink-0 items-center justify-center rounded-full")}>
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-glow motion-reduce:animate-none"
        />
      )}
      <span className="relative text-[0.6875rem] font-semibold tabular-nums text-foreground">{children}</span>
    </span>
  )
}

/** Done is the primary's cream inside a copper rim; failed is a red bevel. */
function Badge({ tone, children }: { tone: "fail" | "ok"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 animate-in zoom-in-75 fade-in items-center justify-center rounded-full duration-slow",
        tone === "fail"
          ? "bg-(image:--fill-destructive) text-destructive-foreground shadow-(--bevel-raised)"
          : cn(creamBevel, copperRim),
      )}
    >
      {children}
    </span>
  )
}

const XIcon = <Icon icon="ph:x-bold" className="size-3" aria-hidden="true" />
const CheckIcon = <Icon icon="ph:check-bold" className="size-3" aria-hidden="true" />

/** A status pill washed in its own hue. */
function StatusPill({ tone, spin, children }: { tone: "ok" | "fail"; spin?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 animate-in fade-in items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold duration-base",
        tone === "ok" ? "bg-glow/15 text-primary-text" : "bg-destructive/12 text-destructive",
      )}
    >
      {children}
      {spin && (
        <Icon icon="ph:arrow-clockwise" className="size-3 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      )}
    </span>
  )
}

interface TaskRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "Capsules" (default) renders separate rows; "List" renders one card. */
  variant?: "Capsules" | "List"
}

/**
 * Burnished TaskRows: each task is an umber slab (or a row in one slab for
 * the List variant). Running steps turn a glow arc in a recessed well;
 * finished steps turn cream inside a copper rim.
 */
function TaskRows({ variant = "Capsules", className, ...props }: TaskRowsProps) {
  const tick = useTick(TICKS)
  const [manualOpen, setManualOpen] = React.useState<{ [key: string]: boolean }>({})
  const row2: "pending" | "failed" | "done" = tick < 3 ? "pending" : tick === 3 ? "failed" : "done"

  const rows = [
    {
      key: "verify",
      badge: <Badge tone="ok">{CheckIcon}</Badge>,
      label: "Validated the OpenAPI spec",
      amount: "38 routes",
      pill: <StatusPill tone="ok">Completed</StatusPill>,
      details: [
        { label: "Checked request schemas", meta: "38/38" },
        { label: "Missing examples", meta: "0" },
      ],
    },
    {
      key: "index",
      badge: <SpinnerRing active>2</SpinnerRing>,
      label: "Generate endpoint pages",
      amount: "9 tags",
      pill: null,
      details: [
        { label: "Reading openapi.yaml", meta: "1 file" },
        { label: "Writing reference pages", meta: "68%" },
      ],
    },
    {
      key: "draft",
      badge:
        row2 === "pending" ? (
          <SpinnerRing>3</SpinnerRing>
        ) : row2 === "failed" ? (
          <Badge tone="fail">{XIcon}</Badge>
        ) : (
          <Badge tone="ok">{CheckIcon}</Badge>
        ),
      label: "Publish the changelog",
      amount: "2 entries",
      pill:
        row2 === "failed" ? (
          <StatusPill tone="fail" spin>Failed</StatusPill>
        ) : row2 === "done" ? (
          <StatusPill tone="ok">Completed</StatusPill>
        ) : null,
      details: [
        { label: "v2.4 release notes", meta: "draft" },
        { label: "Deprecation notice", meta: "draft" },
      ],
    },
  ]

  const list = variant === "List"
  return (
    <div
      className={cn(
        "flex w-full max-w-[27.5rem] flex-col",
        list ? cn(cardSlab, "gap-0 self-start overflow-hidden rounded-2xl") : "min-h-[12.75rem] gap-2.5",
        className,
      )}
      {...props}
    >
      {rows.map((row, i) => {
        const open = manualOpen[row.key] ?? (row.key === "index" && tick === 2)
        return (
          <div
            key={row.key}
            className={cn(
              "animate-in fade-in slide-in-from-bottom-1 self-stretch overflow-hidden duration-slow",
              list ? "border-b border-border last:border-0" : cn(cardSlab, "rounded-xl"),
            )}
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className={cn(
                "flex h-12 w-full items-center gap-2.5 px-3.5 text-left outline-none transition-colors duration-fast",
                "focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring",
                "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/50",
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{row.badge}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{row.label}</span>
              <span className="text-[0.8125rem] text-muted-foreground tabular-nums">{row.amount}</span>
              {row.pill}
              <Icon
                icon="ph:caret-down"
                className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-base", open && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out)",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="mb-3 grid grid-cols-[1.5rem_1fr] gap-2.5 px-3.5">
                  <span aria-hidden="true" className="mx-auto h-full w-0.5 rounded-full bg-border" />
                  <div className="flex flex-col gap-1.5">
                    {row.details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between">
                        <span className="text-[0.8125rem] text-muted-foreground">{d.label}</span>
                        <span className="font-mono text-xs tracking-normal text-muted-foreground tabular-nums">{d.meta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Standalone parts, kept for the showcase bundle.
interface TaskRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  index?: number
  meta?: string
  status?: "pending" | "running" | "completed" | "failed"
}

/** The badge for a standalone row's status. */
function StatusBadge({ status, index }: { status: TaskRowProps["status"]; index?: number }) {
  if (status === "running") return <SpinnerRing active>{index}</SpinnerRing>
  if (status === "completed") return <Badge tone="ok">{CheckIcon}</Badge>
  if (status === "failed") return <Badge tone="fail">{XIcon}</Badge>
  return <SpinnerRing>{index}</SpinnerRing>
}

/** Burnished TaskRow: one task on its own umber slab. */
function TaskRow({ title, index, meta, status = "pending", className, children, ...props }: TaskRowProps) {
  return (
    <div className={cn(cardSlab, "flex flex-col gap-1.5 rounded-xl px-3.5 py-3", className)} {...props}>
      <div className="flex items-center gap-2.5">
        <StatusBadge status={status} index={index} />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{title}</span>
        {meta && <span className="shrink-0 text-[0.8125rem] text-muted-foreground tabular-nums">{meta}</span>}
        {status === "completed" && <StatusPill tone="ok">Completed</StatusPill>}
        {status === "failed" && <StatusPill tone="fail">Failed</StatusPill>}
      </div>
      {children && <div className="flex flex-col gap-1 pl-8.5">{children}</div>}
    </div>
  )
}

interface TaskSubRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  meta?: string
}

/** Burnished TaskSubRow: one muted detail line under a task. */
function TaskSubRow({ title, meta, className, ...props }: TaskSubRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2 text-[0.8125rem] text-muted-foreground", className)} {...props}>
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {meta && <span className="shrink-0 font-mono text-xs tracking-normal text-muted-foreground tabular-nums">{meta}</span>}
    </div>
  )
}

export { TaskRows, TaskRow, TaskSubRow }
