"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// ThinkingTrace: an agent's working notes that open and then settle, in
// four variants:
//   Steps      a step list with a turning arc, then muted checks
//   Reasoning  prose reasoning set in the serif, like a margin note
//   Search     a web search: the query, then numbered sources read
//   Coding     a tool trace: files read, edits, commands
// The trace runs once, settles, and stays open to a click.
//
// Usage:
//   <ThinkingTrace variant="Steps" />
//   <ThinkingTrace variant="Search" />

const STAGES = [800, 600, 1800, 2600, 1600]

function useSequence(steps: number[]) {
  const [stage, setStage] = React.useState(0)
  React.useEffect(() => {
    if (stage >= steps.length - 1) return
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage])
    return () => clearTimeout(t)
  }, [stage, steps])
  return stage
}

type Row = {
  primary: string
  secondary?: string
  mono?: boolean
  add?: number
  del?: number
  href?: string
}

type TraceVariant = { active: string; done: string; rows: Row[]; query?: string }

type VariantName = "Steps" | "Reasoning" | "Search" | "Coding"

const VARIANTS = {
  Steps: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Reading the essay draft" },
      { primary: "Collecting the quoted sources" },
      { primary: "Comparing the two arguments", secondary: "6 passages" },
      { primary: "Writing the summary" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "The second chapter repeats the opening claim, so the summary can merge them." },
      { primary: "I should check the dates in the footnotes before quoting the timeline." },
    ],
  },
  Search: {
    active: "Searching the web",
    done: "Searched the web",
    query: "plain language writing guidance",
    rows: [
      { primary: "Plain language guidelines", secondary: "plainlanguage.gov", href: "https://www.plainlanguage.gov/" },
      { primary: "Writing for GOV.UK", secondary: "gov.uk", href: "https://www.gov.uk/guidance/content-design/writing-for-gov-uk" },
      { primary: "Style manual", secondary: "stylemanual.gov.au", href: "https://www.stylemanual.gov.au/" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "notes.ts", mono: true },
      { primary: "Edit", secondary: "ReaderView.tsx", mono: true, add: 74, del: 41 },
      { primary: "Run", secondary: "bun run test", mono: true },
    ],
  },
} satisfies Record<VariantName, TraceVariant>

/** A source's place in the reading list, on a small oat disc. */
function SourceDot({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-[0.625rem] font-medium tabular-nums text-(--foreground-secondary)"
    >
      {index + 1}
    </span>
  )
}

interface ThinkingTraceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "Steps" | "Reasoning" | "Search" | "Coding"
  /** Override the built-in demo rows. */
  data?: TraceVariant
}

