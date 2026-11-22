"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab } from "./_shared"

// ContextCards: retrieved notes with their source files, each on a flat white
// card. Cards enter once, source chips follow, then everything stays.
//
// Usage:
//   <ContextCards />
//   <ContextCards label="All notes" count={18} chunks={...} />

interface ContextChunk {
  title: string
  chars: string
  body: string
  source: string
  /** File kind badge, such as "MD" or "CSV". */
  badge: string
}

const DEFAULT_CHUNKS: ContextChunk[] = [
  {
    title: "Review cadence",
    chars: "310 characters",
    body: "Every project in review gets a decision within two working days. The owner books the review when the stage changes.",
    source: "handbook/reviews.md",
    badge: "MD",
  },
  {
    title: "Due dates",
    chars: "980 characters",
    body: "A project turns urgent when its due date is under a week away and fewer than half of its tasks are done.",
    source: "settings/urgency.csv",
    badge: "CSV",
  },
]

/** File badges: the first takes the primary teal, the rest stay quiet white and green. */
const BADGE_TONES = [
  "bg-(--status-arrived)/14 text-(--status-arrived-text)",
  "bg-card text-secondary-foreground",
  "bg-success/12 text-success-text",
]

/** The card every chunk sits on: a white card with a 1px cool border. */
const chunkCard = cn(cardSlab, "overflow-hidden rounded-xl")

/** The source chip: a quiet cool grey tag in mono. */
const sourceChip =
  "inline-flex h-6 items-center gap-1.5 rounded-sm bg-secondary ps-1 pe-2.5 font-mono text-xs text-secondary-foreground"

/** The chunk title row: a hash, the title and its length. */
function ChunkHeader({ title, chars }: { title: string; chars?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-3.5">
      <Icon icon="mingcute:hashtag-line" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="min-w-0 truncate text-[0.9375rem] font-semibold text-foreground">{title}</span>
      {chars && (
        <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">{chars}</span>
      )}
    </div>
  )
}

interface ContextCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  count?: number
  chunks?: ContextChunk[]
}

/**
 * Paddock ContextCards: a column header with a count, then each retrieved
 * note as a white card whose source sits below as a grey tag chip.
 */
function ContextCards({
  label = "All notes",
  count = 18,
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
    <div className={cn("flex w-full max-w-md flex-col gap-2.5 rounded-2xl bg-muted p-2.5", className)} {...props}>
      <div className="flex animate-in fade-in items-center gap-2 px-1.5 pt-1 duration-slow">
        <span className="text-[0.9375rem] font-semibold text-foreground">{label}</span>
        <span className="text-[0.8125rem] tabular-nums text-muted-foreground">{count}</span>
      </div>

      {chunks.map((chunk, i) => (
        <div
          key={chunk.title}
          className={cn(chunkCard, "animate-in fade-in slide-in-from-bottom-1 duration-slow")}
          style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
        >
          <ChunkHeader title={chunk.title} chars={chunk.chars} />
          <p className="px-4 pt-1.5 pb-3 text-[0.8125rem] text-muted-foreground">{chunk.body}</p>
          <div className="border-t border-border px-4 py-3">
            <span
              className={cn(
                sourceChip,
                "transition-[opacity,scale] duration-slow ease-out",
                chipsShown ? "scale-100 opacity-100" : "scale-95 opacity-0",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className={cn(
                  "rounded-sm px-1.5 font-sans text-xs font-medium",
                  BADGE_TONES[i % BADGE_TONES.length],
                )}
              >
                {chunk.badge}
              </span>
              <span>{chunk.source}</span>
              <Icon icon="mingcute:arrow-right-up-line" className="size-3 text-muted-foreground" aria-hidden="true" />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// A standalone card, kept for the showcase bundle.
interface ContextCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  chars?: number
  source?: { kind: string; name: string }
}

/** Paddock ContextCard: one retrieved note on its own white card. */
function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <div className={cn(chunkCard, className)} {...props}>
      <ChunkHeader
        title={title}
        chars={chars !== undefined ? `${chars.toLocaleString()} characters` : undefined}
      />
      {children && (
        <p className="px-4 pt-1.5 pb-3 text-[0.8125rem] text-muted-foreground">{children}</p>
      )}
      {source && (
        <div className="border-t border-border px-4 py-3">
          <span className={sourceChip}>
            <span className="rounded-sm bg-(--status-arrived)/14 px-1.5 font-sans text-xs font-medium text-(--status-arrived-text)">
              {source.kind}
            </span>
            <span>{source.name}</span>
          </span>
        </div>
      )}
      {!source && !children && <div className="pb-3.5" />}
    </div>
  )
}

export { ContextCards, ContextCard }
export type { ContextChunk }
