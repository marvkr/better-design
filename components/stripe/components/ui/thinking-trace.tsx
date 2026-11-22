"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ThinkingTrace: expandable agent trace with staged playback, four variants:
//   Steps      step list with spinner then muted checks
//   Reasoning  prose reasoning that expands, then settles
//   Search     web-search trace: query plus sources read
//   Coding     tool trace: files read, edits, commands
// The trace runs once, settles, and remains expandable.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
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
      { primary: "Reading flavor briefs" },
      { primary: "Scanning supplier lists" },
      { primary: "Comparing tasting notes", secondary: "6 flavors" },
      { primary: "Writing the scoop report" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Summer demand spikes for stone-fruit flavors: peach and apricot lead." },
      { primary: "I should check cone inventory before promoting a waffle-bowl special." },
    ],
  },
  Search: {
    active: "Searching the web",
    done: "Searched the web",
    query: "best waffle cone supplier",
    rows: [
      { primary: "Joy Cone", secondary: "joycone.com", href: "https://joycone.com/" },
      { primary: "WebstaurantStore", secondary: "webstaurantstore.com", href: "https://www.webstaurantstore.com/" },
      { primary: "The Konery", secondary: "thekonery.com", href: "https://www.thekonery.com/" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "flavors.ts", mono: true },
      { primary: "Edit", secondary: "ChurnSchedule.tsx", mono: true, add: 74, del: 41 },
      { primary: "Run", secondary: "npm run freeze", mono: true },
    ],
  },
}

function SourceDot({ index }: { index: number }) {
  const tones = ["bg-primary", "bg-muted-foreground", "bg-foreground"]
  return (
    <span
      className={cn(
        "flex size-3.5 shrink-0 items-center justify-center rounded-full text-background",
        tones[index % 3],
      )}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
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
        className="-mx-1.5 flex w-fit items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={working ? "text-foreground/70" : "text-muted-foreground"} aria-hidden="true">
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
        </svg>
        {working ? (
          <span
            className="bg-clip-text text-[0.8125rem] font-medium whitespace-nowrap text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%)",
              backgroundSize: "200% 100%",
              animation: "bui-shimmer-text 1.4s linear infinite",
            }}
          >
            {v.active}
          </span>
        ) : (
          <span
            className="text-[0.8125rem] font-medium whitespace-nowrap text-foreground/70"
            style={{ animation: "bui-fade-in 350ms ease-out both" }}
          >
            {v.done}
          </span>
        )}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          className="text-muted-foreground transition-transform duration-slow"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)" }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-slow"
        style={{
          gridTemplateRows: expanded ? "1fr" : "0fr",
          opacity: expanded ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="relative mt-1 ml-[0.3125rem] border-l border-border pl-4">
            <div className="flex flex-col gap-1 py-1">
              {v.query && (
                <div className="flex h-6 items-center gap-2 px-1.5" style={{ animation: expanded ? "bui-fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" : undefined }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                  <span className="text-[0.7813rem] text-foreground/70">{v.query}</span>
                </div>
              )}
              {v.rows.slice(0, visible).map((row, i) => {
                const content = (
                  <>
                    {variant === "Search" && <SourceDot index={i} />}
                    {variant === "Steps" &&
                      (i < visible - 1 || !working ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <span className="size-3 shrink-0 animate-spin rounded-full border-[0.0938rem] border-border border-t-foreground/70" />
                      ))}
                    <span
                      className={cn(
                        "min-w-0 truncate text-[0.7813rem]",
                        variant === "Reasoning"
                          ? "whitespace-normal leading-relaxed text-foreground/70"
                          : "font-medium text-foreground",
                      )}
                    >
                      {row.primary}
                    </span>
                    {row.secondary && (
                      <span className={cn("shrink-0 text-[0.7188rem] text-muted-foreground", row.mono && "font-mono")}>
                        {row.secondary}
                      </span>
                    )}
                    {row.add !== undefined && (
                      <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums">
                        <span className="text-[color:var(--chart-2)]">+{row.add}</span>{" "}
                        <span className="text-destructive">-{row.del}</span>
                      </span>
                    )}
                  </>
                )
                const rowClass = "flex min-h-7 w-full items-center gap-2 rounded-[0.375rem] px-1.5 py-0.5 text-left"
                const animation = { animation: `bui-fade-up 320ms cubic-bezier(0.23,1,0.32,1) ${i * 120}ms both` }

                if (variant === "Search") {
                  return (
                    <a
                      key={row.primary}
                      href={row.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(rowClass, "transition-colors duration-fast hover:bg-accent")}
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
                      className={cn(rowClass, "transition-colors duration-fast", isSelected ? "bg-muted" : "hover:bg-accent")}
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
                <span className="text-[0.75rem] text-muted-foreground" style={{ animation: "bui-fade-in 300ms ease-out both" }}>
                  +7 more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bui-shimmer-text { to { background-position: -200% 0; } }
        @keyframes bui-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

// Back-compat named export used by the showcase bundle: a single trace row is
// not part of the Beautiful UI source, so it renders a one-row Steps trace.
interface ThinkingTraceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "step" | "reasoning" | "search" | "coding"
  title: string
}

function ThinkingTraceItem({ kind = "step", title, className, children, ...props }: ThinkingTraceItemProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span className="min-w-0 truncate text-[0.7813rem] font-medium text-foreground">{title}</span>
      {children && <span className="shrink-0 text-[0.7188rem] text-muted-foreground">{children}</span>}
    </div>
  )
}

export { ThinkingTrace, ThinkingTraceItem }
export type { TraceVariant }
