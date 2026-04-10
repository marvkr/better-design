import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Vercel Search Input: input with search icon and optional clear button

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
            "flex h-10 w-full rounded-[10px] border border-border bg-background pl-9 pr-3 py-2 text-sm",
            "shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
            "placeholder:text-muted-foreground",
            "transition duration-200 ease-out",
            "hover:border-foreground/30",
            "focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[0_0_0_3px_rgb(0_0_0/0.06)]",
            "disabled:cursor-not-allowed disabled:bg-secondary disabled:opacity-70",
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
            <X className="h-4 w-4" />
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
