"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// ContextCards: retrieved docs chunks with their source pages, laid out like
// search results in a knowledge base. Cards enter once, source chips follow,
// then everything stays.
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

const BADGE_TONES = [
  "bg-(--primary-wash) text-(--primary-text)",
  "bg-(--info-tint) text-(--info-text)",
  "bg-(--warning-tint) text-(--warning-text)",
]

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
      <div className="flex animate-in fade-in items-center gap-2 px-0.5 duration-slow">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="inline-flex h-5 items-center rounded-full bg-secondary px-2 text-xs font-medium text-muted-foreground tabular-nums">
          {count}
        </span>
      </div>

      {chunks.map((chunk, i) => (
        <div
          key={chunk.title}
          className="animate-in fade-in slide-in-from-bottom-1 overflow-hidden rounded-xl border border-border bg-card duration-slow"
          style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2 px-4 pt-3">
            <Icon icon="feather:hash" className="size-3.5 shrink-0 text-(--primary-text)" aria-hidden="true" />
            <span className="min-w-0 truncate text-sm font-semibold text-foreground">{chunk.title}</span>
            <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">{chunk.chars}</span>
          </div>
          <p className="px-4 pt-1.5 pb-2 text-[0.8125rem] leading-relaxed text-(--foreground-secondary)">{chunk.body}</p>
          <div className="px-4 pb-3">
            <span
              className={cn(
                "inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-background px-2 font-mono text-xs text-(--foreground-secondary) transition-[opacity,scale] duration-slow ease-out hover:bg-secondary",
                chipsShown ? "scale-100 opacity-100" : "scale-95 opacity-0",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className={cn(
                  "rounded-sm px-1 font-sans text-[0.625rem] font-semibold",
                  BADGE_TONES[i % BADGE_TONES.length],
                )}
              >
                {chunk.badge}
              </span>
              {chunk.source}
              <Icon icon="feather:arrow-up-right" className="size-3 text-muted-foreground" aria-hidden="true" />
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

function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)} {...props}>
      <div className="flex items-center gap-2 px-4 pt-3">
        <Icon icon="feather:hash" className="size-3.5 shrink-0 text-(--primary-text)" aria-hidden="true" />
        <span className="min-w-0 truncate text-sm font-semibold text-foreground">{title}</span>
        {chars !== undefined && (
          <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">
            {chars.toLocaleString()} characters
          </span>
        )}
      </div>
      {children && <p className="px-4 pt-1.5 pb-2 text-[0.8125rem] leading-relaxed text-(--foreground-secondary)">{children}</p>}
      {source && (
        <div className="px-4 pb-3">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border bg-background px-2 font-mono text-xs text-(--foreground-secondary)">
            <span className="rounded-sm bg-(--primary-wash) px-1 font-sans text-[0.625rem] font-semibold text-(--primary-text)">
              {source.kind}
            </span>
            {source.name}
          </span>
        </div>
      )}
      {!source && !children && <div className="pb-3" />}
    </div>
  )
}

export { ContextCards, ContextCard }
export type { ContextChunk }
