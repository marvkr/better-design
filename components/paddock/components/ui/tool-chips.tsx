"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing, quietChip, raisedSurface } from "./_shared"

// ToolChips: an agent run as compact rows: each tool call names its target
// in a grey tag chip, then white file chips sum up the edits. Hover a row
// to reveal its caret; every row expands to show what the tool did.
//
// Usage:
//   <ToolChips />
//   <ToolChips summary="2 tool calls" rows={...} diffs={...} />

const STEP_MS = 700

const ICONS: { [kind: string]: string } = {
  think: "mingcute:chat-3-line",
  write: "mingcute:edit-2-line",
  run: "mingcute:terminal-box-line",
  read: "mingcute:file-line",
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
    icon: "think", label: "Thinking", chip: "Planning the stage rules",
    detail: [
      { text: "Cards move to review when every task is done." },
      { text: "One rule per stage keeps the schedule predictable." },
    ],
  },
  {
    icon: "write", label: "Write 54 lines", chip: "stage-rules.ts", mono: true, detailMono: true,
    detail: [
      { text: "+ export const moveWhenDone = true", tone: "add" },
      { text: "+ export const reviewLimit = 5", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Run checks", chip: "schedule test", mono: true, detailMono: true,
    detail: [{ text: "✓ 48 checks passed" }, { text: "✓ no stage over its limit" }],
  },
  {
    icon: "read", label: "Read schedule", chip: "schedule.json", mono: true,
    detail: [
      { text: "12 projects across 4 stages." },
      { text: "3 cards have no owner." },
    ],
  },
]

const DEFAULT_DIFFS: ToolDiff[] = [
  { file: "stage-rules.ts", add: 54, del: 0 },
  { file: "schedule-view.tsx", add: 18, del: 22 },
  { file: "settings.json", add: 2, del: 1 },
]

/** The grey wash a quiet row takes on hover. */
const rowHover = "transition-colors duration-fast hover:bg-accent"

interface ToolChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  summary?: string
  rows?: ToolRow[]
  diffs?: ToolDiff[]
}

/**
 * Paddock ToolChips: tool calls as quiet rows with a grey tag chip each,
 * details on a thin rail, and the edited files as white chips with line counts.
 */
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
    <div className={cn("min-h-52 w-full max-w-80 pb-1", className)} {...props}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          focusRing,
          rowHover,
          "-mx-2 flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-[0.8125rem] font-medium text-muted-foreground",
        )}
      >
        <Icon
          icon="mingcute:down-line"
          className={cn("size-3.5 transition-transform duration-base", !open && "-rotate-90")}
          aria-hidden="true"
        />
        <span className="tabular-nums">{summary}</span>
      </button>

      {open && (
        <div className="animate-in fade-in pb-1.5 duration-slow">
          <div className="mt-1.5 flex flex-col gap-1">
            {rows.slice(0, step).map((row) => {
              const rowOpen = openRows.has(row.label)
              return (
                <div key={row.label} className="animate-in fade-in slide-in-from-bottom-1 duration-slow">
                  <button
                    type="button"
                    aria-expanded={rowOpen}
                    onClick={() => toggleRow(row.label)}
                    className={cn(
                      focusRing,
                      rowHover,
                      "group/row flex h-8 w-full min-w-0 items-center gap-2 rounded-md px-1.5 text-left",
                    )}
                  >
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                      <Icon
                        icon={ICONS[row.icon] ?? ICONS.run}
                        className={cn(
                          "size-4 transition-opacity duration-fast group-hover/row:opacity-0",
                          rowOpen && "opacity-0",
                        )}
                        aria-hidden="true"
                      />
                      <Icon
                        icon="mingcute:down-line"
                        className={cn(
                          "absolute size-3.5 transition-[opacity,transform] duration-fast group-hover/row:opacity-100",
                          rowOpen ? "opacity-100" : "-rotate-90 opacity-0",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="shrink-0 text-[0.8125rem] font-medium text-foreground">{row.label}</span>
                    <span
                      className={cn(
                        quietChip,
                        "block h-6 min-w-0 flex-1 truncate rounded-sm px-2.5 text-xs leading-6",
                        row.mono && "font-mono",
                      )}
                    >
                      {row.chip}
                    </span>
                  </button>

                  {rowOpen && (
                    <div className="mt-0.5 mb-1 ml-3.5 flex animate-in fade-in gap-3 duration-base">
                      <span aria-hidden="true" className="w-px shrink-0 bg-input" />
                      <div className="flex min-w-0 flex-col gap-0.5 py-0.5">
                        {row.detail.map((line) => (
                          <span
                            key={line.text}
                            className={cn(
                              "truncate text-xs leading-relaxed",
                              row.detailMono && "font-mono",
                              line.tone === "add" ? "text-success-text" : "text-muted-foreground",
                            )}
                          >
                            {line.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {step >= total && diffs.length > 0 && (
            <div className="mt-3 flex max-w-full flex-wrap gap-1.5 border-t border-border pt-3">
              {diffs.map((d, i) => (
                <span
                  key={d.file}
                  className={cn(
                    raisedSurface,
                    "inline-flex h-7 max-w-full animate-in fade-in zoom-in-95 items-center gap-1.5 rounded-md px-2.5 font-mono text-xs",
                  )}
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                >
                  <Icon icon="mingcute:file-line" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 text-success-text tabular-nums">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 text-destructive-text tabular-nums">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className={cn(
                  focusRing,
                  "inline-flex h-7 animate-in fade-in items-center rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
                )}
                style={{ animationDelay: `${diffs.length * 80}ms`, animationFillMode: "both" }}
              >
                +2 more
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface ToolChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  kind?: "call" | "edit" | "read"
  meta?: string
  status?: "running" | "done" | "failed"
}

/**
 * Paddock ToolChip: a small white chip for one tool call; a running chip
 * pulses its icon in sky blue and a failed one takes a pale red tint.
 */
function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  const icon = kind === "edit" ? ICONS.write : kind === "read" ? ICONS.read : ICONS.run
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 font-mono text-xs",
        status === "failed" ? "bg-destructive/10 text-destructive-text" : raisedSurface,
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(
          "size-3.5",
          status === "running"
            ? "animate-pulse text-(--status-arrived-text) motion-reduce:animate-none"
            : status === "failed"
              ? "text-destructive-text"
              : "text-muted-foreground",
        )}
        aria-hidden="true"
      />
      {label}
      {meta && <span className="text-muted-foreground">{meta}</span>}
    </span>
  )
}

export { ToolChips, ToolChip }
export type { ToolRow, ToolDiff, ToolDetailLine }
