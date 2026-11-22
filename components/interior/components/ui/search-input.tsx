"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/*
 * Interior SearchInput — the recessed field at the search radius (9px, per
 * the nested scale; never a pill). The clear action is a 6px chip button and
 * its X stays at full opacity.
 */

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => (
    <div className="relative">
      <Search
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        type="search"
        value={value}
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "rounded-[0.5625rem] pl-9 pr-10",
          "[&::-webkit-search-cancel-button]:appearance-none",
          className,
        )}
        {...props}
      />
      {onClear && value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className={cn(
            "absolute right-1.5 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-[0.375rem]",
            "text-muted-foreground",
            "transition-[background-color,color,box-shadow] duration-fast",
            "hover:bg-secondary hover:text-foreground",
            "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
          )}
        >
          <X className="size-3.5" strokeWidth={1.5} />
        </button>
      ) : null}
    </div>
  ),
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
