"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ink mail ToolChips: an agent run as compact rows. Each tool call carries a
// mono chip on the elevated surface step; a closing row of file chips sums up
// the edits in delivered green and bounced red line counts. Hover a row to
// swap its tool glyph for a caret; every row opens to show what the tool did.
//
// Usage:
//   <ToolChips />
//   <ToolChips summary="2 tool calls" rows={...} diffs={...} />

const STEP_MS = 700

/** The Phosphor glyph for each tool kind; an unknown kind reads as a command. */
const TOOL_ICONS = new Map<string, string>([
  ["think", "ph:sparkle"],
  ["write", "ph:code"],
  ["run", "ph:terminal-window"],
  ["read", "ph:file"],
])

function toolIcon(kind: string) {
  return TOOL_ICONS.get(kind) ?? "ph:terminal-window"
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
    icon: "think", label: "Thinking", chip: "Planning the retry queue",
    detail: [
      { text: "Soft bounces clear within an hour, so they retry first." },
      { text: "Hard bounces go to the suppression list instead." },
    ],
  },
  {
    icon: "write", label: "Write 204 lines", chip: "retry-queue.ts", mono: true, detailMono: true,
    detail: [
      { text: "+ const soft = events.filter((e) => e.type === \"soft_bounce\")", tone: "add" },
      { text: "+ return schedule(soft, { backoff: \"exponential\" })", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Run the tests", chip: "bun run test", mono: true, detailMono: true,
    detail: [{ text: "✓ built in 1.2s" }, { text: "✓ 34 checks passed" }],
  },
  {
    icon: "read", label: "Read log", chip: "bounces.json", mono: true,
    detail: [
      { text: "412 events across the last 24 hours." },
      { text: "Most come from a single receiving domain." },
    ],
  },
]

const DEFAULT_DIFFS: ToolDiff[] = [
  { file: "retry-queue.ts", add: 74, del: 41 },
  { file: "webhooks.ts", add: 13, del: 0 },
  { file: "schema.sql", add: 8, del: 2 },
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
    <div className={cn("min-h-50 w-full max-w-xs pb-1", className)} {...props}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="-mx-1.5 flex w-fit items-center gap-1.5 rounded-md px-1.5 py-1 text-[0.8125rem] text-muted-foreground transition-colors duration-fast ease-out hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Icon
          icon="ph:caret-down"
          className={cn("size-3 transition-transform duration-fast ease-out", !open && "-rotate-90")}
          aria-hidden="true"
        />
        <span className="tabular-nums">{summary}</span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="-mx-1 overflow-hidden px-1.5 pb-1">
          <div className="mt-1.5 flex flex-col gap-1">
            {rows.slice(0, step).map((row) => {
              const rowOpen = openRows.has(row.label)
              return (
                <div key={row.label} style={{ animation: "ink-chips-rise 300ms cubic-bezier(0.23, 1, 0.32, 1) both" }}>
                  <button
                    type="button"
                    aria-expanded={rowOpen}
                    onClick={() => toggleRow(row.label)}
                    className="group/row -mx-1 flex h-7 w-[calc(100%+0.5rem)] min-w-0 items-center gap-2 rounded-md px-1 text-left transition-colors duration-fast ease-out hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                      <Icon
                        icon={toolIcon(row.icon)}
                        className={cn("size-3.5 transition-opacity duration-fast group-hover/row:opacity-0", rowOpen && "opacity-0")}
                        aria-hidden="true"
                      />
                      <Icon
                        icon="ph:caret-down"
                        className={cn(
                          "absolute size-3 transition-[opacity,transform] duration-fast ease-out group-hover/row:opacity-100",
                          rowOpen ? "opacity-100" : "-rotate-90 opacity-0",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="shrink-0 text-[0.8125rem] font-medium text-foreground">{row.label}</span>
                    <span
                      className={cn(
                        "inline-flex h-5.5 min-w-0 flex-1 items-center truncate rounded-sm border border-border bg-secondary px-1.5 text-xs text-(--foreground-secondary)",
                        row.mono && "font-mono",
                      )}
                    >
                      {row.chip}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
                      rowOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-0.5 mb-1 ml-2 flex flex-col gap-0.5 border-l border-border py-0.5 pl-3.5">
                        {row.detail.map((line) => (
                          <span
                            key={line.text}
                            className={cn(
                              "truncate text-xs leading-relaxed",
                              row.detailMono && "font-mono",
                              line.tone === "add" ? "text-(--success-text)" : "text-muted-foreground",
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
                  className="inline-flex h-7 max-w-full cursor-pointer items-center gap-1.5 rounded-md border border-(--line-strong) bg-card px-2 font-mono text-xs text-foreground transition-colors duration-fast ease-out hover:bg-secondary"
                  style={{ animation: `ink-chips-pop 250ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 80}ms both` }}
                >
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 tabular-nums text-(--success-text)">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 tabular-nums text-(--destructive-text)">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className="inline-flex h-7 items-center rounded-md px-1.5 font-mono text-xs text-muted-foreground underline decoration-transparent underline-offset-2 transition-colors duration-fast ease-out hover:text-foreground hover:decoration-current focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
                style={{ animation: `ink-chips-fade 300ms ease-out ${diffs.length * 80}ms both` }}
              >
                +2 more
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes ink-chips-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ink-chips-rise { from { opacity: 0; transform: translateY(0.375rem); } to { opacity: 1; transform: none; } }
        @keyframes ink-chips-pop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

// A standalone tool chip: one call, edit or read, with its status.
interface ToolChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  kind?: "call" | "edit" | "read"
  meta?: string
  status?: "running" | "done" | "failed"
}

function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  const icon = kind === "edit" ? "ph:code" : kind === "read" ? "ph:file" : "ph:terminal-window"
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-(--line-strong) bg-secondary px-2 py-1 font-mono text-xs text-foreground",
        status === "failed" && "bg-(--destructive-tint) text-(--destructive-text)",
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(
          "size-3 text-muted-foreground",
          status === "running" && "animate-pulse text-foreground",
          status === "failed" && "text-(--destructive-text)",
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
