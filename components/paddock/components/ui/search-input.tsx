"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Paddock SearchInput: the white search field. A magnifier sits at the
 * start, and a round clear button appears once there is a query.
 */
export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== "";

    return (
      <div data-slot="search-input" className="relative">
        <Icon
          icon="mingcute:search-line"
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type="text"
          role="searchbox"
          enterKeyHint="search"
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pl-10",
            hasValue && onClear && "pr-10",
            className,
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors duration-fast ease-out",
              "hover:bg-accent hover:text-foreground",
              focusRing,
            )}
            aria-label="Clear search"
          >
            <Icon icon="mingcute:close-line" aria-hidden className="size-3.5" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
