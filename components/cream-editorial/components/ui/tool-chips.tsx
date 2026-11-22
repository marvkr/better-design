"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Cream editorial ToolChips: an agent run written up like a margin log. Each
// tool call is a compact sans row with its subject on a small oat chip, and
// the edits close the run as hairline file chips with their added and removed
// line counts. Hover a row to swap its icon for a caret; every row opens to
// show what the tool did.
//
// Usage:
//   <ToolChips />
//   <ToolChips summary="2 tool calls" rows={...} diffs={...} />

const STEP_MS = 700

/** The Phosphor glyph for each kind of row; an unknown kind reads as a command. */
const ROW_ICONS = new Map<string, string>([
  ["think", "ph:sparkle"],
  ["write", "ph:file-text"],
  ["run", "ph:terminal"],
  ["read", "ph:eye"],
])

function rowIcon(kind: string) {
  return ROW_ICONS.get(kind) ?? "ph:terminal"
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
    icon: "think", label: "Thinking", chip: "Outlining the reading list",
    detail: [
      { text: "Three essays share a theme, so they open the list." },
      { text: "The long interview fits best as a weekend read." },
    ],
  },
  {
    icon: "write", label: "Write 118 lines", chip: "ReadingList.tsx", mono: true, detailMono: true,
    detail: [
      { text: "+ const shelf = essays.filter((e) => e.minutes <= 20)", tone: "add" },
      { text: "+ return arrange(shelf, { lead: \"on-attention\" })", tone: "add" },
    ],
  },
  {
    icon: "run", label: "Build and check", chip: "bun run build", mono: true, detailMono: true,
    detail: [{ text: "✓ built in 1.4s" }, { text: "✓ 28 checks passed" }],
  },
  {
    icon: "read", label: "Read image", chip: "margin-notes.png", mono: true,
    detail: [
      { text: "A scanned page with handwritten notes in the margin." },
      { text: "Two passages are underlined twice." },
    ],
  },
]

const DEFAULT_DIFFS: ToolDiff[] = [
  { file: "shelf.css", add: 9, del: 0 },
  { file: "ReadingList.tsx", add: 62, del: 27 },
  { file: "essays.ts", add: 6, del: 1 },
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
                <div key={row.label} style={{ animation: "ce-tool-rise 300ms ease-out both" }}>
                  <button
                    type="button"
                    aria-expanded={rowOpen}
                    onClick={() => toggleRow(row.label)}
                    className="group/row -mx-1 flex h-7 w-[calc(100%+0.5rem)] min-w-0 items-center gap-2 rounded-md px-1 text-left transition-colors duration-fast ease-out hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                      <Icon
                        icon={rowIcon(row.icon)}
                        className={cn("size-3.5 transition-opacity duration-fast group-hover/row:opacity-0", rowOpen && "opacity-0")}
                        aria-hidden="true"
                      />
                      <Icon
                        icon="ph:caret-down"
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
                        "inline-flex h-5.5 min-w-0 flex-1 items-center truncate rounded-sm bg-muted px-1.5 text-xs text-(--foreground-secondary)",
                        row.mono && "font-mono text-[0.6875rem]",
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
                              row.detailMono && "font-mono text-[0.6875rem]",
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
                  className="inline-flex h-7 max-w-full cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-2 font-mono text-[0.6875rem] text-foreground transition-colors duration-fast ease-out hover:bg-secondary"
                  style={{ animation: `ce-tool-appear 250ms ease-out ${i * 80}ms both` }}
                >
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 tabular-nums text-(--success-text)">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 tabular-nums text-(--destructive-text)">-{d.del}</span>}
                </span>
              ))}
              <button
                type="button"
                className="inline-flex h-7 items-center rounded-md px-1.5 text-xs text-(--primary-text) underline decoration-transparent underline-offset-4 transition-colors duration-fast ease-out hover:decoration-current focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
                style={{ animation: `ce-tool-appear 300ms ease-out ${diffs.length * 80}ms both` }}
              >
                +2 more
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes ce-tool-appear { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ce-tool-rise { from { opacity: 0; transform: translateY(0.25rem); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

// A single chip on its own, kept for the showcase bundle contract.
interface ToolChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  kind?: "call" | "edit" | "read"
  meta?: string
  status?: "running" | "done" | "failed"
}

const CHIP_ICONS = {
  call: "ph:terminal",
  edit: "ph:file-text",
  read: "ph:eye",
} as const satisfies Record<NonNullable<ToolChipProps["kind"]>, string>

function ToolChip({ label, kind = "call", meta, status, className, ...props }: ToolChipProps) {
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 font-mono text-[0.6875rem] text-foreground",
        status === "failed" && "border-(--destructive-text)/30 bg-(--destructive-tint) text-(--destructive-text)",
        className,
      )}
      {...props}
    >
      <Icon
        icon={status === "running" ? "ph:spinner-gap" : CHIP_ICONS[kind]}
        className={cn(
          "size-3 text-muted-foreground",
          status === "running" && "animate-spin text-(--primary-text)",
          status === "failed" && "text-current",
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
