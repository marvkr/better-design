"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { cardSlab, primaryFinish, softPanel, optionTrack } from "./_shared"

const TICKS = [600, 900, 2400, 1400, 2400, 600]

/** Advances a tick once per interval, then rests on the last one; reduced motion skips to the end. */
function useTick(intervals: number[]) {
  const reduceMotion = useReducedMotion() ?? false
  const last = intervals.length - 1
  const [tick, setTick] = React.useState(reduceMotion ? last : 0)
  React.useEffect(() => {
    if (reduceMotion) {
      setTick(last)
      return
    }
    if (tick >= last) return
    const t = setTimeout(() => setTick((x) => x + 1), intervals[tick])
    return () => clearTimeout(t)
  }, [tick, intervals, last, reduceMotion])
  return tick
}

/** A numbered step in a small lilac circle; while active, an ink arc turns around it. */
function SpinnerRing({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  return (
    <span className={cn(optionTrack, "relative inline-flex size-6 shrink-0 items-center justify-center rounded-full")}>
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground motion-reduce:animate-none"
        />
      )}
      <span className="relative text-xs font-medium tabular-nums text-foreground">{children}</span>
    </span>
  )
}

/** Done is the light primary finish; failed is a solid red disc. */
function Badge({ tone, children }: { tone: "fail" | "ok"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full animate-in zoom-in-75 fade-in duration-slow motion-reduce:animate-none",
        tone === "fail" ? "bg-destructive text-destructive-foreground shadow-xs" : primaryFinish,
      )}
    >
      {children}
    </span>
  )
}

const XIcon = <Icon icon="iconoir:xmark" className="size-3.5" aria-hidden="true" />
const CheckIcon = <Icon icon="iconoir:check" className="size-3.5" aria-hidden="true" />

/** A status chip: a quiet shade when done, a red tint when it failed. */
function StatusPill({ tone, spin, children }: { tone: "ok" | "fail"; spin?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs animate-in fade-in duration-base motion-reduce:animate-none",
        tone === "ok" ? "bg-(--tag) text-muted-foreground" : "bg-destructive/15 text-destructive-text",
      )}
    >
      {children}
      {spin && (
        <Icon icon="iconoir:refresh" className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      )}
    </span>
  )
}

interface TaskRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "Capsules" (default) renders separate rows; "List" renders one card. */
  variant?: "Capsules" | "List"
}

/**
 * Mallow TaskRows: live agent tasks as rows, each tinted violet on one option track or
 * divided on a single card, that expand to their steps.
 */
function TaskRows({ variant = "Capsules", className, ...props }: TaskRowsProps) {
  const tick = useTick(TICKS)
  const [manualOpen, setManualOpen] = React.useState<{ [key: string]: boolean }>({})
  const row2: "pending" | "failed" | "done" = tick < 3 ? "pending" : tick === 3 ? "failed" : "done"

  const rows = [
    {
      key: "verify",
      badge: <Badge tone="ok">{CheckIcon}</Badge>,
      label: "Checked the stock counts",
      amount: "214 items",
      pill: <StatusPill tone="ok">Done</StatusPill>,
      details: [
        { label: "Matched against the ledger", meta: "214/214" },
        { label: "Mismatches", meta: "0" },
      ],
    },
    {
      key: "index",
      badge: <SpinnerRing active>2</SpinnerRing>,
      label: "Build the weekly report",
      amount: "6 sections",
      pill: null,
      details: [
        { label: "Reading sales.csv", meta: "1 file" },
        { label: "Writing summary tables", meta: "68%" },
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
      label: "Send the report",
      amount: "3 people",
      pill:
        row2 === "failed" ? (
          <StatusPill tone="fail" spin>
            Retrying
          </StatusPill>
        ) : row2 === "done" ? (
          <StatusPill tone="ok">Done</StatusPill>
        ) : null,
      details: [
        { label: "Team inbox", meta: "queued" },
        { label: "Shared folder", meta: "queued" },
      ],
    },
  ]

  const list = variant === "List"
  return (
    <div
      data-slot="task-rows"
      aria-live="polite"
      className={cn(
        "flex w-full max-w-md flex-col",
        list ? cn(cardSlab, "self-start overflow-hidden rounded-3xl py-1") : cn(optionTrack, "gap-1 rounded-2xl p-1"),
        className,
      )}
      {...props}
    >
      {rows.map((row) => {
        const open = manualOpen[row.key] ?? (row.key === "index" && tick === 2)
        return (
          <div
            key={row.key}
            className={cn(
              "self-stretch overflow-hidden animate-in fade-in slide-in-from-bottom-1 duration-slow motion-reduce:animate-none",
              list ? "border-b border-border last:border-0" : cn(softPanel, "rounded-xl"),
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className={cn(
                "flex h-13 w-full items-center gap-3 px-4 text-left outline-none transition-colors duration-fast",
                "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                "pointer-fine:hover:bg-foreground/5",
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{row.badge}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{row.label}</span>
              <span className="text-sm tabular-nums text-muted-foreground">{row.amount}</span>
              {row.pill}
              <Icon
                icon="iconoir:nav-arrow-down"
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-base motion-reduce:transition-none",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            {open && (
              <div className="mb-3.5 flex gap-3 px-4 animate-in fade-in duration-base motion-reduce:animate-none">
                <span aria-hidden="true" className="flex w-6 shrink-0 justify-center">
                  <span className="w-0.5 rounded-full bg-border" />
                </span>
                <div className="flex flex-1 flex-col gap-1.5">
                  {row.details.map((d) => (
                    <div key={d.label} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-muted-foreground">{d.label}</span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">{d.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

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

/** Mallow TaskRow: one task in the violet tint and ring, with its status at the end. */
function TaskRow({ title, index, meta, status = "pending", className, children, ...props }: TaskRowProps) {
  return (
    <div
      data-slot="task-row"
      data-status={status}
      className={cn(softPanel, "flex flex-col gap-1.5 rounded-xl px-4 py-3", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <StatusBadge status={status} index={index} />
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{title}</span>
        {meta && <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{meta}</span>}
        {status === "completed" && <StatusPill tone="ok">Done</StatusPill>}
        {status === "failed" && <StatusPill tone="fail">Failed</StatusPill>}
      </div>
      {children && <div className="flex flex-col gap-1 pl-9">{children}</div>}
    </div>
  )
}

interface TaskSubRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  meta?: string
}

/** Mallow TaskSubRow: one muted step line under a task. */
function TaskSubRow({ title, meta, className, ...props }: TaskSubRowProps) {
  return (
    <div
      data-slot="task-sub-row"
      className={cn("flex items-center justify-between gap-2 text-sm text-muted-foreground", className)}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {meta && <span className="shrink-0 font-mono text-xs tabular-nums">{meta}</span>}
    </div>
  )
}

export { TaskRows, TaskRow, TaskSubRow }
