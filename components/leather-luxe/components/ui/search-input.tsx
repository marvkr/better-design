import * as React from "react"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Leather Luxe Search Input: recessed well with a leading glass icon and
// an optional clear control.

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={ref}
          value={value}
          className={cn(
            formFieldBase,
            "flex h-10 py-2 pl-9",
            onClear && value ? "pr-9" : "pr-3",
            className
          )}
          {...props}
        />
        {onClear && value ? (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              "transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:rounded-sm"
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        ) : null}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
export type { SearchInputProps }
