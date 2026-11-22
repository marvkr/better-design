import * as React from "react"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * SearchInput — the spec's "Search for or jump to" well: a recessed field
 * with the magnifier sunk at the left.
 */

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
          type="search"
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pl-9",
            "[&::-webkit-search-cancel-button]:hidden",
            onClear && value ? "pr-9" : "",
            className
          )}
          {...props}
        />
        {onClear && value ? (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
