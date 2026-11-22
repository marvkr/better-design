"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, menuItemBase, optionTrack } from "./_shared";

const DEFAULT_ITEMS = [
  "Open the weekly ledger",
  "Export transfers as CSV",
  "Compare this month to last",
  "Invite a teammate",
  "Review pending approvals",
  "Change the payout account",
  "Archive closed reports",
];

interface CommandSearchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  suggestions?: string[];
  placeholder?: string;
  onSelect?: (suggestion: string) => void;
}

/**
 * Mallow CommandSearch: a field sunk into a card that filters its
 * suggestions as you type, with a clear button and an empty state.
 */
function CommandSearch({
  suggestions = DEFAULT_ITEMS,
  placeholder = "Search commands",
  onSelect,
  className,
  ...props
}: CommandSearchProps) {
  const [query, setQuery] = React.useState("");
  const listId = React.useId();
  const results = query
    ? suggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : suggestions.slice(0, 5);
  const empty = query.length > 2 && results.length === 0;

  return (
    <div className={cn("flex w-full max-w-80 flex-col", className)} {...props}>
      <div className={cn(cardSlab, "flex flex-col gap-2 rounded-3xl p-2")}>
        <div
          className={cn(
            optionTrack,
            "flex h-11 items-center gap-2 rounded-2xl ps-3.5 pe-1.5 focus-within:ring-2 focus-within:ring-ring",
          )}
        >
          <Icon icon="iconoir:search" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-controls={listId}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              aria-label="Clear search"
              type="button"
              onClick={() => setQuery("")}
              className={cn(
                focusRing,
                "flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon icon="iconoir:xmark" aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </div>

        {empty ? (
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-1 px-4 py-8 text-center motion-safe:animate-in motion-safe:fade-in"
          >
            <span className={cn(optionTrack, "mb-2 flex size-10 items-center justify-center rounded-md text-muted-foreground")}>
              <Icon icon="iconoir:search" aria-hidden="true" className="size-4.5" />
            </span>
            <span className="text-sm font-medium text-foreground">No results found</span>
            <span className="text-sm text-muted-foreground">Try a shorter or different word</span>
          </div>
        ) : (
          <div id={listId} className="flex flex-col gap-0.5 p-0.5" role="listbox" aria-label="Suggestions">
            {results.map((item) => (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => {
                  setQuery(item);
                  onSelect?.(item);
                }}
                className={cn(menuItemBase, "w-full text-left text-foreground hover:bg-accent", focusRing)}
              >
                <Icon icon="iconoir:arrow-right" aria-hidden="true" className="size-3.5 text-muted-foreground" />
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { CommandSearch };
