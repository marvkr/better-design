"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ToolChips: an agent run as compact rows: tool calls with inline chips, then
// file-diff chips summarizing the edits. Hover a row to reveal its chevron;
// every row expands to show what the tool actually did.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <ToolChips />
//   <ToolChips summary="2 tool calls" rows={...} diffs={...} />

const STEP_MS = 700

const Icons: Record<string, React.ReactNode> = {
  think: <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />,
  write: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /></g>,
  run: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-5-6-5M12 19h8" /></g>,
  read: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></g>,
}

interface ToolDetailLine {
  text: string
  tone?: "add"
}

interface ToolRow {
  icon: string
  label: string
  chip: string
  mono?: boolean
  detailMono?: boolean
  detail: ToolDetailLine[]
}

interface ToolDiff {
  file: string
  add: number
  del: number
}

const DEFAULT_ROWS: ToolRow[] = [
  {
    icon: "think", label: "Thinking", chip: "Planning the churn schedule",
    detail: [
      { text: "Weekend demand carries pistachio, so it churns first." },
      { text: "Batch capacity leaves two evening freezer windows." },
    ],
  },
  {
    icon: "write", label: "Write 204 lines", chip: "ChurnSchedule.tsx", mono: true, detailMono: true,
    detail: [
      { text: "+ const windows = slots.filter((s) => s.temp <= -12)", tone: "add" },
      { text: "+ return schedule(windows, { hero: \"pistachio\" })", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Rebuild and verify", chip: "npm run freeze", mono: true, detailMono: true,
    detail: [{ text: "✓ built in 1.2s" }, { text: "✓ 34 checks passed" }],
  },
  {
    icon: "read", label: "Read image", chip: "flavor-chart.png", mono: true,
    detail: [
      { text: "1280 x 720, line chart, three summers." },
      { text: "Mint chip trends up 12% through July." },
    ],
  },
]

const DEFAULT_DIFFS: ToolDiff[] = [
  { file: "flavors.css", add: 13, del: 0 },
  { file: "ChurnSchedule.tsx", add: 74, del: 41 },
  { file: "menu.ts", add: 8, del: 2 },
]

interface ToolChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  summary?: string
  rows?: ToolRow[]
  diffs?: ToolDiff[]
}

function ToolChips({
  summary = "4 tool calls, 2 messages",
  rows = DEFAULT_ROWS,
  diffs = DEFAULT_DIFFS,
  className,
  ...props
}: ToolChipsProps) {
  const [step, setStep] = React.useState(0)
  const [open, setOpen] = React.useState(true)
  const [openRows, setOpenRows] = React.useState<Set<string>>(new Set())
  const total = rows.length + 1

  React.useEffect(() => {
    if (step >= total) return
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [step, total])

  const toggleRow = (label: string) =>
    setOpenRows((current) => {
      const next = new Set(current)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })

  return (
    <div className={cn("min-h-[12.5rem] w-full max-w-[20rem] pb-1", className)} {...props}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="-mx-1.5 flex w-fit items-center gap-1.5 rounded-md px-1.5 py-1 text-[0.7813rem] text-foreground/70 transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          className="transition-transform duration-base"
          style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className="tabular-nums">{summary}</span>
      </button>

      <div className="grid transition-[grid-template-rows,opacity] duration-slow" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
        <div className="-mx-1 overflow-hidden px-1.5 pb-1">
          <div className="mt-1.5 flex flex-col gap-1">
            {rows.slice(0, step).map((row) => {
              const rowOpen = openRows.has(row.label)
              return (
                <div key={row.label} style={{ animation: "bui-fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" }}>
                  <button
                    type="button"
                    aria-expanded={rowOpen}
                    onClick={() => toggleRow(row.label)}
                    className="group/row -mx-[0.1875rem] flex h-7 w-[calc(100%+0.375rem)] min-w-0 items-center gap-2 rounded-md px-[0.1875rem] text-left transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                      <svg
                        width="13" height="13" viewBox="0 0 24 24"
                        fill={row.icon === "think" ? "currentColor" : "none"} stroke="currentColor"
                        className={cn("transition-opacity duration-fast group-hover/row:opacity-0", rowOpen && "opacity-0")}
                        aria-hidden="true"
                      >
                        {Icons[row.icon] ?? Icons.run}
                      </svg>
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                        className={cn("absolute transition-[opacity,transform] duration-fast group-hover/row:opacity-100", rowOpen ? "opacity-100" : "opacity-0")}
                        style={{ transform: rowOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                    <span className="shrink-0 text-[0.7813rem] font-medium text-foreground">{row.label}</span>
                    <span
                      className={cn(
                        "inline-flex h-[1.375rem] min-w-0 flex-1 items-center truncate rounded-md border border-border bg-muted px-1.5 text-[0.7188rem] text-foreground/70 transition-colors duration-fast hover:bg-accent",
                        row.mono && "font-mono",
                      )}
                    >
                      {row.chip}
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-slow"
                    style={{ gridTemplateRows: rowOpen ? "1fr" : "0fr", opacity: rowOpen ? 1 : 0, transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-0.5 mb-1 ml-2 flex flex-col gap-0.5 border-l border-border py-0.5 pl-3.5">
                        {row.detail.map((line) => (
                          <span
                            key={line.text}
                            className={cn(
                              "truncate text-[0.7188rem] leading-[1.6]",
                              row.detailMono && "font-mono",
                              line.tone === "add" ? "text-[color:var(--chart-2)]" : "text-foreground/70",
                            )}
                          >
                            {line.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {step >= total && diffs.length > 0 && (
            <div className="mt-2.5 flex max-w-full flex-wrap gap-1.5 border-t border-border pt-2.5">
              {diffs.map((d, i) => (
                <span
                  key={d.file}
                  className="inline-flex h-7 max-w-full cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-2 font-mono text-[0.7188rem] text-foreground shadow-sm transition-colors duration-fast hover:bg-accent"
                  style={{ animation: `bui-pop-in 250ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms both` }}
                >
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 text-[color:var(--chart-2)] tabular-nums">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 text-destructive tabular-nums">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className="inline-flex h-7 items-center rounded-md px-1.5 font-mono text-[0.7188rem] text-muted-foreground underline decoration-transparent underline-offset-2 transition-colors duration-fast hover:text-foreground hover:decoration-current"
                style={{ animation: `bui-fade-in 300ms ease-out ${diffs.length * 80}ms both` }}
              >
                +2 more
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes bui-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes bui-pop-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

// Standalone chip kept for the showcase bundle contract.
interface ToolChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  kind?: "call" | "edit" | "read"
  meta?: string
  status?: "running" | "done" | "failed"
}

function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 font-mono text-[0.6875rem] text-foreground",
        status === "failed" && "border-destructive/40 text-destructive",
        className,
      )}
      {...props}
    >
      <span className={cn("text-muted-foreground", status === "running" && "animate-pulse text-primary", status === "failed" && "text-destructive")}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          {kind === "edit" ? Icons.write : kind === "read" ? Icons.read : Icons.run}
        </svg>
      </span>
      {label}
      {meta && <span className="text-muted-foreground">{meta}</span>}
    </span>
  )
}

export { ToolChips, ToolChip }
export type { ToolRow, ToolDiff, ToolDetailLine }
