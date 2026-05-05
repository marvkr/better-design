import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Tactile Minimal Search Input: input with leading search icon and optional clear button

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
            "flex h-9 w-full pl-9 pr-3 py-1.5 text-sm",
            "rounded-[6px] border border-border bg-background",
            "text-foreground placeholder:text-muted-foreground",
            "transition-all duration-150",
            "hover:border-ring/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            onClear && value ? "pr-9" : "",
            className
          )}
          {...props}
        />
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              "transition-all duration-150 active:scale-[0.98]",
              "hover:text-foreground"
            )}
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
