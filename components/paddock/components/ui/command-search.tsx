"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing, popoverSurface } from "./_shared"

// CommandSearch: command search with live filtering, a clear action, and an
// empty state. The field and results are directly usable.
//
// Usage:
//   <CommandSearch />
//   <CommandSearch suggestions={["Open today's schedule"]} onSelect={run} />

const DEFAULT_ITEMS = [
  "Open today's schedule",
  "Create a new project",
  "Invite a teammate",
  "Show urgent projects",
  "Export this view",
  "Archive finished projects",
  "Change the workspace name",
]

interface CommandSearchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  suggestions?: string[]
  placeholder?: string
  onSelect?: (suggestion: string) => void
}

/**
 * Paddock CommandSearch: a white floating panel with the search row on top
 * and grey-washed result rows under it.
 */
function CommandSearch({
  suggestions = DEFAULT_ITEMS,
  placeholder = "Search commands",
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
    <div className={cn("flex min-h-64 w-full max-w-xs flex-col items-stretch", className)} {...props}>
      <div className={cn(popoverSurface, "w-full self-start overflow-hidden p-0")}>
        <div className="flex h-11 items-center gap-2 border-b border-border px-3.5">
          <Icon icon="mingcute:search-line" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              aria-label="Clear search"
              type="button"
              onClick={() => setQuery("")}
              className={cn(
                focusRing,
                "flex size-6 animate-in fade-in items-center justify-center rounded-sm bg-secondary text-muted-foreground transition-colors duration-fast hover:bg-(--track) hover:text-foreground",
              )}
            >
              <Icon icon="mingcute:close-line" className="size-3" aria-hidden="true" />
            </button>
          )}
        </div>

        {empty ? (
          <div className="flex animate-in fade-in flex-col items-center justify-center gap-1 px-4 py-8 duration-base">
            <span className="mb-1.5 flex size-9 items-center justify-center rounded-md bg-secondary text-muted-foreground">
              <Icon icon="mingcute:search-line" className="size-4" aria-hidden="true" />
            </span>
            <span className="text-[0.8125rem] font-medium text-foreground">No matching commands</span>
            <span className="text-xs text-muted-foreground">Try a shorter word</span>
          </div>
        ) : (
          <div className="p-1.5" role="listbox" aria-label="Suggestions">
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
                className={cn(
                  focusRing,
                  "flex h-9 w-full animate-in fade-in items-center rounded-sm px-2.5 text-left text-sm text-foreground transition-colors duration-fast hover:bg-accent",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { CommandSearch }
