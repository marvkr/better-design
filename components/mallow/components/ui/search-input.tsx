"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Mallow SearchInput: the white form field with a
 * magnifier at the start and a clear button once there is a query.
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
          icon="iconoir:search"
          aria-hidden="true"
          className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "ps-11",
            hasValue && onClear && "pe-11",
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
              "absolute end-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors duration-fast",
              "hover:bg-(--option-face) hover:text-foreground",
              focusRing,
            )}
            aria-label="Clear search"
          >
            <Icon icon="iconoir:xmark" className="size-3.5" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
