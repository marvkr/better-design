"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, raisedBevel } from "./_shared"

// ContextCards: retrieved chunks with their source files, laid out like
// search results. Cards enter once, source chips follow, then everything
// stays.
//
// Usage:
//   <ContextCards />
//   <ContextCards label="All chunks" count={32} chunks={...} />

interface ContextChunk {
  title: string
  chars: string
  body: string
  source: string
  /** File kind badge, such as "MDX" or "YAML". */
  badge: string
}

const DEFAULT_CHUNKS: ContextChunk[] = [
  {
    title: "Authentication",
    chars: "290 characters",
    body: "Send the API key in the Authorization header as a bearer token. Keys are scoped to one project.",
    source: "guides/authentication.mdx",
    badge: "MDX",
  },
  {
    title: "Rate limits",
    chars: "1,250 characters",
    body: "Each key may make 100 requests per minute. A 429 response carries a Retry-After header in seconds.",
    source: "openapi.yaml",
    badge: "YAML",
  },
]

/** File badges cycle through the warm lights, each a faint wash of its own hue. */
const BADGE_TONES = [
  "bg-glow/15 text-primary-text",
  "bg-ember/15 text-ember",
  "bg-flame/15 text-flame",
]

/** The slab every chunk sits on: an umber card with a 1.25rem corner. */
const chunkCard = cn(cardSlab, "overflow-hidden rounded-xl")

/** The source chip: a small graphite bevel pill. */
const sourceChip = cn(
  raisedBevel,
  "inline-flex h-7 items-center gap-1.5 rounded-full ps-1.5 pe-2.5 font-mono text-xs tracking-normal text-muted-foreground",
)

/** The chunk title row: a copper hash, the title and its length. */
function ChunkHeader({ title, chars }: { title: string; chars?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-3.5">
      <Icon icon="ph:hash" className="size-3.5 shrink-0 text-primary-text" aria-hidden="true" />
      <span className="min-w-0 truncate text-sm font-semibold text-foreground">{title}</span>
      {chars && (
        <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">{chars}</span>
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
 * Burnished ContextCards: each retrieved chunk is an umber slab with a
 * copper hash, and its source rises below as a graphite bevel chip.
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
    <div className={cn("flex w-full max-w-[23.75rem] flex-col gap-2.5", className)} {...props}>
      <div className="flex animate-in fade-in items-center gap-2 px-0.5 duration-slow">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="inline-flex h-5.5 items-center rounded-full bg-muted px-2 text-xs font-semibold text-muted-foreground tabular-nums">
          {count}
        </span>
      </div>

      {chunks.map((chunk, i) => (
        <div
          key={chunk.title}
          className={cn(chunkCard, "animate-in fade-in slide-in-from-bottom-1 duration-slow")}
          style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
        >
          <ChunkHeader title={chunk.title} chars={chunk.chars} />
          <p className="px-4 pt-1.5 pb-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{chunk.body}</p>
          <div className="px-4 pb-3.5">
            <span
              className={cn(
                sourceChip,
                "transition-[opacity,scale,box-shadow] duration-slow ease-(--ease-out)",
                chipsShown ? "scale-100 opacity-100" : "scale-95 opacity-0",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className={cn(
                  "rounded-full px-1.5 font-sans text-[0.625rem] font-semibold tracking-[0.016em]",
                  BADGE_TONES[i % BADGE_TONES.length],
                )}
              >
                {chunk.badge}
              </span>
              <span className="text-foreground/85">{chunk.source}</span>
              <Icon icon="ph:arrow-up-right" className="size-3 text-muted-foreground" aria-hidden="true" />
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

/** Burnished ContextCard: one retrieved chunk on its own umber slab. */
function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <div className={cn(chunkCard, className)} {...props}>
      <ChunkHeader
        title={title}
        chars={chars !== undefined ? `${chars.toLocaleString()} characters` : undefined}
      />
      {children && (
        <p className="px-4 pt-1.5 pb-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{children}</p>
      )}
      {source && (
        <div className="px-4 pb-3.5">
          <span className={sourceChip}>
            <span className="rounded-full bg-glow/15 px-1.5 font-sans text-[0.625rem] font-semibold tracking-[0.016em] text-primary-text">
              {source.kind}
            </span>
            <span className="text-foreground/85">{source.name}</span>
          </span>
        </div>
      )}
      {!source && !children && <div className="pb-3.5" />}
    </div>
  )
}

export { ContextCards, ContextCard }
export type { ContextChunk }
