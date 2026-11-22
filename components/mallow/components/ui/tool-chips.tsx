"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { focusRing, selectedOption, optionTrack } from "./_shared"

const STEP_MS = 700

const ICONS: { [kind: string]: string } = {
  think: "iconoir:chat-lines",
  write: "iconoir:edit-pencil",
  run: "iconoir:terminal",
  read: "iconoir:page",
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
    icon: "think", label: "Thinking", chip: "Plan the payout schedule",
    detail: [
      { text: "Two release paths share one balance." },
      { text: "Compare the wait against the early fee." },
    ],
  },
  {
    icon: "write", label: "Write 42 lines", chip: "schedule.ts", mono: true, detailMono: true,
    detail: [
      { text: "+ export const WAIT_DAYS = 2", tone: "add" },
      { text: "+ export function earlyFee(amount: number)", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Run the checks", chip: "test suite", mono: true, detailMono: true,
    detail: [{ text: "pass  18 tests" }, { text: "pass  no type errors" }],
  },
  {
    icon: "read", label: "Read config", chip: "limits.json", mono: true,
    detail: [
      { text: "Daily cap set to 5,000 units." },
      { text: "No fee below 100 units." },
    ],
  },
]

const DEFAULT_DIFFS: ToolDiff[] = [
  { file: "schedule.ts", add: 42, del: 0 },
  { file: "fees.ts", add: 9, del: 14 },
  { file: "limits.json", add: 2, del: 1 },
]

/** A row lightens on hover, and only under a fine pointer. */
const rowHover = "transition-colors duration-fast pointer-fine:hover:bg-accent"

interface ToolChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  summary?: string
  rows?: ToolRow[]
  diffs?: ToolDiff[]
}

/**
 * Mallow ToolChips: an agent run as quiet rows, each naming its target in a
 * small lilac tag, with the edited files at the end as violet-tinted chips.
 */
function ToolChips({
  summary = "4 tool calls, 2 messages",
  rows = DEFAULT_ROWS,
  diffs = DEFAULT_DIFFS,
  className,
  ...props
}: ToolChipsProps) {
  const reduceMotion = useReducedMotion() ?? false
  const total = rows.length + 1
  const [step, setStep] = React.useState(reduceMotion ? total : 0)
  const [open, setOpen] = React.useState(true)
  const [openRows, setOpenRows] = React.useState<Set<string>>(new Set())
  const listId = React.useId()

  React.useEffect(() => {
    if (reduceMotion) {
      setStep(total)
      return
    }
    if (step >= total) return
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [step, total, reduceMotion])

  const toggleRow = (label: string) =>
    setOpenRows((current) => {
      const next = new Set(current)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })

  return (
    <div data-slot="tool-chips" className={cn("w-full max-w-sm pb-1", className)} {...props}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          focusRing,
          rowHover,
          "-mx-2 flex w-fit items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-muted-foreground",
        )}
      >
        <Icon
          icon="iconoir:nav-arrow-down"
          className={cn("size-3.5 transition-transform duration-base motion-reduce:transition-none", !open && "-rotate-90")}
          aria-hidden="true"
        />
        <span className="tabular-nums">{summary}</span>
      </button>

      {open && (
        <div id={listId} className="animate-in fade-in duration-base motion-reduce:animate-none">
          <div className={cn(optionTrack, "mt-2 flex flex-col gap-0.5 rounded-2xl p-1.5")}>
            {rows.slice(0, step).map((row) => {
              const rowOpen = openRows.has(row.label)
              return (
                <div
                  key={row.label}
                  className="animate-in fade-in slide-in-from-bottom-1 duration-slow motion-reduce:animate-none"
                >
                  <button
                    type="button"
                    aria-expanded={rowOpen}
                    onClick={() => toggleRow(row.label)}
                    className={cn(
                      focusRing,
                      "flex h-9 w-full min-w-0 items-center gap-2.5 rounded-xl px-2 text-left transition-colors duration-fast",
                      rowOpen ? selectedOption : "pointer-fine:hover:bg-card",
                    )}
                  >
                    <Icon
                      icon={ICONS[row.icon] ?? ICONS.run}
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="shrink-0 text-sm font-medium text-foreground">{row.label}</span>
                    <span
                      className={cn(
                        "inline-flex h-6 min-w-0 flex-1 items-center truncate rounded-full bg-(--tag) px-2.5 text-xs text-muted-foreground",
                        row.mono && "font-mono",
                      )}
                    >
                      {row.chip}
                    </span>
                    <Icon
                      icon="iconoir:nav-arrow-down"
                      className={cn(
                        "size-3.5 shrink-0 text-muted-foreground transition-transform duration-fast motion-reduce:transition-none",
                        !rowOpen && "-rotate-90",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {rowOpen && (
                    <div className="mt-1 mb-1.5 ml-4 flex gap-3 animate-in fade-in duration-base motion-reduce:animate-none">
                      <span aria-hidden="true" className="w-0.5 shrink-0 rounded-full bg-border" />
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
            <div className="mt-3 flex max-w-full flex-wrap gap-1.5">
              {diffs.map((d) => (
                <span
                  key={d.file}
                  className={cn(
                    selectedOption,
                    "inline-flex h-7 max-w-full items-center gap-1.5 rounded-full px-2.5 font-mono text-xs animate-in fade-in zoom-in-95 motion-reduce:animate-none",
                  )}
                >
                  <Icon icon="iconoir:page" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 tabular-nums text-success-text">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 tabular-nums text-destructive-text">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className={cn(
                  focusRing,
                  "inline-flex h-7 items-center rounded-full px-2 text-xs font-medium text-muted-foreground underline decoration-current/30 underline-offset-4 pointer-fine:hover:text-foreground",
                )}
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
 * Mallow ToolChip: one violet-tinted chip for a single call; a running chip pulses
 * its icon and a failed one takes a red tint.
 */
function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  const icon = kind === "edit" ? ICONS.write : kind === "read" ? ICONS.read : ICONS.run
  return (
    <span
      data-slot="tool-chip"
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs",
        status === "failed" ? "bg-destructive/15 text-destructive-text" : selectedOption,
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(
          "size-3.5",
          status === "running"
            ? "animate-pulse text-foreground motion-reduce:animate-none"
            : status === "failed"
              ? "text-destructive-text"
              : "text-muted-foreground",
        )}
        aria-hidden="true"
      />
      {label}
      {meta && <span className="tabular-nums text-muted-foreground">{meta}</span>}
    </span>
  )
}

export { ToolChips, ToolChip }
export type { ToolRow, ToolDiff, ToolDetailLine }
