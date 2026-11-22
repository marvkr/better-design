"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ink mail ThinkingTrace: an agent's working trace that plays once, settles
// and stays expandable. Four variants share one hairline rail:
//   Steps      a step list: a spinner on the live row, muted checks behind it
//   Reasoning  short prose that opens, then folds away
//   Search     the query, then the sources read
//   Coding     the tools run: files read, edits with their line counts, commands
// The header label shimmers in grey ink while the agent works and settles to
// a quiet summary when it is done.
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

type TraceVariantName = "Steps" | "Reasoning" | "Search" | "Coding"

const VARIANTS = {
  Steps: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Reading the bounce log" },
      { primary: "Grouping failed recipients", secondary: "3 domains" },
      { primary: "Checking the DNS records" },
      { primary: "Drafting the retry plan" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Most bounces come from one receiving domain, so the sender record is the likely cause." },
      { primary: "I should pause the batch before retrying, or the same messages bounce again." },
    ],
  },
  Search: {
    active: "Searching the web",
    done: "Searched the web",
    query: "SPF record syntax",
    rows: [
      { primary: "Sender policy guide", secondary: "example.com", href: "https://example.com/" },
      { primary: "DNS record reference", secondary: "example.org", href: "https://example.org/" },
      { primary: "Mail authentication notes", secondary: "example.net", href: "https://example.net/" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "webhooks.ts", mono: true },
      { primary: "Edit", secondary: "send-batch.ts", mono: true, add: 74, del: 41 },
      { primary: "Run", secondary: "bun run test", mono: true },
    ],
  },
} satisfies Record<TraceVariantName, TraceVariant>

const RISE = "ink-trace-rise 300ms cubic-bezier(0.23, 1, 0.32, 1) both"

/** A source's mark: a small globe on the elevated surface step. */
function SourceDot() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground">
      <Icon icon="ph:globe" className="size-2.5" aria-hidden="true" />
    </span>
  )
}

interface ThinkingTraceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TraceVariantName
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
    <div key={variant} className={cn("flex min-h-30 w-full max-w-sm flex-col", className)} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className="-mx-1.5 flex w-fit items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-fast ease-out hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Icon
          icon="ph:sparkle"
          className={cn("size-4", working ? "text-foreground" : "text-muted-foreground")}
          aria-hidden="true"
        />
        {working ? (
          <span
            className="bg-clip-text text-[0.8125rem] font-medium whitespace-nowrap text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%)",
              backgroundSize: "200% 100%",
              animation: "ink-trace-shimmer 1.4s linear infinite",
            }}
          >
            {v.active}
          </span>
        ) : (
          <span
            className="text-[0.8125rem] font-medium whitespace-nowrap text-muted-foreground"
            style={{ animation: "ink-trace-fade 300ms ease-out both" }}
          >
            {v.done}
          </span>
        )}
        <Icon
          icon="ph:caret-down"
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-fast ease-out",
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
                <div
                  className="flex h-7 items-center gap-2 px-1.5"
                  style={{ animation: expanded ? RISE : undefined }}
                >
                  <Icon icon="ph:magnifying-glass" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="font-mono text-xs text-(--foreground-secondary)">{v.query}</span>
                </div>
              )}
              {v.rows.slice(0, visible).map((row, i) => {
                const content = (
                  <>
                    {variant === "Search" && <SourceDot />}
                    {variant === "Steps" &&
                      (i < visible - 1 || !working ? (
                        <Icon icon="ph:check" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="size-3 shrink-0 animate-spin rounded-full border-[0.09375rem] border-border border-t-foreground"
                        />
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
                const rowClass = "flex min-h-7 w-full items-center gap-2 rounded-md px-1.5 py-0.5 text-left"
                const animation = { animation: `ink-trace-rise 300ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 120}ms both` }

                if (variant === "Search") {
                  return (
                    <a
                      key={row.primary}
                      href={row.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(rowClass, "transition-colors duration-fast ease-out hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring")}
                      style={animation}
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
                        "transition-colors duration-fast ease-out focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring",
                        isSelected ? "bg-(--wash)" : "hover:bg-secondary",
                      )}
                      style={animation}
                    >
                      {content}
                    </button>
                  )
                }
                return (
                  <div key={row.primary} className={rowClass} style={animation}>
                    {content}
                  </div>
                )
              })}
              {variant === "Search" && stage >= 3 && (
                <span
                  className="px-1.5 text-xs text-muted-foreground"
                  style={{ animation: "ink-trace-fade 300ms ease-out both" }}
                >
                  +7 more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ink-trace-shimmer { to { background-position: -200% 0; } }
        @keyframes ink-trace-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ink-trace-rise { from { opacity: 0; transform: translateY(0.375rem); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

// A single settled trace row, for places that list one step on its own.
interface ThinkingTraceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "step" | "reasoning" | "search" | "coding"
  title: string
}

function ThinkingTraceItem({ kind = "step", title, className, children, ...props }: ThinkingTraceItemProps) {
  return (
    <div data-kind={kind} className={cn("flex items-center gap-2", className)} {...props}>
      <Icon icon="ph:check" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="min-w-0 truncate text-[0.8125rem] font-medium text-foreground">{title}</span>
      {children && <span className="shrink-0 text-xs text-muted-foreground">{children}</span>}
    </div>
  )
}

export { ThinkingTrace, ThinkingTraceItem }
export type { TraceVariant }
