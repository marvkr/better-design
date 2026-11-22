"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Margin SearchInput: the grey filled search field from the top of the
 * sidebar, with a magnifier at its start and a small clear button once there
 * is a query.
 */
export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Shows a clear button while the field holds a value, and calls this when it is pressed. */
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== "";

    return (
      <div data-slot="search-input" className="relative">
        <Icon
          icon="solar:magnifer-linear"
          aria-hidden
          className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pl-8",
            hasValue && onClear && "pr-8",
            "[&::-webkit-search-cancel-button]:appearance-none",
            className,
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "absolute right-1 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors duration-fast ease-(--ease-out) hover:bg-accent hover:text-foreground",
              focusRing,
            )}
            aria-label="Clear search"
          >
            <Icon icon="solar:close-circle-bold" className="size-3.5" aria-hidden />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