function ThinkingTrace({ variant = "Steps", data, className, ...props }: ThinkingTraceProps) {
  const stage = useSequence(STAGES)
  const [manualExpanded, setManualExpanded] = React.useState<boolean | null>(null)
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const v: TraceVariant = data ?? VARIANTS[variant] ?? VARIANTS.Steps
  const autoExpanded = stage >= 1 && stage < 4
  const expanded = manualExpanded ?? autoExpanded
  const working = stage < 3
  const visible = stage < 2 ? 0 : stage === 2 ? Math.min(2, v.rows.length) : v.rows.length

  return (
    <div
      key={variant}
      data-slot="thinking-trace"
      className={cn("flex min-h-[7.5rem] w-full max-w-[26rem] flex-col", className)}
      {...props}
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className="-mx-2 flex w-fit items-center gap-2 rounded-md px-2 py-1 outline-none transition-colors duration-fast ease-out hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Icon
          icon="ph:sparkle"
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0",
            working ? "text-(--foreground-secondary) motion-safe:animate-pulse" : "text-muted-foreground",
          )}
        />
        <span
          key={working ? "active" : "done"}
          className={cn(
            "whitespace-nowrap font-serif text-[0.9375rem] italic animate-in fade-in duration-slow",
            working ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {working ? v.active : v.done}
        </span>
        <Icon
          icon="ph:caret-down"
          aria-hidden="true"
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-base ease-out",
            expanded && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-base ease-out motion-reduce:transition-none",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="relative mt-1 ml-2 border-l border-border pl-4">
            <div className="flex flex-col gap-0.5 py-1">
              {v.query && (
                <div className="flex h-7 items-center gap-2 px-2 animate-in fade-in slide-in-from-bottom-1 duration-slow">
                  <Icon icon="ph:magnifying-glass" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-[0.8125rem] text-(--foreground-secondary)">{v.query}</span>
                </div>
              )}
              {v.rows.slice(0, visible).map((row, i) => {
                const content = (
                  <>
                    {variant === "Search" && <SourceDot index={i} />}
                    {variant === "Steps" &&
                      (i < visible - 1 || !working ? (
                        <Icon icon="ph:check" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      ) : (
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="size-3.5 shrink-0 animate-spin text-primary motion-reduce:animate-none"
                        >
                          <circle cx="8" cy="8" r="6.25" stroke="var(--line-strong)" strokeWidth="1.75" />
                          <path d="M8 1.75A6.25 6.25 0 0 1 14.25 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                        </svg>
                      ))}
                    <span
                      className={cn(
                        "min-w-0 truncate",
                        variant === "Reasoning"
                          ? "whitespace-normal font-serif text-[0.9375rem] leading-relaxed text-(--foreground-secondary)"
                          : "text-[0.8125rem] font-medium text-foreground",
                      )}
                    >
                      {row.primary}
                    </span>
                    {row.secondary && (
                      <span className={cn("shrink-0 text-xs text-muted-foreground", row.mono && "font-mono")}>
                        {row.secondary}
                      </span>
                    )}
                    {row.add !== undefined && (
                      <span className="shrink-0 font-mono text-xs tabular-nums">
                        <span className="text-(--success-text)">+{row.add}</span>{" "}
                        <span className="text-(--destructive-text)">-{row.del}</span>
                      </span>
                    )}
                  </>
                )
                const rowClass = cn(
                  "flex min-h-7 w-full items-center gap-2 rounded-md px-2 py-1 text-left",
                  "animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-slow ease-out motion-reduce:animate-none",
                )
                const delay = { animationDelay: `${i * 120}ms` }

                if (variant === "Search") {
                  return (
                    <a
                      key={row.primary}
                      href={row.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(rowClass, "outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring")}
                      style={delay}
                    >
                      {content}
                    </a>
                  )
                }
                if (variant === "Coding") {
                  const isSelected = selectedTool === row.primary
                  return (
                    <button
                      key={row.primary}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedTool(isSelected ? null : row.primary)}
                      className={cn(
                        rowClass,
                        "outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
                        isSelected ? "bg-muted" : "hover:bg-secondary",
                      )}
                      style={delay}
                    >
                      {content}
                    </button>
                  )
                }
                return (
                  <div key={row.primary} className={rowClass} style={delay}>
                    {content}
                  </div>
                )
              })}
              {variant === "Search" && stage >= 3 && (
                <span className="px-2 text-xs text-muted-foreground animate-in fade-in duration-slow">
                  +7 more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Back-compat named export used by the showcase bundle: a single settled
// trace row, a muted check before the title.
interface ThinkingTraceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "step" | "reasoning" | "search" | "coding"
  title: string
}

function ThinkingTraceItem({ kind = "step", title, className, children, ...props }: ThinkingTraceItemProps) {
  return (
    <div data-slot="thinking-trace-item" data-kind={kind} className={cn("flex items-center gap-2", className)} {...props}>
      <Icon icon="ph:check" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="min-w-0 truncate text-[0.8125rem] font-medium text-foreground">{title}</span>
      {children && <span className="shrink-0 text-xs text-muted-foreground">{children}</span>}
    </div>
  )
}

export { ThinkingTrace, ThinkingTraceItem }
export type { TraceVariant }
