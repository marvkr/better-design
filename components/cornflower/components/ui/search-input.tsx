import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

// Ledger Light Search Input: input with search icon and optional clear button

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon
          icon="tabler:search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pl-9 pr-3",
            onClear && value ? "pr-9" : "",
            className
          )}
          {...props}
        />
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon="tabler:x" className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
export type { SearchInputProps }
