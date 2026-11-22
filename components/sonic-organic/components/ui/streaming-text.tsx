"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// StreamingText: words resolve in as the answer streams, inline citations
// appear in context, then actions, a sources drawer, and follow-up prompts
// become usable.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
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
  "Pistachio is your fastest-growing flavor: sales are up 23% this month and margins beat vanilla by 8 points. Stone-fruit flavors are trending in the same range."

const DEFAULT_FOLLOW_UPS = [
  "Which flavors sell best in winter",
  "Compare gelato and soft serve margins",
]

const DEFAULT_SOURCES: StreamingSource[] = [
  { name: "Scoop Data", host: "scoopdata.io" },
  { name: "Trends Index", host: "trends.google.com" },
  { name: "Market Basket", host: "marketbasket.io" },
]

function SourceMark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-[0.25rem] bg-primary text-[0.4375rem] font-bold text-primary-foreground",
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  )
}

const ACTION_ICONS: React.ReactNode[] = [
  <g key="copy"><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></g>,
  <path key="retry" d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />,
  <path key="up" d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />,
  <path key="down" d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" />,
]

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

function StreamingText({
  text = DEFAULT_TEXT,
  sources = DEFAULT_SOURCES,
  totalSources = 10,
  followUps = DEFAULT_FOLLOW_UPS,
  citeAfterWord = 19,
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

  React.useEffect(() => {
    const t = setTimeout(
      () => setCount((c) => (c >= tokens.length ? 0 : c + 1)),
      done ? HOLD_MS : WORD_MS,
    )
    return () => clearTimeout(t)
  }, [count, done, tokens.length])

  const primarySource = sources[0]

  return (
    <div className={cn("min-h-[13rem] w-full max-w-[23.75rem]", className)} {...props}>
      <p className="text-[0.8125rem] leading-relaxed text-foreground">
        {tokens.slice(0, count).map((token, i) =>
          token.cite && primarySource ? (
            <a
              key={i}
              href={primarySource.href ?? `https://${primarySource.host}`}
              target="_blank"
              rel="noreferrer"
              className="mr-1 inline-flex h-[1.125rem] translate-y-[-0.0625rem] items-center gap-1 rounded-[0.3125rem] border border-border bg-muted pr-1.5 pl-[0.1875rem] align-middle font-mono text-[0.6563rem] text-foreground/70 transition-colors duration-fast hover:bg-accent hover:text-foreground"
              style={{ animation: "bui-pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
            >
              <SourceMark name={primarySource.name} className="size-3" />
              <span>{primarySource.host}</span>
            </a>
          ) : (
            <span key={i} className="inline" style={{ animation: "bui-fade-in 250ms ease-out both" }}>
              {token.text}{" "}
            </span>
          ),
        )}
        {!done && (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-foreground"
            style={{ animation: "bui-fade-in 150ms ease-out both" }}
          />
        )}
      </p>

      {/* action icons row */}
      <div
        className="mt-2 flex items-center gap-0.5 transition-opacity duration-slow"
        style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}
      >
        {ACTION_ICONS.map((icon, i) => (
          <button
            key={i}
            type="button"
            aria-label="Action"
            className="flex size-6 items-center justify-center rounded-[0.375rem] text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {icon}
            </svg>
          </button>
        ))}
        <button
          type="button"
          aria-expanded={sourcesOpen}
          onClick={() => setSourcesOpen((current) => !current)}
          className="ml-1.5 flex items-center gap-1.5 rounded-[0.375rem] px-1 py-0.5 text-left transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex -space-x-1">
            {sources.map((source) => (
              <SourceMark key={source.host} name={source.name} className="size-3.5 rounded-full shadow-[0_0_0_0.0938rem_var(--background)]" />
            ))}
          </span>
          <span className="text-[0.75rem] text-foreground/70">
            {totalSources} sources
          </span>
        </button>
      </div>

      {/* sources drawer */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-slow"
        style={{
          gridTemplateRows: done && sourcesOpen ? "1fr" : "0fr",
          opacity: done && sourcesOpen ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="mt-1.5 flex flex-col rounded-md border border-border bg-muted p-1">
            {sources.map((source) => (
              <a
                key={source.host}
                href={source.href ?? `https://${source.host}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-[0.375rem] px-1.5 py-1 text-[0.75rem] text-foreground/70 transition-colors duration-fast hover:bg-accent hover:text-foreground"
              >
                <SourceMark name={source.name} className="size-4 text-[0.5rem]" />
                <span>{source.name}</span>
                <span className="ml-auto font-mono text-[0.6563rem] text-muted-foreground">{source.host}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* follow-ups */}
      <div
        className="mt-2.5 transition-opacity duration-slow"
        style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}
      >
        <p className="text-[0.75rem] font-medium text-foreground/70">Follow-ups</p>
        <div className="mt-0.5 flex flex-col">
          {followUps.map((item, i) => (
            <button
              key={item}
              type="button"
              onClick={() => onFollowUp?.(item)}
              className="-mx-1.5 flex items-center gap-2 border-b border-border px-1.5 py-1.5 text-left text-[0.7813rem] text-foreground transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={
                done
                  ? { animation: `bui-fade-up 350ms cubic-bezier(0.23,1,0.32,1) ${i * 90}ms both` }
                  : { opacity: 0 }
              }
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
                <path d="M9 10l-5 5 5 5" />
                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
              </svg>
              {item}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes bui-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes bui-pop-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface StreamingSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: StreamingSource[]
  totalCount?: number
}

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
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground transition-colors hover:bg-accent"
          >
            <SourceMark name={source.name} className="size-3.5 text-[0.5rem]" />
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
            className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-foreground transition-colors hover:bg-accent"
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
