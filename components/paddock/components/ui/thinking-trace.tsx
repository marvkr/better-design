"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing, raisedSurface, wellInset } from "./_shared"

// ThinkingTrace: an expandable agent trace with staged playback, in four
// variants:
//   Steps      a step list with a turning ring, then slate checks
//   Reasoning  prose reasoning that expands, then settles
//   Search     a record search: the query in a chip, then the cards read
//   Coding     a tool trace: files read, edits, commands
// The trace runs once, settles, and stays expandable.
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
      { primary: "Reading the schedule" },
      { primary: "Grouping cards by owner" },
      { primary: "Checking due dates", secondary: "12 cards" },
      { primary: "Writing the summary" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 5 seconds",
    rows: [
      { primary: "The question is about next week, so cards due after the 15th can wait." },
      { primary: "Two review cards share one owner, which explains why both stalled." },
    ],
  },
  Search: {
    active: "Searching the schedule",
    done: "Searched the schedule",
    query: "cards due this week",
    rows: [
      { primary: "Billing settings", secondary: "In review" },
      { primary: "Welcome emails", secondary: "In progress" },
      { primary: "Help center pages", secondary: "To do" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "schedule.json", mono: true },
      { primary: "Edit", secondary: "due-dates.ts", mono: true, add: 28, del: 9 },
      { primary: "Run", secondary: "check dates", mono: true },
    ],
  },
}

/** A turning ring: the trace is still working. */
function WorkingRing({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className={cn("shrink-0 animate-spin motion-reduce:animate-none", className)}>
      <circle cx="9" cy="9" r="7" fill="none" strokeWidth="2.5" className="stroke-input" />
      <circle
        cx="9"
        cy="9"
        r="7"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="12 44"
        className="stroke-foreground"
      />
    </svg>
  )
}

/** A card mark: a small grey tile with a folder glyph. */
function SourceMark() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-xs bg-secondary text-muted-foreground">
      <Icon icon="mingcute:folder-line" className="size-3" aria-hidden="true" />
    </span>
  )
}

interface ThinkingTraceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "Steps" | "Reasoning" | "Search" | "Coding"
  /** Override the built-in demo rows. */
  data?: TraceVariant
}

/**
 * Paddock ThinkingTrace: a quiet header with a turning ring, over a thin
 * rail of rows; a picked tool row lifts onto a white bordered surface.
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
    <div key={variant} className={cn("flex min-h-32 w-full max-w-96 flex-col", className)} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className={cn(
          focusRing,
          "-mx-2 flex w-fit items-center gap-2 rounded-md px-2 py-1 transition-colors duration-fast hover:bg-accent",
        )}
      >
        {working ? (
          <WorkingRing className="size-3.5" />
        ) : (
          <Icon icon="mingcute:check-circle-line" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
        {working ? (
          <span className="animate-pulse whitespace-nowrap text-[0.8125rem] font-medium text-foreground motion-reduce:animate-none">
            {v.active}
          </span>
        ) : (
          <span className="animate-in fade-in whitespace-nowrap text-[0.8125rem] font-medium text-muted-foreground duration-slow">
            {v.done}
          </span>
        )}
        <Icon
          icon="mingcute:down-line"
          className={cn("size-4 text-muted-foreground transition-transform duration-base", expanded && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div id={panelId} className="relative mt-1.5 ml-2 flex animate-in fade-in gap-3.5 duration-slow">
          <span aria-hidden="true" className="w-px shrink-0 bg-input" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-1">
            {v.query && (
              <div className={cn(wellInset, "mb-1 flex h-8 items-center gap-2 rounded-md px-3 text-xs text-foreground")}>
                <Icon icon="mingcute:search-line" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate">{v.query}</span>
              </div>
            )}
            {v.rows.slice(0, visible).map((row, i) => {
              const content = (
                <>
                  {variant === "Search" && <SourceMark />}
                  {variant === "Steps" &&
                    (i < visible - 1 || !working ? (
                      <Icon icon="mingcute:check-line" className="size-4 shrink-0 text-foreground" aria-hidden="true" />
                    ) : (
                      <WorkingRing className="size-3.5" />
                    ))}
                  <span
                    className={cn(
                      "min-w-0 truncate text-[0.8125rem]",
                      variant === "Reasoning"
                        ? "whitespace-normal text-muted-foreground"
                        : "font-medium text-foreground",
                    )}
                  >
                    {row.primary}
                  </span>
                  {row.secondary && (
                    <span
                      className={cn(
                        "shrink-0 text-xs text-muted-foreground",
                        row.mono && "font-mono",
                        variant === "Search" && "ml-auto rounded-sm bg-secondary px-2 py-0.5 font-medium text-secondary-foreground",
                      )}
                    >
                      {row.secondary}
                    </span>
                  )}
                  {row.add !== undefined && (
                    <span className="shrink-0 font-mono text-xs tabular-nums">
                      <span className="text-success-text">+{row.add}</span>{" "}
                      <span className="text-destructive-text">-{row.del}</span>
                    </span>
                  )}
                </>
              )
              const rowClass = cn(
                focusRing,
                "flex min-h-8 w-full animate-in fade-in slide-in-from-bottom-1 items-center gap-2 rounded-md px-2 py-0.5 text-left duration-slow",
              )
              const delay = { animationDelay: `${i * 120}ms`, animationFillMode: "both" as const }

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
                      "rounded-xs",
                      isSelected ? raisedSurface : "transition-colors duration-fast hover:bg-accent",
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
                +5 more cards
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface ThinkingTraceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "step" | "reasoning" | "search" | "coding"
  title: string
}

/** Paddock ThinkingTraceItem: one finished row with a slate check. */
function ThinkingTraceItem({ kind = "step", title, className, children, ...props }: ThinkingTraceItemProps) {
  return (
    <div data-kind={kind} className={cn("flex items-center gap-2", className)} {...props}>
      <Icon icon="mingcute:check-line" className="size-4 shrink-0 text-foreground" aria-hidden="true" />
      <span className="min-w-0 truncate text-[0.8125rem] font-medium text-foreground">{title}</span>
      {children && <span className="shrink-0 text-xs text-muted-foreground">{children}</span>}
    </div>
  )
}

export { ThinkingTrace, ThinkingTraceItem }
export type { TraceVariant }
