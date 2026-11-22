"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"

// StreamingText: an assistant's answer arrives word by word, a source chip
// lands inline where it is cited, then the actions, a sources list and
// follow-up questions become usable.
//
// Usage:
//   <StreamingText />
//   <StreamingText text="Custom answer text." followUps={["Ask more"]} />

const WORD_MS = 75
const HOLD_MS = 3400

interface StreamingSource {
  name: string
  host: string
  href?: string
}

const DEFAULT_TEXT =
  "Your meeting notes from this week point to two open items: the onboarding checklist still needs an owner, and the launch date moved to the 14th. Three pages mention the new pricing table."

const DEFAULT_FOLLOW_UPS = [
  "Draft an agenda for the next sync",
  "List every task without an owner",
]

const DEFAULT_SOURCES: StreamingSource[] = [
  { name: "Weekly sync", host: "notes.example.com" },
  { name: "Launch plan", host: "docs.example.com" },
  { name: "Pricing draft", host: "wiki.example.com" },
]

const ACTIONS = [
  { label: "Copy answer", icon: "solar:copy-linear" },
  { label: "Try again", icon: "solar:restart-linear" },
  { label: "Good answer", icon: "solar:like-linear" },
  { label: "Poor answer", icon: "solar:dislike-linear" },
]

/** A small oxblood initial standing in for a source's logo. */
function SourceMark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-sm bg-(--mark) font-semibold text-(--mark-foreground)",
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  )
}

interface StreamingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  sources?: StreamingSource[]
  /** Total source count shown next to the avatar stack. */
  totalSources?: number
  followUps?: string[]
  /** Word index after which the inline citation chip appears. */
  citeAfterWord?: number
  onFollowUp?: (item: string) => void
}

/**
 * Margin StreamingText: an answer in body text with an oxblood caret while it
 * streams, a tinted source chip inline, then quiet icon actions, a sources
 * list that folds open and hairline-separated follow-up rows.
 */
