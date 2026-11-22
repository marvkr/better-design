"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing, surfacePlate } from "./_shared"

// StreamingText: words arrive as the answer streams, an inline citation
// chip appears in context, then actions, a sources list and follow-up
// prompts become usable.
//
// Usage:
//   <StreamingText />
//   <StreamingText text="Custom answer text." followUps={["Ask more"]} />

const WORD_MS = 80
const HOLD_MS = 3400

interface StreamingSource {
  name: string
  host: string
  href?: string
}

const DEFAULT_TEXT =
  "Four of the twelve projects are due before the end of next month. The review column holds the most risk: two cards are past 80% but their owners have not opened them this week."

const DEFAULT_FOLLOW_UPS = [
  "Which owners have the most open tasks",
  "Draft a reminder for the review column",
]

const DEFAULT_SOURCES: StreamingSource[] = [
  { name: "Front desk", host: "desk.example.com" },
  { name: "Task log", host: "tasks.example.com" },
  { name: "Team calendar", host: "calendar.example.com" },
]

/** The first letter of a source in a small dark slate tile. */
function SourceMark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xs bg-primary text-xs font-semibold leading-none text-primary-foreground",
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  )
}

const ACTIONS: { label: string; icon: string }[] = [
  { label: "Copy answer", icon: "mingcute:copy-2-line" },
  { label: "Try again", icon: "mingcute:refresh-2-line" },
  { label: "Good answer", icon: "mingcute:thumb-up-2-line" },
  { label: "Bad answer", icon: "mingcute:thumb-down-2-line" },
]

/** A small round icon button that fills grey on hover. */
const iconButton = cn(
  focusRing,
  "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
)

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
 * Paddock StreamingText: an answer that arrives word by word, then shows
 * round icon actions, a stack of source marks and follow-up rows parted by thin rules.
 */
function StreamingText({
  text = DEFAULT_TEXT,
  sources = DEFAULT_SOURCES,
  totalSources = 8,
  followUps = DEFAULT_FOLLOW_UPS,
  citeAfterWord = 15,
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
  const listId = React.useId()

  React.useEffect(() => {
    const t = setTimeout(
      () => setCount((c) => (c >= tokens.length ? 0 : c + 1)),
      done ? HOLD_MS : WORD_MS,
    )
    return () => clearTimeout(t)
  }, [count, done, tokens.length])

  const primarySource = sources[0]

  return (
    <div className={cn("min-h-52 w-full max-w-96", className)} {...props}>
      <p className="text-sm leading-relaxed text-foreground">
        {tokens.slice(0, count).map((token, i) =>
          token.cite && primarySource ? (
            <a
              key={i}
              href={primarySource.href ?? `https://${primarySource.host}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                focusRing,
                "mr-1 inline-flex h-5 animate-in zoom-in-90 fade-in items-center gap-1 rounded-sm bg-secondary pr-2 pl-1 align-middle text-xs font-medium text-secondary-foreground transition-colors duration-fast hover:bg-(--track) hover:text-foreground",
              )}
            >
              <SourceMark name={primarySource.name} className="size-3.5 rounded-full" />
              <span>{primarySource.name}</span>
            </a>
          ) : (
            <span key={i} className="inline animate-in fade-in duration-base">
              {token.text}{" "}
            </span>
          ),
        )}
        {!done && (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-xs bg-foreground"
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
            tabIndex={done ? undefined : -1}
            className={iconButton}
          >
            <Icon icon={action.icon} className="size-4" aria-hidden="true" />
          </button>
        ))}
        <button
          type="button"
          aria-expanded={sourcesOpen}
          aria-controls={sourcesOpen ? listId : undefined}
          tabIndex={done ? undefined : -1}
          onClick={() => setSourcesOpen((current) => !current)}
          className={cn(
            focusRing,
            "ml-1.5 flex h-7 items-center gap-1.5 rounded-md px-2 transition-colors duration-fast hover:bg-accent",
          )}
        >
          <span className="flex -space-x-1">
            {sources.map((source) => (
              <SourceMark
                key={source.host}
                name={source.name}
                className="size-4 rounded-full ring-2 ring-background"
              />
            ))}
          </span>
          <span className="text-xs font-medium text-secondary-foreground">{totalSources} sources</span>
        </button>
      </div>

      {done && sourcesOpen && (
        <div
          id={listId}
          className={cn(surfacePlate, "mt-1.5 flex animate-in fade-in slide-in-from-top-1 flex-col rounded-lg p-1 duration-base")}
        >
          {sources.map((source) => (
            <a
              key={source.host}
              href={source.href ?? `https://${source.host}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                focusRing,
                "flex items-center gap-2 rounded-sm px-2 py-1.5 text-xs text-secondary-foreground transition-colors duration-fast hover:bg-card hover:text-foreground",
              )}
            >
              <SourceMark name={source.name} className="size-4" />
              <span className="font-medium">{source.name}</span>
              <span className="ml-auto text-muted-foreground">{source.host}</span>
            </a>
          ))}
        </div>
      )}

      <div
        className={cn(
          "mt-3 transition-opacity duration-slow",
          done ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!done}
      >
        <p className="text-xs font-medium text-muted-foreground">Follow-ups</p>
        <div className="mt-1 flex flex-col">
          {followUps.map((item) => (
            <button
              key={item}
              type="button"
              tabIndex={done ? undefined : -1}
              onClick={() => onFollowUp?.(item)}
              className={cn(
                focusRing,
                "-mx-2 flex items-center gap-2 rounded-sm border-b border-border px-2 py-2 text-left text-[0.8125rem] text-foreground transition-colors duration-fast last:border-b-0 hover:bg-accent",
                done && "animate-in fade-in slide-in-from-bottom-1 duration-slow",
              )}
            >
              <Icon icon="mingcute:corner-down-right-line" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

interface StreamingSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: StreamingSource[]
  totalCount?: number
}

/** Paddock StreamingSources: a count over a row of white source chips. */
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
              "inline-flex h-7 items-center gap-1.5 rounded-md bg-card px-2.5 text-xs text-foreground shadow-(--card-ring) transition-shadow duration-fast hover:shadow-(--card-lift)",
            )}
          >
            <SourceMark name={source.name} className="size-4 rounded-full" />
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

/** Paddock StreamingFollowUps: suggested next questions as quiet grey tag chips. */
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
              "h-7 rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground transition-colors duration-fast hover:bg-(--track) hover:text-foreground",
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
