import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo Search Input: translucent pill input with search icon and optional clear button

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon
          icon="tabler:search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
        />
        <input
          ref={ref}
          value={value}
          className={cn(
            "flex h-10 w-full pl-9 pr-3 py-2 text-sm",
            "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
            "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
            "text-foreground/90 placeholder:text-foreground/40",
            "transition duration-base ease-out",
            "hover:bg-foreground/[0.08] hover:border-foreground/[0.15]",
            "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus-visible:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-70",
            onClear && value ? "pr-9" : "",
            className
          )}
          {...props}
        />
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors hover:text-foreground/80"
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
