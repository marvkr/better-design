"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"

// ToolChips: an assistant run as compact rows. Each tool call names its
// target in a grey chip, every row opens to show what the tool did, and
// the edited files close the run as paper tabs with their line counts.
//
// Usage:
//   <ToolChips />
//   <ToolChips summary="2 tool calls" rows={...} diffs={...} />

const STEP_MS = 700

const ICONS: { [kind: string]: string } = {
  think: "solar:chat-round-dots-linear",
  write: "solar:pen-linear",
  run: "solar:command-linear",
  read: "solar:document-text-linear",
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
    icon: "think", label: "Thinking", chip: "Planning the weekly report",
    detail: [
      { text: "The report needs totals and a daily average." },
      { text: "One helper covers both; the page calls it once." },
    ],
  },
  {
    icon: "write", label: "Write 24 lines", chip: "summary.py", mono: true, detailMono: true,
    detail: [
      { text: "+ def weekly_summary(visits):", tone: "add" },
      { text: "+     total = sum(visits)", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Run script", chip: "python summary.py", mono: true, detailMono: true,
    detail: [{ text: "total 12840" }, { text: "average 1834.3" }],
  },
  {
    icon: "read", label: "Read data", chip: "visits.csv", mono: true,
    detail: [
      { text: "7 rows, one per day." },
      { text: "No missing values." },
    ],
  },
]

const DEFAULT_DIFFS: ToolDiff[] = [
  { file: "summary.py", add: 24, del: 0 },
  { file: "report.md", add: 12, del: 30 },
  { file: "config.json", add: 3, del: 1 },
]

/** The hover wash for quiet rows. */
const rowHover = "transition-colors duration-fast hover:bg-accent"

interface ToolChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  summary?: string
  rows?: ToolRow[]
  diffs?: ToolDiff[]
}

/**
 * Margin ToolChips: each call names its target in a paper field chip, its
 * details hang off a hairline rail, and the edited files arrive at the end
 * as paper tabs with green and red line counts.
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
  const listId = React.useId()

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
    <div
      data-slot="tool-chips"
      className={cn("min-h-52 w-full max-w-sm pb-1", className)}
      {...props}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          focusRing,
          rowHover,
          "-mx-2 flex h-7 w-fit items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground",
        )}
      >
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={cn("size-3.5 transition-transform duration-base", !open && "-rotate-90")}
          aria-hidden="true"
        />
        <span className="tabular-nums">{summary}</span>
      </button>

      <div
        id={listId}
        className={cn(
          "grid transition-all duration-slow ease-(--ease-out)",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="-mx-1 overflow-hidden px-1.5 pb-1.5">
          <div className="mt-1 flex flex-col gap-0.5">
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
                      "group/row -mx-1 flex h-8 w-full min-w-0 items-center gap-2 rounded-md px-1 text-left",
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
                        icon="solar:alt-arrow-down-linear"
                        className={cn(
                          "absolute size-3.5 transition duration-fast group-hover/row:opacity-100",
                          rowOpen ? "opacity-100" : "-rotate-90 opacity-0",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="shrink-0 text-sm font-medium text-foreground">{row.label}</span>
                    <span
                      className={cn(
                        "inline-flex h-6 min-w-0 flex-1 items-center truncate rounded-md bg-(--field) px-2 text-xs text-muted-foreground",
                        row.mono && "font-mono",
                      )}
                    >
                      {row.chip}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-slow ease-(--ease-out)",
                      rowOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-0.5 mb-1 ms-2 flex gap-3">
                        <span aria-hidden="true" className="w-px shrink-0 bg-border" />
                        <div className="flex min-w-0 flex-col gap-0.5 py-0.5">
                          {row.detail.map((line) => (
                            <span
                              key={line.text}
                              className={cn(
                                "truncate text-xs leading-relaxed",
                                row.detailMono && "font-mono",
                                line.tone === "add" ? "text-(--clause-string)" : "text-muted-foreground",
                              )}
                            >
                              {line.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {step >= total && diffs.length > 0 && (
            <div className="mt-3 flex max-w-full flex-wrap gap-1.5 border-t border-border pt-3">
              {diffs.map((d, i) => (
                <span
                  key={d.file}
                  className="inline-flex h-7 max-w-full animate-in items-center gap-1.5 rounded-lg bg-card px-2.5 text-xs shadow-sm fade-in zoom-in-95 fill-mode-both"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <Icon icon="solar:file-text-linear" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 truncate font-mono">{d.file}</span>
                  <span className="shrink-0 tabular-nums text-success-text">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 tabular-nums text-destructive-text">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className={cn(
                  focusRing,
                  "inline-flex h-7 animate-in items-center rounded-md px-2 text-xs text-(--primary-text) underline decoration-current/30 underline-offset-4 fade-in fill-mode-both hover:decoration-current",
                )}
                style={{ animationDelay: `${diffs.length * 80}ms` }}
              >
                2 more files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// A standalone chip, kept for the showcase bundle.
interface ToolChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  kind?: "call" | "edit" | "read"
  meta?: string
  status?: "running" | "done" | "failed"
}

/**
 * Margin ToolChip: a paper tab naming one call. A running chip takes a
 * oxblood edge and a pulsing icon; a failed one turns a light red.
 */
function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  const icon = kind === "edit" ? ICONS.write : kind === "read" ? ICONS.read : ICONS.run
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 font-mono text-xs",
        status === "failed"
          ? "bg-destructive/12 text-destructive-text"
          : "bg-card text-foreground shadow-sm",
        status === "running" && "ring-1 ring-primary/45",
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(
          "size-3.5",
          status === "running"
            ? "animate-pulse text-(--primary-text) motion-reduce:animate-none"
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
