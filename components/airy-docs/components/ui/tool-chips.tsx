"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// ToolChips: an agent run as compact rows, styled like a docs changelog: tool
// calls with a mono chip each, then file-diff chips that sum up the edits.
// Hover a row to reveal its chevron; every row expands to show what the tool
// did.
//
// Usage:
//   <ToolChips />
//   <ToolChips summary="2 tool calls" rows={...} diffs={...} />

const STEP_MS = 700

const ICONS: Record<string, string> = {
  think: "feather:message-circle",
  write: "feather:edit-3",
  run: "feather:terminal",
  read: "feather:file-text",
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
        className="-mx-1.5 flex w-fit items-center gap-1.5 rounded-md px-1.5 py-1 text-[0.8125rem] text-(--foreground-secondary) outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Icon
          icon="feather:chevron-down"
          className={cn("size-3 transition-transform duration-base", !open && "-rotate-90")}
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
                <div key={row.label} className="animate-in fade-in slide-in-from-bottom-1 duration-slow">
                  <button
                    type="button"
                    aria-expanded={rowOpen}
                    onClick={() => toggleRow(row.label)}
                    className="group/row -mx-1 flex h-7 w-[calc(100%+0.5rem)] min-w-0 items-center gap-2 rounded-md px-1 text-left outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                      <Icon
                        icon={ICONS[row.icon] ?? ICONS.run}
                        className={cn("size-3.5 transition-opacity duration-fast group-hover/row:opacity-0", rowOpen && "opacity-0")}
                        aria-hidden="true"
                      />
                      <Icon
                        icon="feather:chevron-down"
                        className={cn(
                          "absolute size-3 transition-[opacity,transform] duration-fast group-hover/row:opacity-100",
                          rowOpen ? "opacity-100" : "-rotate-90 opacity-0",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="shrink-0 text-[0.8125rem] font-medium text-foreground">{row.label}</span>
                    <span
                      className={cn(
                        "inline-flex h-5.5 min-w-0 flex-1 items-center truncate rounded-sm bg-(--code-inline) px-1.5 text-xs text-(--foreground-secondary)",
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
                              line.tone === "add" ? "text-(--success-text)" : "text-(--foreground-secondary)",
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
                  className="inline-flex h-7 max-w-full animate-in fade-in zoom-in-95 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-2.5 font-mono text-xs text-foreground transition-colors duration-fast hover:bg-secondary"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                >
                  <Icon icon="feather:file" className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 text-(--success-text) tabular-nums">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 text-(--destructive-text) tabular-nums">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className="inline-flex h-7 animate-in fade-in items-center rounded-full px-2 text-xs text-(--primary-text) outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring"
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

function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  const icon = kind === "edit" ? ICONS.write : kind === "read" ? ICONS.read : ICONS.run
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground",
        status === "running" && "border-(--primary-line) bg-(--primary-wash)",
        status === "failed" && "border-destructive/40 bg-(--destructive-tint) text-(--destructive-text)",
        className,
      )}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(
          "size-3 text-muted-foreground",
          status === "running" && "animate-pulse text-(--primary-text)",
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
