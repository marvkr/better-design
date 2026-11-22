"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  "New note from template",
  "Search all notebooks",
  "Show notes shared with me",
  "Add a tag to this note",
  "Turn on dark mode",
  "Export note as Markdown",
  "Open recent notes",
];

interface CommandSearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  suggestions?: string[];
  placeholder?: string;
  onSelect?: (suggestion: string) => void;
}

/**
 * Margin CommandSearch: a floating panel with a search field on top and the
 * matching commands below. Arrow keys move the highlight, Enter runs it, and
 * a search with no match says so plainly.
 */
function CommandSearch({
  suggestions = DEFAULT_ITEMS,
  placeholder = "Search commands",
  onSelect,
  className,
  ...props
}: CommandSearchProps) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = query
    ? suggestions.filter((i) => i.toLowerCase().includes(query.toLowerCase()))
    : suggestions.slice(0, 5);
  const empty = query.length > 0 && results.length === 0;
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  const choose = (item: string) => {
    setQuery(item);
    onSelect?.(item);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((activeIndex + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((activeIndex - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(results[activeIndex]);
    } else if (event.key === "Escape" && query) {
      event.preventDefault();
      setQuery("");
    }
  };

  return (
    <div className={cn("flex min-h-60 w-full max-w-72 flex-col items-stretch", className)} {...props}>
      <div className="w-full self-start overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-md">
        <div className="p-1.5">
          <div className="flex h-7.5 items-center gap-2 rounded-lg bg-(--field) px-2.5 shadow-(--field-edge) transition duration-fast focus-within:bg-card focus-within:ring-3 focus-within:ring-ring">
            <Icon icon="solar:magnifer-linear" className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              aria-label={placeholder}
              role="combobox"
              aria-expanded={!empty}
              aria-controls={`${uid}-list`}
              aria-activedescendant={results.length ? `${uid}-opt-${activeIndex}` : undefined}
              aria-autocomplete="list"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                aria-label="Clear search"
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="flex size-5 animate-in fade-in items-center justify-center rounded-sm text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon icon="solar:close-circle-bold" className="size-3.5" aria-hidden />
              </button>
            )}
          </div>
        </div>

        {empty ? (
          <div className="flex animate-in fade-in flex-col items-center justify-center gap-0.5 px-4 pb-7 pt-5 text-center">
            <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-(--field) text-muted-foreground">
              <Icon icon="solar:magnifer-linear" className="size-4" aria-hidden />
            </span>
            <span className="text-sm font-medium text-foreground">No matching commands</span>
            <span className="text-xs text-muted-foreground">Try a shorter word</span>
          </div>
        ) : (
          <div id={`${uid}-list`} className="border-t border-border p-1.5" role="listbox" aria-label="Suggestions">
            {results.map((item, i) => (
              <div
                key={item}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                data-highlighted={i === activeIndex ? "" : undefined}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(item)}
                className="flex h-8 w-full animate-in fade-in cursor-default select-none items-center rounded-md px-2.5 text-sm text-foreground transition-colors duration-fast data-highlighted:bg-(--field)"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { CommandSearch };
