"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ink mail TaskRows: live status for a batch of sending jobs. Rows enter in
// turn, a ring spinner marks the job in progress, one job fails with a retry
// and then resolves, and every row expands to its detail lines.
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

/** A hairline ring with the step number; while active, a quarter arc turns on it. */
function SpinnerRing({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  return (
    <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("absolute inset-0 size-full", active && "motion-safe:animate-spin")}
      >
        <circle cx="12" cy="12" r="11" stroke="var(--line-strong)" strokeWidth="1.5" />
        {active && (
          <path d="M12 1a11 11 0 0 1 11 11" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
      <span className="relative font-mono text-[0.625rem] font-medium tabular-nums text-foreground">{children}</span>
    </span>
  )
}

/** A filled status disc: off-white with a black check, or red with a cross. */
function Badge({ tone, children }: { tone: "fail" | "ok"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full",
        tone === "fail" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground",
      )}
      style={{ animation: "ink-pop-in 200ms ease-out both" }}
    >
      {children}
    </span>
  )
}

const XIcon = <Icon icon="ph:x" className="size-3" aria-hidden="true" />
const CheckIcon = <Icon icon="ph:check" className="size-3" aria-hidden="true" />
const RetryIcon = <Icon icon="ph:spinner-gap" className="size-3" aria-hidden="true" />

/** A status pill in the delivery language: green for done, red for failed. */
function StatusPill({ tone, spin, children }: { tone: "ok" | "fail"; spin?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1.5 rounded-full px-2 text-xs font-medium",
        tone === "ok" ? "bg-(--success-tint) text-(--success-text)" : "bg-(--destructive-tint) text-(--destructive-text)",
      )}
      style={{ animation: "ink-fade-in 150ms ease-out both" }}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", tone === "ok" ? "bg-success" : "bg-destructive")}
      />
      {children}
      {spin && <span className="flex motion-safe:animate-spin">{RetryIcon}</span>}
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
      label: "Verify sending domain",
      amount: "3 records",
      pill: <StatusPill tone="ok">Done</StatusPill>,
      details: [
        { label: "SPF record found", meta: "pass" },
        { label: "DKIM signature checked", meta: "pass" },
      ],
    },
    {
      key: "render",
      badge: <SpinnerRing active>2</SpinnerRing>,
      label: "Render receipt template",
      amount: "1,204 emails",
      pill: null,
      details: [
        { label: "Merging customer fields", meta: "812/1,204" },
        { label: "Inlining styles", meta: "queued" },
      ],
    },
    {
      key: "send",
      badge:
        row2 === "pending" ? (
          <SpinnerRing>3</SpinnerRing>
        ) : row2 === "failed" ? (
          <Badge tone="fail">{XIcon}</Badge>
        ) : (
          <Badge tone="ok">{CheckIcon}</Badge>
        ),
      label: "Send the batch",
      amount: "2 webhooks",
      pill:
        row2 === "failed" ? (
          <StatusPill tone="fail" spin>Failed</StatusPill>
        ) : row2 === "done" ? (
          <StatusPill tone="ok">Done</StatusPill>
        ) : null,
      details: [
        { label: "email.delivered webhook", meta: "200" },
        { label: "email.bounced webhook", meta: "200" },
      ],
    },
  ]

  const list = variant === "List"
  return (
    <div
      className={cn(
        "flex w-full max-w-[27.5rem] flex-col",
        list ? "gap-0 self-start overflow-hidden rounded-lg border border-border bg-card" : "min-h-[12.25rem] gap-2",
        className,
      )}
      {...props}
    >
      {rows.map((row, i) => {
        const open = manualOpen[row.key] ?? (row.key === "render" && tick === 2)
        return (
          <div
            key={row.key}
            className={cn(
              "self-stretch overflow-hidden",
              list ? "border-b border-border last:border-0" : "rounded-lg border border-border bg-card",
            )}
            style={{ animation: `ink-fade-up 250ms ease-out ${i * 80}ms both` }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className="flex h-11 w-full items-center gap-2.5 px-3 text-left outline-none transition-colors duration-fast ease-out hover:bg-secondary focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{row.badge}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{row.label}</span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{row.amount}</span>
              {row.pill}
              <Icon
                icon="ph:caret-down"
                aria-hidden="true"
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-out",
                  open && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-fast ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="mb-3 grid grid-cols-[1.5rem_1fr] gap-2.5 px-3">
                  <span aria-hidden="true" className="mx-auto h-full w-0.25 bg-border" />
                  <div className="flex flex-col gap-1.5">
                    {row.details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between gap-3">
                        <span className="text-xs text-(--foreground-secondary)">{d.label}</span>
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
      <style>{`
        @keyframes ink-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ink-fade-up { from { opacity: 0; transform: translateY(0.25rem); } to { opacity: 1; transform: none; } }
        @keyframes ink-pop-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
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

function TaskRow({ title, index, meta, status = "pending", className, children, ...props }: TaskRowProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 rounded-lg border border-border bg-card px-3 py-2.5", className)} {...props}>
      <div className="flex items-center gap-2.5">
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
        {meta && <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{meta}</span>}
        {status === "completed" && <StatusPill tone="ok">Done</StatusPill>}
        {status === "failed" && <StatusPill tone="fail">Failed</StatusPill>}
      </div>
      {children && <div className="flex flex-col gap-1 pl-8">{children}</div>}
    </div>
  )
}

interface TaskSubRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  meta?: string
}

function TaskSubRow({ title, meta, className, ...props }: TaskSubRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2 text-xs text-(--foreground-secondary)", className)} {...props}>
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {meta && <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">{meta}</span>}
    </div>
  )
}

export { TaskRows, TaskRow, TaskSubRow }
