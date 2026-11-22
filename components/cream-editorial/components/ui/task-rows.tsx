"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// TaskRows: an agent's task list as it runs. Rows arrive one after another
// on oat cards, a thin terracotta arc marks the task in progress, one row
// fails with a retry note and then resolves, and every row opens to show
// its detail lines in a quieter sans.
//
// Usage:
//   <TaskRows />
//   <TaskRows variant="List" />

const TICKS = [600, 900, 2400, 1400, 2400, 600]

function useTick(intervals: number[]) {
  const [tick, setTick] = React.useState(0)
  React.useEffect(() => {
    if (tick >= intervals.length - 1) return
    const t = setTimeout(() => setTick((x) => x + 1), intervals[tick])
    return () => clearTimeout(t)
  }, [tick, intervals])
  return tick
}

/** A numbered disc; while the task runs, a terracotta arc turns around it. */
function SpinnerRing({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  return (
    <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("absolute inset-0 size-full", active && "animate-spin motion-reduce:animate-none")}
      >
        <circle cx="12" cy="12" r="11" stroke="var(--line-strong)" strokeWidth="1.5" />
        {active && (
          <path d="M12 1a11 11 0 0 1 11 11" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
      <span className="relative text-[0.6875rem] font-medium tabular-nums text-(--foreground-secondary)">
        {children}
      </span>
    </span>
  )
}

/** A small tinted disc holding the result mark: green for done, red for failed. */
function Badge({ tone, children }: { tone: "fail" | "ok"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full animate-in fade-in zoom-in-90 duration-base ease-out",
        tone === "fail"
          ? "bg-(--destructive-tint) text-(--destructive-text)"
          : "bg-(--success-tint) text-(--success-text)",
      )}
    >
      {children}
    </span>
  )
}

const XIcon = <Icon icon="ph:x" className="size-3.5" aria-hidden="true" />
const CheckIcon = <Icon icon="ph:check" className="size-3.5" aria-hidden="true" />
const RetryIcon = <Icon icon="ph:spinner-gap" className="size-3" aria-hidden="true" />

/** The status note at the end of a row, as a soft tinted pill. */
function StatusPill({ tone, spin, children }: { tone: "ok" | "fail"; spin?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-5.5 shrink-0 items-center gap-1 rounded-full px-2 text-xs font-medium animate-in fade-in duration-base",
        tone === "ok"
          ? "bg-(--success-tint) text-(--success-text)"
          : "bg-(--destructive-tint) text-(--destructive-text)",
      )}
    >
      {children}
      {spin && <span className="flex animate-spin motion-reduce:animate-none">{RetryIcon}</span>}
    </span>
  )
}

interface TaskRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "Capsules" (default) renders floating rows; "List" renders one card. */
  variant?: "Capsules" | "List"
}

function TaskRows({ variant = "Capsules", className, ...props }: TaskRowsProps) {
  const tick = useTick(TICKS)
  const [manualOpen, setManualOpen] = React.useState<{ [key: string]: boolean }>({})
  const row2: "pending" | "failed" | "done" = tick < 3 ? "pending" : tick === 3 ? "failed" : "done"

  const rows = [
    {
      key: "verify",
      badge: <Badge tone="ok">{CheckIcon}</Badge>,
      label: "Checked the source list",
      amount: "12 sources",
      pill: <StatusPill tone="ok">Completed</StatusPill>,
      details: [
        { label: "Matched every citation", meta: "12/12" },
        { label: "Flagged broken links", meta: "0" },
      ],
    },
    {
      key: "index",
      badge: <SpinnerRing active>2</SpinnerRing>,
      label: "Outline the summary",
      amount: "4 sections",
      pill: null,
      details: [
        { label: "Reading the transcripts", meta: "3 files" },
        { label: "Grouping the themes", meta: "68%" },
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
      label: "Draft the reply",
      amount: "2 messages",
      pill:
        row2 === "failed" ? (
          <StatusPill tone="fail" spin>Failed</StatusPill>
        ) : row2 === "done" ? (
          <StatusPill tone="ok">Completed</StatusPill>
        ) : null,
      details: [
        { label: "Reply to the editor", meta: "draft" },
        { label: "Note for the reviewer", meta: "draft" },
      ],
    },
  ]

  const list = variant === "List"
  return (
    <div
      data-slot="task-rows"
      className={cn(
        "flex w-full max-w-[27.5rem] flex-col",
        list
          ? "gap-0 self-start overflow-hidden rounded-xl border border-border bg-card"
          : "min-h-[12.25rem] gap-2",
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
              "self-stretch overflow-hidden animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-slow ease-out motion-reduce:animate-none",
              list ? "border-b border-border last:border-0" : "rounded-xl border border-border bg-card",
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className="flex h-12 w-full items-center gap-3 px-3.5 text-left outline-none transition-colors duration-fast ease-out hover:bg-secondary/60 focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{row.badge}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{row.label}</span>
              <span className="shrink-0 text-[0.8125rem] text-muted-foreground tabular-nums">{row.amount}</span>
              {row.pill}
              <Icon
                icon="ph:caret-down"
                aria-hidden="true"
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-base ease-out",
                  open && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-base ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="mb-3 grid grid-cols-[1.5rem_1fr] gap-3 px-3.5">
                  <span aria-hidden="true" className="mx-auto h-full w-px bg-border" />
                  <div className="flex flex-col gap-1.5">
                    {row.details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between gap-3">
                        <span className="text-[0.8125rem] text-(--foreground-secondary)">{d.label}</span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">{d.meta}</span>
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

// Standalone parts kept for the showcase bundle contract.
interface TaskRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  index?: number
  meta?: string
  status?: "pending" | "running" | "completed" | "failed"
}

/** One task on its own oat card, with an optional list of sub-rows under it. */
function TaskRow({ title, index, meta, status = "pending", className, children, ...props }: TaskRowProps) {
  return (
    <div
      data-slot="task-row"
      className={cn("flex flex-col gap-2 rounded-xl border border-border bg-card px-3.5 py-3", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        {status === "running" ? (
          <SpinnerRing active>{index}</SpinnerRing>
        ) : status === "completed" ? (
          <Badge tone="ok">{CheckIcon}</Badge>
        ) : status === "failed" ? (
          <Badge tone="fail">{XIcon}</Badge>
        ) : (
          <SpinnerRing>{index}</SpinnerRing>
        )}
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{title}</span>
        {meta && <span className="shrink-0 text-[0.8125rem] text-muted-foreground tabular-nums">{meta}</span>}
        {status === "completed" && <StatusPill tone="ok">Completed</StatusPill>}
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

/** A detail line under a task: secondary ink, with a mono figure at the end. */
function TaskSubRow({ title, meta, className, ...props }: TaskSubRowProps) {
  return (
    <div
      data-slot="task-sub-row"
      className={cn("flex items-center justify-between gap-2 text-[0.8125rem] text-(--foreground-secondary)", className)}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {meta && <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">{meta}</span>}
    </div>
  )
}

export { TaskRows, TaskRow, TaskSubRow }
