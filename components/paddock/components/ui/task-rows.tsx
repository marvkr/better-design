"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, primaryFace } from "./_shared"

// TaskRows: live task status as rows. Rows enter in turn, a numbered ring
// draws a teal arc while its task runs, one row fails and then resolves,
// and every row expands to its detail steps.
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

/** The task ring: a grey circle round the step number, with a turning teal arc while it runs. */
function SpinnerRing({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  return (
    <span className="relative inline-flex size-6 shrink-0 items-center justify-center rounded-full ring-2 ring-inset ring-input">
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary motion-reduce:animate-none"
        />
      )}
      <span className="relative text-xs font-semibold tabular-nums text-foreground">{children}</span>
    </span>
  )
}

/** Done is the teal fill of the primary button; failed is the red fill. */
function Badge({ tone, children }: { tone: "fail" | "ok"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 animate-in zoom-in-75 fade-in items-center justify-center rounded-full duration-slow",
        tone === "fail" ? "bg-destructive text-destructive-foreground shadow-(--card-ring)" : primaryFace,
      )}
    >
      {children}
    </span>
  )
}

const XIcon = <Icon icon="mingcute:close-line" className="size-3" aria-hidden="true" />
const CheckIcon = <Icon icon="mingcute:check-line" className="size-3" aria-hidden="true" />

/** A flat status chip tinted in its own hue, like a visit status tag. */
function StatusPill({ tone, spin, children }: { tone: "ok" | "fail"; spin?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-5.5 animate-in fade-in items-center gap-1 rounded-sm px-2 text-xs font-medium duration-base",
        tone === "ok" ? "bg-success/12 text-success-text" : "bg-destructive/10 text-destructive-text",
      )}
    >
      {children}
      {spin && (
        <Icon icon="mingcute:refresh-2-line" className="size-3 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      )}
    </span>
  )
}

interface TaskRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "Capsules" (default) renders separate rows; "List" renders one card. */
  variant?: "Capsules" | "List"
}

/**
 * Paddock TaskRows: each task is a white bordered card (or a row in one card
 * for the List variant). A running step draws a teal arc round its ring, and
 * a finished step turns to the teal fill with a check.
 */
function TaskRows({ variant = "Capsules", className, ...props }: TaskRowsProps) {
  const tick = useTick(TICKS)
  const [manualOpen, setManualOpen] = React.useState<{ [key: string]: boolean }>({})
  const row2: "pending" | "failed" | "done" = tick < 3 ? "pending" : tick === 3 ? "failed" : "done"

  const rows = [
    {
      key: "collect",
      badge: <Badge tone="ok">{CheckIcon}</Badge>,
      label: "Collected open tasks",
      amount: "42 tasks",
      pill: <StatusPill tone="ok">Done</StatusPill>,
      details: [
        { label: "Read four boards", meta: "4/4" },
        { label: "Tasks without an owner", meta: "3" },
      ],
    },
    {
      key: "plan",
      badge: <SpinnerRing active>2</SpinnerRing>,
      label: "Plan next week's sprint",
      amount: "12 picks",
      pill: null,
      details: [
        { label: "Weighing due dates", meta: "18 tasks" },
        { label: "Balancing the team load", meta: "60%" },
      ],
    },
    {
      key: "notify",
      badge:
        row2 === "pending" ? (
          <SpinnerRing>3</SpinnerRing>
        ) : row2 === "failed" ? (
          <Badge tone="fail">{XIcon}</Badge>
        ) : (
          <Badge tone="ok">{CheckIcon}</Badge>
        ),
      label: "Send the weekly digest",
      amount: "6 people",
      pill:
        row2 === "failed" ? (
          <StatusPill tone="fail" spin>Retrying</StatusPill>
        ) : row2 === "done" ? (
          <StatusPill tone="ok">Done</StatusPill>
        ) : null,
      details: [
        { label: "Digest for the design team", meta: "queued" },
        { label: "Digest for the build team", meta: "queued" },
      ],
    },
  ]

  const list = variant === "List"
  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col",
        list ? cn(cardSlab, "gap-0 self-start overflow-hidden rounded-xl") : "min-h-52 gap-2",
        className,
      )}
      {...props}
    >
      {rows.map((row, i) => {
        const open = manualOpen[row.key] ?? (row.key === "plan" && tick === 2)
        return (
          <div
            key={row.key}
            className={cn(
              "animate-in fade-in slide-in-from-bottom-1 self-stretch overflow-hidden duration-slow",
              list ? "border-b border-border last:border-0" : cn(cardSlab, "rounded-lg"),
            )}
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className={cn(
                "flex h-12 w-full items-center gap-3 px-3.5 text-left outline-none transition-colors duration-fast",
                "hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{row.badge}</span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm leading-tight font-medium text-foreground">{row.label}</span>
                <span className="truncate text-xs leading-tight tabular-nums text-muted-foreground">{row.amount}</span>
              </span>
              {row.pill}
              <Icon
                icon="mingcute:down-line"
                className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-base", open && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            <div
              className="grid transition-[grid-template-rows,opacity] duration-slow ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <div className="mb-3 flex gap-3 px-3.5">
                  <span aria-hidden="true" className="flex w-6 shrink-0 justify-center">
                    <span className="h-full w-0.5 rounded-xs bg-border" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    {row.details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between gap-2">
                        <span className="truncate text-[0.8125rem] text-muted-foreground">{d.label}</span>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">{d.meta}</span>
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

/** Paddock TaskRow: one task on its own white card. */
function TaskRow({ title, index, meta, status = "pending", className, children, ...props }: TaskRowProps) {
  return (
    <div className={cn(cardSlab, "flex flex-col gap-1.5 rounded-lg px-3.5 py-3", className)} {...props}>
      <div className="flex items-center gap-3">
        <StatusBadge status={status} index={index} />
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{title}</span>
        {meta && <span className="shrink-0 text-[0.8125rem] tabular-nums text-muted-foreground">{meta}</span>}
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

/** Paddock TaskSubRow: one muted detail line under a task. */
function TaskSubRow({ title, meta, className, ...props }: TaskSubRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2 text-[0.8125rem] text-muted-foreground", className)} {...props}>
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {meta && <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{meta}</span>}
    </div>
  )
}

export { TaskRows, TaskRow, TaskSubRow }
