"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// ThinkingTrace: an expandable agent trace with staged playback, in four
// variants, styled as an Airy docs assistant panel:
//   Steps      step list with a green spinner, then quiet checks
//   Reasoning  prose reasoning that expands, then settles
//   Search     a docs search: the query, then the pages read
//   Coding     a tool trace: files read, edits, commands
// The trace runs once, settles, and stays expandable.
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

const VARIANTS: Record<string, TraceVariant> = {
  Steps: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Reading the quickstart" },
      { primary: "Checking the auth guide" },
      { primary: "Comparing endpoints", secondary: "6 routes" },
      { primary: "Writing the answer" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "The user asks about pagination, so the list endpoints matter more than the webhooks page." },
      { primary: "The cursor parameter changed in v2, so the example should use the new name." },
    ],
  },
  Search: {
    active: "Searching the docs",
    done: "Searched the docs",
    query: "rate limits per API key",
    rows: [
      { primary: "Rate limits", secondary: "/api-reference/limits" },
      { primary: "Authentication", secondary: "/guides/auth" },
      { primary: "Errors and retries", secondary: "/api-reference/errors" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "openapi.yaml", mono: true },
      { primary: "Edit", secondary: "pagination.mdx", mono: true, add: 42, del: 17 },
      { primary: "Run", secondary: "docs build", mono: true },
    ],
  },
}

function SourceMark() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-(--primary-wash) text-(--primary-text)">
      <Icon icon="feather:hash" className="size-2.5" aria-hidden="true" />
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
  const v = data ?? VARIANTS[variant] ?? VARIANTS.Steps
  const autoExpanded = stage >= 1 && stage < 4
  const expanded = manualExpanded ?? autoExpanded
  const working = stage < 3
  const visible = stage < 2 ? 0 : stage === 2 ? Math.min(2, v.rows.length) : v.rows.length

  return (
    <div key={variant} className={cn("flex min-h-[7.5rem] w-full max-w-[23.75rem] flex-col", className)} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className="-mx-1.5 flex w-fit items-center gap-2 rounded-md px-1.5 py-1 outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
      >
        {working ? (
          <span aria-hidden="true" className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-muted border-t-primary" />
        ) : (
          <Icon icon="feather:book-open" className="size-3.5 shrink-0 text-(--primary-text)" aria-hidden="true" />
        )}
        {working ? (
          <span
            data-trace-shimmer=""
            className="whitespace-nowrap bg-clip-text text-[0.8125rem] font-medium text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%)",
              backgroundSize: "200% 100%",
            }}
          >
            {v.active}
          </span>
        ) : (
          <span className="animate-in fade-in whitespace-nowrap text-[0.8125rem] font-medium text-(--foreground-secondary) duration-slow">
            {v.done}
          </span>
        )}
        <Icon
          icon="feather:chevron-down"
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-base",
            expanded && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="relative mt-1 ml-2 border-l border-border pl-4">
            <div className="flex flex-col gap-0.5 py-1">
              {v.query && (
                <div className="flex h-7 items-center gap-2 rounded-full bg-secondary px-2.5 text-xs text-(--foreground-secondary)">
                  <Icon icon="feather:search" className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="truncate">{v.query}</span>
                </div>
              )}
              {v.rows.slice(0, visible).map((row, i) => {
                const content = (
                  <>
                    {variant === "Search" && <SourceMark />}
                    {variant === "Steps" &&
                      (i < visible - 1 || !working ? (
                        <Icon icon="feather:check" className="size-3.5 shrink-0 text-(--primary-text)" aria-hidden="true" />
                      ) : (
                        <span className="size-3 shrink-0 animate-spin rounded-full border-2 border-muted border-t-primary" />
                      ))}
                    <span
                      className={cn(
                        "min-w-0 truncate text-[0.8125rem]",
                        variant === "Reasoning"
                          ? "whitespace-normal leading-relaxed text-(--foreground-secondary)"
                          : "font-medium text-foreground",
                      )}
                    >
                      {row.primary}
                    </span>
                    {row.secondary && (
                      <span className={cn("shrink-0 text-xs text-muted-foreground", (row.mono || variant === "Search") && "font-mono")}>
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
                const rowClass =
                  "flex min-h-7 w-full animate-in fade-in slide-in-from-bottom-1 items-center gap-2 rounded-md px-1.5 py-0.5 text-left outline-none duration-slow focus-visible:ring-3 focus-visible:ring-ring"
                const delay = { animationDelay: `${i * 120}ms`, animationFillMode: "both" as const }

                if (variant === "Search") {
                  return (
                    <a
                      key={row.primary}
                      href={row.href ?? "#"}
                      className={cn(rowClass, "transition-colors duration-fast hover:bg-secondary")}
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
                        isSelected ? "bg-(--primary-wash)" : "hover:bg-secondary",
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
                <span className="animate-in fade-in px-1.5 text-xs text-muted-foreground duration-slow">
                  +7 more pages
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes airy-trace-shimmer { to { background-position: -200% 0; } }
        [data-trace-shimmer] { animation: airy-trace-shimmer 1.4s linear infinite; }
        @media (prefers-reduced-motion: reduce) { [data-trace-shimmer] { animation: none; } }
      `}</style>
    </div>
  )
}

// A single trace row, kept as a named export for the showcase bundle.
interface ThinkingTraceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "step" | "reasoning" | "search" | "coding"
  title: string
}

function ThinkingTraceItem({ kind = "step", title, className, children, ...props }: ThinkingTraceItemProps) {
  return (
    <div data-kind={kind} className={cn("flex items-center gap-2", className)} {...props}>
      <Icon icon="feather:check" className="size-3.5 shrink-0 text-(--primary-text)" aria-hidden="true" />
      <span className="min-w-0 truncate text-[0.8125rem] font-medium text-foreground">{title}</span>
      {children && <span className="shrink-0 text-xs text-muted-foreground">{children}</span>}
    </div>
  )
}

export { ThinkingTrace, ThinkingTraceItem }
export type { TraceVariant }