function StreamingText({
  text = DEFAULT_TEXT,
  sources = DEFAULT_SOURCES,
  totalSources = 6,
  followUps = DEFAULT_FOLLOW_UPS,
  citeAfterWord = 21,
  onFollowUp,
  className,
  ...props
}: StreamingTextProps) {
  const tokens = React.useMemo(() => {
    const words = text.split(" ").map((word) => ({ text: word, cite: false }))
    if (citeAfterWord > 0 && citeAfterWord <= words.length) {
      words.splice(citeAfterWord, 0, { text: "", cite: true })
    }
    return words
  }, [text, citeAfterWord])

  const [count, setCount] = React.useState(0)
  const [sourcesOpen, setSourcesOpen] = React.useState(false)
  const done = count >= tokens.length
  const sourcesId = React.useId()

  React.useEffect(() => {
    const t = setTimeout(
      () => setCount((c) => (c >= tokens.length ? 0 : c + 1)),
      done ? HOLD_MS : WORD_MS,
    )
    return () => clearTimeout(t)
  }, [count, done, tokens.length])

  const primarySource = sources[0]

  return (
    <div
      data-slot="streaming-text"
      className={cn("min-h-52 w-full max-w-md", className)}
      {...props}
    >
      <p aria-busy={!done} className="text-sm leading-relaxed text-foreground">
        {tokens.slice(0, count).map((token, i) =>
          token.cite && primarySource ? (
            <a
              key={i}
              href={primarySource.href ?? `https://${primarySource.host}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                focusRing,
                "me-1 inline-flex h-5 animate-in items-center gap-1 rounded-md bg-(--mark) ps-0.5 pe-1.5 align-middle text-xs text-(--mark-foreground) zoom-in-90 fade-in duration-base",
                "transition-colors hover:bg-primary/15",
              )}
            >
              <SourceMark name={primarySource.name} className="size-4 bg-card text-xs" />
              <span>{primarySource.host}</span>
            </a>
          ) : (
            <span key={i} className="inline animate-in fade-in duration-slow">
              {token.text}{" "}
            </span>
          ),
        )}
        {!done && (
          <span
            aria-hidden="true"
            className="ms-0.5 inline-block h-3.5 w-0.5 translate-y-0.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none"
          />
        )}
      </p>

      <div
        className={cn(
          "mt-2 flex items-center gap-0.5 transition-opacity duration-slow",
          done ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!done}
      >
        {ACTIONS.map((action) => (
          <button
            key={action.label}
            type="button"
            aria-label={action.label}
            tabIndex={done ? 0 : -1}
            className={cn(
              focusRing,
              "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon icon={action.icon} className="size-4" aria-hidden="true" />
          </button>
        ))}
        <button
          type="button"
          aria-expanded={sourcesOpen}
          aria-controls={sourcesId}
          tabIndex={done ? 0 : -1}
          onClick={() => setSourcesOpen((current) => !current)}
          className={cn(
            focusRing,
            "ms-1.5 flex h-7 items-center gap-1.5 rounded-lg bg-card px-2 text-left shadow-sm transition-colors duration-fast hover:bg-accent",
          )}
        >
          <span className="flex -space-x-1">
            {sources.map((source) => (
              <SourceMark
                key={source.host}
                name={source.name}
                className="size-4 rounded-full text-xs ring-2 ring-card"
              />
            ))}
          </span>
          <span className="text-xs text-muted-foreground">{totalSources} sources</span>
          <Icon
            icon="solar:alt-arrow-down-linear"
            aria-hidden="true"
            className={cn(
              "size-3.5 text-muted-foreground transition-transform duration-base",
              sourcesOpen && "rotate-180",
            )}
          />
        </button>
      </div>

      <div
        id={sourcesId}
        className={cn(
          "grid transition-all duration-slow ease-(--ease-out)",
          done && sourcesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-2 flex flex-col rounded-xl border border-border bg-card p-1">
            {sources.map((source) => (
              <a
                key={source.host}
                href={source.href ?? `https://${source.host}`}
                target="_blank"
                rel="noreferrer"
                tabIndex={done && sourcesOpen ? 0 : -1}
                className={cn(
                  focusRing,
                  "flex h-8 items-center gap-2 rounded-md px-2 text-sm text-foreground transition-colors duration-fast hover:bg-(--field)",
                )}
              >
                <SourceMark name={source.name} className="size-4.5 text-xs" />
                <span className="truncate">{source.name}</span>
                <span className="ms-auto truncate text-xs text-muted-foreground">{source.host}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-3 transition-opacity duration-slow",
          done ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!done}
      >
        <p className="text-xs font-medium text-muted-foreground">Follow-ups</p>
        <ul className="mt-1 flex flex-col">
          {followUps.map((item, i) => (
            <li
              key={item}
              className={cn(
                "border-b border-border last:border-b-0",
                done && "animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-slow",
              )}
              style={done ? { animationDelay: `${i * 90}ms` } : undefined}
            >
              <button
                type="button"
                tabIndex={done ? 0 : -1}
                onClick={() => onFollowUp?.(item)}
                className={cn(
                  focusRing,
                  "-mx-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-foreground transition-colors duration-fast hover:bg-accent",
                )}
              >
                <Icon
                  icon="solar:arrow-right-down-linear"
                  className="size-3.5 shrink-0 text-(--primary-text)"
                  aria-hidden="true"
                />
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface StreamingSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: StreamingSource[]
  totalCount?: number
}

/** Margin StreamingSources: the sources an answer cites, as paper tabs. */
function StreamingSources({ sources, totalCount, className, ...props }: StreamingSourcesProps) {
  const count = totalCount ?? sources.length
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <span className="text-xs text-muted-foreground">
        {count} {count === 1 ? "source" : "sources"}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source) => (
          <a
            key={source.host}
            href={source.href ?? `https://${source.host}`}
            target="_blank"
            rel="noreferrer"
            className={cn(
              focusRing,
              "inline-flex h-7 items-center gap-1.5 rounded-lg bg-card px-2 text-xs text-foreground shadow-sm transition-colors hover:bg-accent",
            )}
          >
            <SourceMark name={source.name} className="size-4 text-xs" />
            <span className="font-medium">{source.name}</span>
            <span className="text-muted-foreground">{source.host}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

interface StreamingFollowUpsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: string[]
  onSelect?: (item: string) => void
}

/** Margin StreamingFollowUps: suggested next questions as tinted chips. */
function StreamingFollowUps({ items, onSelect, className, ...props }: StreamingFollowUpsProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <span className="text-xs text-muted-foreground">Follow-ups</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect?.(item)}
            className={cn(
              focusRing,
              "h-7 rounded-lg bg-(--mark) px-2.5 text-xs text-(--mark-foreground) transition-colors hover:bg-primary/15",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export { StreamingText, StreamingSources, StreamingFollowUps }
export type { StreamingSource }
