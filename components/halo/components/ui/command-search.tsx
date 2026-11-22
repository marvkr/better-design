"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// CommandSearch: command search with live filtering, a clear action, and an
// empty state. The field and results are directly usable.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <CommandSearch />
//   <CommandSearch suggestions={["Find suppliers"]} onSelect={run} />

const DEFAULT_ITEMS = [
  "Forecast summer demand",
  "Find waffle cone suppliers",
  "Compare seasonal flavors",
  "Draft flavor launch plan",
  "Check cold-chain status",
  "Audit sugar costs",
  "Retire low sellers",
]

interface CommandSearchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  suggestions?: string[]
  placeholder?: string
  onSelect?: (suggestion: string) => void
}

function CommandSearch({
  suggestions = DEFAULT_ITEMS,
  placeholder = "Search flavors",
  onSelect,
  className,
  ...props
}: CommandSearchProps) {
  const [query, setQuery] = React.useState("")
  const results = query
    ? suggestions.filter((i) => i.toLowerCase().includes(query.toLowerCase()))
    : suggestions.slice(0, 5)
  const empty = query.length > 2 && results.length === 0

  return (
    <div className={cn("flex min-h-[15.5rem] w-full max-w-[18rem] flex-col items-stretch", className)} {...props}>
      <div className="w-full self-start overflow-hidden rounded-xl border border-border bg-card shadow-md">
        {/* input row */}
        <div className="flex h-10 items-center gap-2 border-b border-border px-3 transition-colors duration-fast focus-within:bg-accent/60">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              aria-label="Clear search"
              type="button"
              onClick={() => setQuery("")}
              className="flex size-[1.375rem] items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground"
              style={{ animation: "bui-fade-in 150ms ease-out both" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* results / empty state */}
        {empty ? (
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-8" style={{ animation: "bui-fade-in 250ms ease-out both" }}>
            <span className="mb-1.5 flex size-8 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </span>
            <span className="text-[0.8125rem] font-medium text-foreground">No results found</span>
            <span className="text-[0.75rem] text-muted-foreground">Adjust your search to try again</span>
          </div>
        ) : (
          <div className="p-1" role="listbox" aria-label="Suggestions">
            {results.map((item) => (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => {
                  setQuery(item)
                  onSelect?.(item)
                }}
                className="flex h-8 w-full items-center rounded-[0.375rem] px-2 text-left text-[0.8125rem] text-foreground transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ animation: "bui-fade-in 200ms ease-out both" }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes bui-fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}

export { CommandSearch }
