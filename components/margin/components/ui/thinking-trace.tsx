"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"

// ThinkingTrace: an assistant's trace that plays once and stays open to
// read, in four variants:
//   Steps      a step list with a turning oxblood arc, then oxblood ticks
//   Reasoning  short paragraphs of reasoning
//   Search     a notes search: the query in a paper field, then the pages read
//   Coding     a tool trace: files read, edits, commands
//
// Usage:
//   <ThinkingTrace variant="Steps" />
//   <ThinkingTrace variant="Search" />

const STAGES = [800, 600, 1800, 2600, 1600]

/** Advances a stage once per delay, then rests on the last one. */
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

const VARIANTS: { [variant: string]: TraceVariant } = {
  Steps: {
    active: "Thinking",
    done: "Thought for 5 seconds",
    rows: [
      { primary: "Reading this week's notes" },
      { primary: "Finding open tasks", secondary: "8 found" },
      { primary: "Grouping by owner" },
      { primary: "Writing the summary" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 5 seconds",
    rows: [
      { primary: "The question is about the launch, so the planning pages matter more than the retro notes." },
      { primary: "The date changed on Tuesday, so the summary should use the newer page." },
    ],
  },
  Search: {
    active: "Searching your notes",
    done: "Searched your notes",
    query: "launch checklist owners",
    rows: [
      { primary: "Launch plan", secondary: "Notebooks / Product" },
      { primary: "Weekly sync, 12 May", secondary: "Notes" },
      { primary: "Onboarding checklist", secondary: "Templates" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "visits.csv", mono: true },
      { primary: "Edit", secondary: "summary.py", mono: true, add: 24, del: 9 },
      { primary: "Run", secondary: "python summary.py", mono: true },
    ],
  },
}

/** A turning oxblood arc on a pale ring: the trace is still working. */
function WorkingArc({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative shrink-0 rounded-full border-2 border-primary/20", className)}
    >
      <span className="absolute -inset-0.5 animate-spin rounded-full border-2 border-transparent border-t-primary motion-reduce:animate-none" />
    </span>
  )
}

/** A page mark: a document glyph on the pale oxblood mark. */
function SourceMark() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-(--mark) text-(--mark-foreground)">
      <Icon icon="solar:document-text-linear" className="size-3" aria-hidden="true" />
    </span>
  )
}

interface ThinkingTraceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "Steps" | "Reasoning" | "Search" | "Coding"
  /** Override the built-in demo rows. */
  data?: TraceVariant
}

/**
 * Margin ThinkingTrace: a quiet toggle line with an oxblood arc while it works,
 * over a hairline rail of rows. A picked tool row sits on a paper tab.
 */
function ThinkingTrace({ variant = "Steps", data, className, ...props }: ThinkingTraceProps) {
  const stage = useSequence(STAGES)
  const [manualExpanded, setManualExpanded] = React.useState<boolean | null>(null)
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const v = data ?? VARIANTS[variant] ?? VARIANTS.Steps
  const autoExpanded = stage >= 1 && stage < 4
  const expanded = manualExpanded ?? autoExpanded
  const working = stage < 3
  const visible = stage < 2 ? 0 : stage === 2 ? Math.min(2, v.rows.length) : v.rows.length
  const panelId = React.useId()

  return (
    <div
      key={variant}
      data-slot="thinking-trace"
      className={cn("flex min-h-30 w-full max-w-md flex-col", className)}
      {...props}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className={cn(
          focusRing,
          "-mx-2 flex h-7 w-fit items-center gap-2 rounded-md px-2 transition-colors duration-fast hover:bg-accent",
        )}
      >
        {working ? (
          <WorkingArc className="size-3.5" />
        ) : (
          <Icon icon="solar:lightbulb-minimalistic-linear" className="size-4 shrink-0 text-(--primary-text)" aria-hidden="true" />
        )}
        <span
          aria-live="polite"
          className={cn(
            "whitespace-nowrap text-sm",
            working ? "animate-pulse font-medium text-foreground motion-reduce:animate-none" : "text-muted-foreground",
          )}
        >
          {working ? v.active : v.done}
        </span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-base",
            expanded && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-all duration-slow ease-(--ease-out)",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="relative ms-1.5 mt-1 flex gap-3">
            <span aria-hidden="true" className="w-px shrink-0 bg-border" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-1">
              {v.query && (
                <div className="mb-1 flex h-7.5 items-center gap-2 rounded-lg bg-(--field) px-2.5 text-sm text-foreground">
                  <Icon icon="solar:magnifer-linear" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="truncate">{v.query}</span>
                </div>
              )}
              {v.rows.slice(0, visible).map((row, i) => {
                const content = (
                  <>
                    {variant === "Search" && <SourceMark />}
                    {variant === "Steps" &&
                      (i < visible - 1 || !working ? (
                        <Icon icon="solar:check-circle-bold" className="size-4 shrink-0 text-(--primary-text)" aria-hidden="true" />
                      ) : (
                        <WorkingArc className="size-3.5" />
                      ))}
                    <span
                      className={cn(
                        "min-w-0 truncate text-sm",
                        variant === "Reasoning"
                          ? "whitespace-normal leading-relaxed text-muted-foreground"
                          : "text-foreground",
                      )}
                    >
                      {row.primary}
                    </span>
                    {row.secondary && (
                      <span
                        className={cn(
                          "ms-auto shrink-0 text-xs text-muted-foreground",
                          row.mono && "ms-0 font-mono",
                        )}
                      >
                        {row.secondary}
                      </span>
                    )}
                    {row.add !== undefined && (
                      <span className="ms-auto shrink-0 font-mono text-xs tabular-nums">
                        <span className="text-success-text">+{row.add}</span>{" "}
                        <span className="text-destructive-text">-{row.del}</span>
                      </span>
                    )}
                  </>
                )
                const rowClass = cn(
                  focusRing,
                  "flex min-h-7.5 w-full animate-in items-center gap-2 rounded-md px-2 py-0.5 text-left fade-in slide-in-from-bottom-1 fill-mode-both duration-slow",
                )
                const delay = { animationDelay: `${i * 120}ms` }

                if (variant === "Search") {
                  return (
                    <a
                      key={row.primary}
                      href={row.href ?? "#"}
                      className={cn(rowClass, "transition-colors duration-fast hover:bg-accent")}
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
                        "transition-colors duration-fast",
                        isSelected ? "bg-card shadow-sm" : "hover:bg-accent",
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
                <span className="animate-in fade-in px-2 text-xs text-muted-foreground duration-slow">
                  4 more pages
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// A single trace row, kept as a named export for the showcase bundle.
interface ThinkingTraceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "step" | "reasoning" | "search" | "coding"
  title: string
}

/** Margin ThinkingTraceItem: one finished row with an oxblood tick. */
function ThinkingTraceItem({ kind = "step", title, className, children, ...props }: ThinkingTraceItemProps) {
  return (
    <div data-kind={kind} className={cn("flex items-center gap-2", className)} {...props}>
      <Icon icon="solar:check-circle-bold" className="size-4 shrink-0 text-(--primary-text)" aria-hidden="true" />
      <span className="min-w-0 truncate text-sm text-foreground">{title}</span>
      {children && <span className="shrink-0 text-xs text-muted-foreground">{children}</span>}
    </div>
  )
}

export { ThinkingTrace, ThinkingTraceItem }
export type { TraceVariant }
