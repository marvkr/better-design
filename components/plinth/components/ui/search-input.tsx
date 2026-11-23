"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/* Plinth Search Input: the recessed field with a leading search glyph and a
   clear key once there is a query. */

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== ""

    return (
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pl-9 [&::-webkit-search-cancel-button]:appearance-none",
            hasValue && onClear && "pr-9",
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className={cn(
              "absolute right-1.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

// feather:search
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21l-4.35-4.35" /></g>
    </svg>
  )
}

// feather:x
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export { SearchInput }
