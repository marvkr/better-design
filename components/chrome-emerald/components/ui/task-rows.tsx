"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// TaskRows: live agent task status. Rows enter staggered, a ring spinner
// counts progress, a row fails with a retry badge and then resolves, and
// every row expands to its detail steps.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
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

function SpinnerRing({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  const size = 24
  const stroke = 2
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className={cn("absolute inset-0", active && "animate-spin")} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        {active && (
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="var(--muted-foreground)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${c * 0.28} ${c * 0.72}`}
          />
        )}
      </svg>
      <span className="relative text-[0.6563rem] font-semibold tabular-nums text-foreground">{children}</span>
    </span>
  )
}

function Badge({ tone, children }: { tone: "fail" | "ok"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-[1.375rem] shrink-0 items-center justify-center rounded-full",
        tone === "fail" ? "bg-destructive text-background" : "bg-primary text-primary-foreground",
      )}
      style={{ animation: "bui-pop-in 300ms cubic-bezier(0.23,1,0.32,1) both" }}
    >
      {children}
    </span>
  )
}

const XIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
)
const CheckIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
)
const RetryIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg>
)

function StatusPill({ tone, spin, children }: { tone: "ok" | "fail"; spin?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-[1.375rem] items-center gap-1.5 rounded-full px-2 text-[0.7188rem] font-medium",
        tone === "ok" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive",
      )}
      style={{ animation: "bui-fade-in 200ms ease-out both" }}
    >
      {children}
      {spin && <span className="flex animate-spin">{RetryIcon}</span>}
    </span>
  )
}

interface TaskRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "Capsules" (default) renders floating rows; "List" renders one card. */
  variant?: "Capsules" | "List"
}

function TaskRows({ variant = "Capsules", className, ...props }: TaskRowsProps) {
  const tick = useTick(TICKS)
  const [manualOpen, setManualOpen] = React.useState<Record<string, boolean>>({})
  const row2: "pending" | "failed" | "done" = tick < 3 ? "pending" : tick === 3 ? "failed" : "done"

  const rows = [
    {
      key: "verify",
      badge: <Badge tone="ok">{CheckIcon}</Badge>,
      label: "Verified vendor records",
      amount: "12 suppliers",
      pill: <StatusPill tone="ok">Completed</StatusPill>,
      details: [
        { label: "Matched tax and contact IDs", meta: "12/12" },
        { label: "Flagged stale records", meta: "0" },
      ],
    },
    {
      key: "index",
      badge: <SpinnerRing active>2</SpinnerRing>,
      label: "Build reorder task list",
      amount: "7 SKUs",
      pill: null,
      details: [
        { label: "Reading POS export", meta: "3 files" },
        { label: "Scoring stockout risk", meta: "68%" },
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
      label: "Draft supplier emails",
      amount: "2 messages",
      pill:
        row2 === "failed" ? (
          <StatusPill tone="fail" spin>Failed</StatusPill>
        ) : row2 === "done" ? (
          <StatusPill tone="ok">Completed</StatusPill>
        ) : null,
      details: [
        { label: "Cone supplier follow-up", meta: "draft" },
        { label: "Pistachio reorder note", meta: "draft" },
      ],
    },
  ]

  const list = variant === "List"
  return (
    <div
      className={cn(
        "flex w-full max-w-[27.5rem] flex-col",
        list ? "gap-0 self-start overflow-hidden rounded-xl border border-border bg-card shadow-sm" : "min-h-[12.25rem] gap-2",
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
              "self-stretch overflow-hidden transition-[border-radius] duration-slow",
              list ? "border-b border-border last:border-0" : "border border-border bg-card shadow-sm",
            )}
            style={{
              borderRadius: list ? 0 : open ? 14 : 22,
              animation: `bui-fade-up 450ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms both`,
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className="flex h-11 w-full items-center gap-2.5 px-2.5 text-left transition-colors duration-fast hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{row.badge}</span>
              <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-foreground">{row.label}</span>
              <span className="text-[0.7813rem] text-foreground/70 tabular-nums">{row.amount}</span>
              {row.pill}
              <span aria-hidden="true" className="-ml-2 flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground">
                <svg
                  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-slow"
                  style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows,opacity] duration-slow"
              style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0, transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
            >
              <div className="overflow-hidden">
                <div className="mb-2.5 grid grid-cols-[1.5rem_1fr] gap-2.5 px-2.5">
                  <span aria-hidden="true" className="mx-auto h-full w-px bg-border" />
                  <div className="flex flex-col gap-1.5">
                    {row.details.map((d, j) => (
                      <div
                        key={d.label}
                        className="flex items-center justify-between"
                        style={
                          open
                            ? { animation: `bui-fade-up 300ms cubic-bezier(0.23,1,0.32,1) ${120 + j * 100}ms both` }
                            : undefined
                        }
                      >
                        <span className="text-[0.75rem] text-foreground/70">{d.label}</span>
                        <span className="font-mono text-[0.7188rem] text-muted-foreground tabular-nums">{d.meta}</span>
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
        @keyframes bui-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes bui-pop-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
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
    <div className={cn("flex flex-col gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5", className)} {...props}>
      <div className="flex items-center gap-2">
        {status === "running" ? (
          <SpinnerRing active>{index}</SpinnerRing>
        ) : status === "completed" ? (
          <Badge tone="ok">{CheckIcon}</Badge>
        ) : status === "failed" ? (
          <Badge tone="fail">{XIcon}</Badge>
        ) : (
          <SpinnerRing>{index}</SpinnerRing>
        )}
        <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-foreground">{title}</span>
        {meta && <span className="shrink-0 text-[0.7813rem] text-foreground/70 tabular-nums">{meta}</span>}
        {status === "completed" && <StatusPill tone="ok">Completed</StatusPill>}
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
    <div className={cn("flex items-center justify-between gap-2 text-[0.75rem] text-foreground/70", className)} {...props}>
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {meta && <span className="shrink-0 font-mono text-[0.7188rem] text-muted-foreground tabular-nums">{meta}</span>}
    </div>
  )
}

export { TaskRows, TaskRow, TaskSubRow }
