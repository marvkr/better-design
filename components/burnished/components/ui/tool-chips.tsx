"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing, raisedBevel, wellInset } from "./_shared"

// ToolChips: an agent run as compact rows: tool calls with a recessed chip
// each, then graphite file chips that sum up the edits. Hover a row to
// reveal its caret; every row expands to show what the tool did.
//
// Usage:
//   <ToolChips />
//   <ToolChips summary="2 tool calls" rows={...} diffs={...} />

const STEP_MS = 700

const ICONS: { [kind: string]: string } = {
  think: "ph:chat-circle",
  write: "ph:pencil-simple",
  run: "ph:terminal",
  read: "ph:file-text",
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
    icon: "think", label: "Thinking", chip: "Planning the API reference",
    detail: [
      { text: "The list endpoints share one pagination model." },
      { text: "One shared page covers it; each endpoint links there." },
    ],
  },
  {
    icon: "write", label: "Write 96 lines", chip: "pagination.mdx", mono: true, detailMono: true,
    detail: [
      { text: "+ ## Cursor pagination", tone: "add" },
      { text: "+ Pass `cursor` from the last response.", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Build and check links", chip: "docs build", mono: true, detailMono: true,
    detail: [{ text: "✓ built 214 pages" }, { text: "✓ no broken links" }],
  },
  {
    icon: "read", label: "Read spec", chip: "openapi.yaml", mono: true,
    detail: [
      { text: "38 operations across 9 tags." },
      { text: "4 operations lack an example response." },
    ],
  },
]

const DEFAULT_DIFFS: ToolDiff[] = [
  { file: "pagination.mdx", add: 96, del: 0 },
  { file: "list-users.mdx", add: 12, del: 30 },
  { file: "mint.json", add: 3, del: 1 },
]

/** Hover wash for quiet rows, only under a fine pointer. */
const rowHover =
  "transition-colors duration-fast [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/60"

interface ToolChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  summary?: string
  rows?: ToolRow[]
  diffs?: ToolDiff[]
}

/**
 * Burnished ToolChips: each call names its target in a small recessed
 * well, details hang off a slim well rail, and the edited files rise at
 * the end as graphite bevel pills with their line counts.
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
    <div className={cn("min-h-[12.5rem] w-full max-w-[20rem] pb-1 tracking-[0.016em]", className)} {...props}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          focusRing,
          rowHover,
          "-mx-2 flex w-fit items-center gap-1.5 rounded-full px-2 py-1 text-[0.8125rem] font-medium text-muted-foreground",
        )}
      >
        <Icon
          icon="ph:caret-down"
          className={cn("size-3 transition-transform duration-base", !open && "-rotate-90")}
          aria-hidden="true"
        />
        <span className="tabular-nums">{summary}</span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out)",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="-mx-1 overflow-hidden px-1.5 pb-1.5">
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
                      "group/row -mx-1 flex h-8 w-[calc(100%+0.5rem)] min-w-0 items-center gap-2 rounded-md px-1 text-left",
                    )}
                  >
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                      <Icon
                        icon={ICONS[row.icon] ?? ICONS.run}
                        className={cn(
                          "size-3.5 transition-opacity duration-fast [@media(hover:hover)_and_(pointer:fine)]:group-hover/row:opacity-0",
                          rowOpen && "opacity-0",
                        )}
                        aria-hidden="true"
                      />
                      <Icon
                        icon="ph:caret-down"
                        className={cn(
                          "absolute size-3 transition-[opacity,transform] duration-fast [@media(hover:hover)_and_(pointer:fine)]:group-hover/row:opacity-100",
                          rowOpen ? "opacity-100" : "-rotate-90 opacity-0",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="shrink-0 text-[0.8125rem] font-semibold text-foreground">{row.label}</span>
                    <span
                      className={cn(
                        wellInset,
                        "inline-flex h-6 min-w-0 flex-1 items-center truncate rounded-sm px-2 text-xs text-foreground/80",
                        row.mono && "font-mono tracking-normal",
                      )}
                    >
                      {row.chip}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out)",
                      rowOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-0.5 mb-1 ml-2 flex gap-3">
                        <span aria-hidden="true" className={cn(wellInset, "w-1 shrink-0 rounded-full")} />
                        <div className="flex min-w-0 flex-col gap-0.5 py-0.5">
                          {row.detail.map((line) => (
                            <span
                              key={line.text}
                              className={cn(
                                "truncate text-xs leading-relaxed",
                                row.detailMono && "font-mono tracking-normal",
                                line.tone === "add" ? "text-success" : "text-muted-foreground",
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
                  className={cn(
                    raisedBevel,
                    "inline-flex h-7 max-w-full animate-in fade-in zoom-in-95 items-center gap-1.5 rounded-full px-2.5 font-mono text-xs tracking-normal",
                  )}
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                >
                  <Icon icon="ph:file" className="size-3 shrink-0 text-primary-text" aria-hidden="true" />
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 text-success tabular-nums">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 text-destructive tabular-nums">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className={cn(
                  focusRing,
                  "inline-flex h-7 animate-in fade-in items-center rounded-full px-2 text-xs font-semibold text-primary-text underline decoration-current/30 underline-offset-4",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:decoration-current",
                )}
                style={{ animationDelay: `${diffs.length * 80}ms`, animationFillMode: "both" }}
              >
                +2 more
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
 * Burnished ToolChip: a graphite bevel pill. A running chip glows at the
 * rim; a failed one takes a red wash.
 */
function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  const icon = kind === "edit" ? ICONS.write : kind === "read" ? ICONS.read : ICONS.run
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs tracking-normal",
        status === "failed" ? "bg-destructive/12 text-destructive" : raisedBevel,
        status === "running" && "ring-1 ring-glow/50",
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(
          "size-3",
          status === "running"
            ? "animate-pulse text-primary-text motion-reduce:animate-none"
            : status === "failed"
              ? "text-destructive"
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
