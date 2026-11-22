import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Frosted Glass Search Input: glass pill input with search icon and optional clear button

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon
          icon="tabler:search"
          className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          value={value}
          className={cn(
            "flex h-12 rounded-full pl-11 pr-5 py-2 text-[0.9375rem]",
            formFieldBase,
            onClear && value ? "pr-11" : "",
            className
          )}
          {...props}
        />
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
