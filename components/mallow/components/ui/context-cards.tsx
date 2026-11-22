"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { selectedOption, optionTrack } from "./_shared"

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
    title: "Refund window",
    chars: "312 characters",
    body: "Orders can be returned within 30 days. The refund reaches the original payment method in 3 to 5 working days.",
    source: "policies/returns.md",
    badge: "MD",
  },
  {
    title: "Shipping rates",
    chars: "1,084 characters",
    body: "Standard delivery is free above 40 units. Express delivery adds a flat fee and arrives the next working day.",
    source: "rates/shipping.csv",
    badge: "CSV",
  },
]

/** Each chunk is a chosen option, violet tint in a violet ring, on the list's track. */
const chunkCard = cn(selectedOption, "overflow-hidden rounded-xl")

/** The source chip: a lilac tag fill, with the path in Geist Mono. */
const sourceChip =
  "inline-flex h-7 max-w-full items-center gap-1.5 rounded-full bg-(--tag) ps-1.5 pe-2.5 font-mono text-xs text-muted-foreground"

/** The file kind: a small uppercase tag inside the source chip. */
const kindTag = "rounded-full bg-foreground/10 px-1.5 font-sans text-xs font-medium text-foreground"

/** The chunk title row: a hash, the title and its length. */
function ChunkHeader({ title, chars }: { title: string; chars?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-3.5">
      <Icon icon="iconoir:hashtag" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="min-w-0 truncate text-sm font-medium text-foreground">{title}</span>
      {chars && <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">{chars}</span>}
    </div>
  )
}

interface ContextCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  count?: number
  chunks?: ContextChunk[]
}

/**
 * Mallow ContextCards: retrieved chunks as violet-ringed panels on one lilac
 * option track, each ending in a lilac chip that names its source file.
 */
function ContextCards({
  label = "All chunks",
  count = 24,
  chunks = DEFAULT_CHUNKS,
  className,
  ...props
}: ContextCardsProps) {
  const reduceMotion = useReducedMotion() ?? false
  const [chipsShown, setChipsShown] = React.useState(reduceMotion)

  React.useEffect(() => {
    if (reduceMotion) {
      setChipsShown(true)
      return
    }
    const t = setTimeout(() => setChipsShown(true), 700)
    return () => clearTimeout(t)
  }, [reduceMotion])

  return (
    <div data-slot="context-cards" className={cn("flex w-full max-w-sm flex-col gap-2.5", className)} {...props}>
      <div className="flex items-center gap-2 px-1">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="inline-flex h-6 items-center rounded-full bg-(--tag) px-2 text-xs tabular-nums text-muted-foreground">
          {count}
        </span>
      </div>

      <div className={cn(optionTrack, "flex flex-col gap-1 rounded-2xl p-1")}>
        {chunks.map((chunk) => (
          <article
            key={chunk.title}
            className={cn(chunkCard, "animate-in fade-in slide-in-from-bottom-1 duration-slow motion-reduce:animate-none")}
          >
            <ChunkHeader title={chunk.title} chars={chunk.chars} />
            <p className="px-4 pt-1.5 pb-3 text-sm leading-relaxed text-muted-foreground">{chunk.body}</p>
            <div className="px-4 pb-4">
              <span
                className={cn(
                  sourceChip,
                  "transition-opacity duration-slow ease-(--ease-out) motion-reduce:transition-none",
                  chipsShown ? "opacity-100" : "opacity-0",
                )}
              >
                <span className={kindTag}>{chunk.badge}</span>
                <span className="min-w-0 truncate text-foreground">{chunk.source}</span>
                <Icon icon="iconoir:arrow-up-right" className="size-3.5 shrink-0" aria-hidden="true" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

interface ContextCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  chars?: number
  source?: { kind: string; name: string }
}

/** Mallow ContextCard: one retrieved chunk on its own violet-ringed panel. */
function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <article data-slot="context-card" className={cn(chunkCard, className)} {...props}>
      <ChunkHeader title={title} chars={chars !== undefined ? `${chars.toLocaleString()} characters` : undefined} />
      {children && <p className="px-4 pt-1.5 pb-3 text-sm leading-relaxed text-muted-foreground">{children}</p>}
      {source && (
        <div className="px-4 pb-4">
          <span className={sourceChip}>
            <span className={kindTag}>{source.kind}</span>
            <span className="min-w-0 truncate text-foreground">{source.name}</span>
          </span>
        </div>
      )}
      {!source && !children && <div className="pb-3.5" />}
    </article>
  )
}

export { ContextCards, ContextCard }
export type { ContextChunk }
