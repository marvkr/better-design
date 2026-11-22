"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// ContextCards: retrieved knowledge chunks with their sources, the way an
// assistant on a developer platform shows what it read before it answered.
// The cards enter once, the source chips appear after, then everything
// stays in place.
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
    title: "Bounce handling rule",
    chars: "290 characters",
    body: "A hard bounce suppresses the address at once. A soft bounce retries three times over 72 hours before it is suppressed.",
    source: "Sending policy.pdf",
    badge: "PDF",
  },
  {
    title: "Domain warm-up row",
    chars: "1,250 characters",
    body: "Week 1: 50 sends a day. Week 2: 500. Week 3: 5,000. Hold the volume when the bounce rate passes 2%.",
    source: "Warm-up schedule.csv",
    badge: "CSV",
  },
]

interface ContextCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  count?: number
  chunks?: ContextChunk[]
}

/** The small mono file-kind mark inside a source chip. Neutral: colour is kept for status. */
function KindMark({ kind }: { kind: string }) {
  return (
    <span className="flex h-4 items-center rounded-sm border border-(--line-strong) bg-muted px-1 font-mono text-[0.625rem] font-medium leading-none text-(--foreground-secondary)">
      {kind}
    </span>
  )
}

/**
 * Ink mail ContextCards: a header with the chunk count, then one card per
 * chunk. Each card is the card step of luminance behind a hairline, with
 * the title and its size in a hairline-split top row, the excerpt in the
 * secondary ink, and a pill naming the source file.
 */
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
    <div className={cn("flex w-full max-w-sm flex-col gap-2", className)} {...props}>
      <div className="flex items-center gap-2 px-0.5 animate-in fade-in-0 duration-slow fill-mode-both">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="inline-flex h-5 items-center rounded-full border border-(--line-strong) bg-secondary px-2 font-mono text-xs text-(--foreground-secondary) tabular-nums">
          {count}
        </span>
      </div>

      {chunks.map((chunk, i) => (
        <div
          key={chunk.title}
          className="overflow-hidden rounded-lg border border-border bg-card animate-in fade-in-0 slide-in-from-bottom-2 duration-slow ease-out fill-mode-both"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
            <span className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-foreground">
              <Icon icon="ph:file-text" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="truncate">{chunk.title}</span>
            </span>
            <span className="ms-auto shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
              {chunk.chars}
            </span>
          </div>
          <p className="px-4 pt-3 pb-2 text-sm leading-relaxed text-(--foreground-secondary)">{chunk.body}</p>
          <div className="px-4 pb-4">
            <span
              className={cn(
                "inline-flex h-6 items-center gap-1.5 rounded-full border border-(--line-strong) bg-secondary ps-1 pe-2 text-xs font-medium text-(--foreground-secondary)",
                "transition-[opacity,scale,background-color] duration-slow ease-out hover:bg-muted",
                chipsShown ? "scale-100 opacity-100" : "scale-95 opacity-0",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <KindMark kind={chunk.badge} />
              {chunk.source}
              <Icon icon="ph:arrow-up-right" className="size-3 text-muted-foreground" aria-hidden="true" />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Standalone card kept for the showcase bundle contract.
interface ContextCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  chars?: number
  source?: { kind: string; name: string }
}

/** Ink mail ContextCard: one chunk card on its own, with an optional size and source. */
function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
        <span className="min-w-0 truncate text-sm font-medium text-foreground">{title}</span>
        {chars !== undefined && (
          <span className="ms-auto shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            {chars.toLocaleString()} characters
          </span>
        )}
      </div>
      {children && <p className="px-4 pt-3 pb-2 text-sm leading-relaxed text-(--foreground-secondary)">{children}</p>}
      {source && (
        <div className="px-4 pb-4">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-(--line-strong) bg-secondary ps-1 pe-2 text-xs font-medium text-(--foreground-secondary)">
            <KindMark kind={source.kind} />
            {source.name}
          </span>
        </div>
      )}
    </div>
  )
}

export { ContextCards, ContextCard }
export type { ContextChunk }
