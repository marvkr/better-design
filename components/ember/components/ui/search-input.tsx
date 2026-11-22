"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass SearchInput: the sidebar search well with a leading glyph
// and an optional clear control.

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const showClear = onClear && value && String(value).length > 0

    return (
      <div className="relative w-full">
        <Icon
          icon="tabler:search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          className={cn(
            "flex h-9 rounded-lg pl-9 pr-8 py-2 text-sm",
            formFieldBase,
            "[&::-webkit-search-cancel-button]:appearance-none",
            className
          )}
          ref={ref}
          value={value}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-[var(--ag-fill)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <Icon icon="tabler:x" className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
export type { SearchInputProps }
