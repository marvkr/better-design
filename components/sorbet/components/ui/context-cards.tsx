"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ContextCards: retrieved knowledge chunks with their sources. Cards enter
// once, source chips pop in after, then everything remains available.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <ContextCards />
//   <ContextCards label="All chunks" count={32} chunks={...} />

interface ContextChunk {
  title: string
  chars: string
  body: string
  source: string
  /** File kind badge, e.g. "PDF" or "CSV". */
  badge: string
}

const DEFAULT_CHUNKS: ContextChunk[] = [
  {
    title: "Vendor onboarding rule",
    chars: "290 characters",
    body: "Cold-chain certification must be verified before a new dairy can be added to the reorder workflow.",
    source: "Dairy Onboarding SOP.pdf",
    badge: "PDF",
  },
  {
    title: "Seasonal demand row",
    chars: "1,250 characters",
    body: "Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",
    source: "Sales Velocity Export.csv",
    badge: "CSV",
  },
]

const BADGE_TONES = ["bg-destructive", "bg-[color:var(--chart-2)]", "bg-primary"]

interface ContextCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  count?: number
  chunks?: ContextChunk[]
}

function ContextCards({
  label = "All chunks",
  count = 32,
  chunks = DEFAULT_CHUNKS,
  className,
  ...props
}: ContextCardsProps) {
  const [chipsShown, setChipsShown] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setChipsShown(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={cn("flex w-full max-w-[23.75rem] flex-col gap-2", className)} {...props}>
      <div className="flex items-center gap-2 px-0.5" style={{ animation: "bui-fade-in 400ms ease-out both" }}>
        <span className="text-[0.8125rem] font-semibold text-foreground">{label}</span>
        <span className="inline-flex h-5 items-center rounded-md border border-border bg-muted px-1.5 text-[0.7188rem] font-medium text-foreground/70 tabular-nums">
          {count}
        </span>
      </div>

      {chunks.map((chunk, i) => (
        <div
          key={chunk.title}
          className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          style={{ animation: `bui-fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${i * 100}ms both` }}
        >
          <div className="flex items-center gap-2.5 border-b border-border px-3 py-2">
            <span className="flex min-w-0 items-center gap-1.5 text-[0.8125rem] font-medium text-foreground">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
              <span className="truncate">{chunk.title}</span>
            </span>
            <span className="ml-auto shrink-0 text-[0.75rem] text-muted-foreground tabular-nums">{chunk.chars}</span>
          </div>
          <p className="px-3 pt-2 pb-1 text-[0.7813rem] leading-relaxed text-foreground/70">{chunk.body}</p>
          <div className="px-3 pb-3">
            <span
              className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-muted px-2 text-[0.75rem] font-medium text-foreground/70 transition-[opacity,transform,background-color] duration-slow hover:bg-accent"
              style={{
                opacity: chipsShown ? 1 : 0,
                transform: chipsShown ? "scale(1)" : "scale(0.95)",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <span
                className={cn(
                  "flex size-3.5 items-center justify-center rounded-[0.25rem] text-[0.4375rem] font-bold text-background",
                  BADGE_TONES[i % BADGE_TONES.length],
                )}
              >
                {chunk.badge}
              </span>
              {chunk.source}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </span>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes bui-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

// Standalone card kept for the showcase bundle contract.
interface ContextCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  chars?: number
  source?: { kind: string; name: string }
}

function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)} {...props}>
      <div className="flex items-center gap-2.5 border-b border-border px-3 py-2">
        <span className="min-w-0 truncate text-[0.8125rem] font-medium text-foreground">{title}</span>
        {chars !== undefined && (
          <span className="ml-auto shrink-0 text-[0.75rem] text-muted-foreground tabular-nums">
            {chars.toLocaleString()} characters
          </span>
        )}
      </div>
      {children && <p className="px-3 pt-2 pb-1 text-[0.7813rem] leading-relaxed text-foreground/70">{children}</p>}
      {source && (
        <div className="px-3 pb-3">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-muted px-2 text-[0.75rem] font-medium text-foreground/70">
            <span className="flex size-3.5 items-center justify-center rounded-[0.25rem] bg-primary text-[0.4375rem] font-bold text-primary-foreground">
              {source.kind}
            </span>
            {source.name}
          </span>
        </div>
      )}
    </div>
  )
}

export { ContextCards, ContextCard }
export type { ContextChunk }
