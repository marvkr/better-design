"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// ContextCards: the passages an assistant pulled in, each with the page it
// came from, laid out like the note list: a title row, a muted excerpt and
// a faint source line. Cards enter once, source chips follow, then stay.
//
// Usage:
//   <ContextCards />
//   <ContextCards label="Passages used" count={14} chunks={...} />

interface ContextChunk {
  title: string
  chars: string
  body: string
  source: string
  /** File kind badge, such as "Note" or "CSV". */
  badge: string
}

const DEFAULT_CHUNKS: ContextChunk[] = [
  {
    title: "Launch plan",
    chars: "420 characters",
    body: "The public launch moves to the 14th so the onboarding checklist can ship first. Each owner confirms their item by Friday.",
    source: "Notebooks / Product / Launch plan",
    badge: "Note",
  },
  {
    title: "Weekly visits",
    chars: "1,180 characters",
    body: "Visits rose through the week and peaked on Thursday. The daily average sits a little above last month.",
    source: "Files / visits.csv",
    badge: "CSV",
  },
]

/** File badges cycle through Margin's soft status tints. */
const BADGE_TONES = [
  "bg-(--mark) text-(--mark-foreground)",
  "bg-success/12 text-success-text",
  "bg-warning/15 text-warning-text",
]

/** The sheet every passage sits on: white, one hairline, a 0.75rem corner. */
const chunkCard = "overflow-hidden rounded-xl border border-border bg-card text-card-foreground"

/** The source chip: a small paper tab with a hairline ring. */
const sourceChip =
  "inline-flex h-6.5 max-w-full items-center gap-1.5 rounded-lg bg-card ps-1 pe-2 text-xs text-muted-foreground shadow-sm"

/** The passage title row: a document glyph, the title and its length. */
function ChunkHeader({ title, chars }: { title: string; chars?: string }) {
  return (
    <div className="flex items-center gap-2 px-3.5 pt-3">
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{title}</span>
      {chars && (
        <span className="ms-auto flex shrink-0 items-center gap-1 text-xs tabular-nums text-muted-foreground">
          <Icon icon="solar:text-field-linear" className="size-3.5" aria-hidden="true" />
          {chars}
        </span>
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
 * Margin ContextCards: each passage is a white sheet in the note-list
 * pattern, and its source arrives below as a paper tab with a tinted
 * file badge.
 */
function ContextCards({
  label = "Passages used",
  count = 14,
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
    <section
      aria-label={label}
      data-slot="context-cards"
      className={cn("flex w-full max-w-md flex-col gap-2.5", className)}
      {...props}
    >
      <div className="flex animate-in items-center gap-2 px-0.5 fade-in duration-slow">
        <h3 className="text-sm font-semibold text-foreground">{label}</h3>
        <span className="inline-flex h-5 items-center rounded-sm bg-(--field) px-1.5 text-xs tabular-nums text-muted-foreground">
          {count}
        </span>
      </div>

      {chunks.map((chunk, i) => (
        <article
          key={chunk.title}
          className={cn(chunkCard, "animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-slow")}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <ChunkHeader title={chunk.title} chars={chunk.chars} />
          <p className="line-clamp-2 px-3.5 pt-1 pb-2.5 text-sm leading-snug text-muted-foreground">
            {chunk.body}
          </p>
          <div className="px-3.5 pb-3">
            <span
              className={cn(
                sourceChip,
                "transition duration-slow ease-(--ease-out)",
                chipsShown ? "scale-100 opacity-100" : "scale-95 opacity-0",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className={cn(
                  "flex h-4.5 items-center rounded-sm px-1 text-xs font-medium",
                  BADGE_TONES[i % BADGE_TONES.length],
                )}
              >
                {chunk.badge}
              </span>
              <span className="truncate text-foreground">{chunk.source}</span>
              <Icon icon="solar:arrow-right-up-linear" className="size-3.5 shrink-0" aria-hidden="true" />
            </span>
          </div>
        </article>
      ))}
    </section>
  )
}

// A standalone card, kept for the showcase bundle.
interface ContextCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  chars?: number
  source?: { kind: string; name: string }
}

/** Margin ContextCard: one passage on its own white sheet. */
function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <div className={cn(chunkCard, className)} {...props}>
      <ChunkHeader
        title={title}
        chars={chars !== undefined ? `${chars.toLocaleString()} characters` : undefined}
      />
      {children && (
        <p className="line-clamp-2 px-3.5 pt-1 pb-2.5 text-sm leading-snug text-muted-foreground">{children}</p>
      )}
      {source && (
        <div className="px-3.5 pb-3">
          <span className={sourceChip}>
            <span className="flex h-4.5 items-center rounded-sm bg-(--mark) px-1 text-xs font-medium text-(--mark-foreground)">
              {source.kind}
            </span>
            <span className="truncate text-foreground">{source.name}</span>
          </span>
        </div>
      )}
      {!source && !children && <div className="pb-3" />}
    </div>
  )
}

export { ContextCards, ContextCard }
export type { ContextChunk }
