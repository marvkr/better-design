import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Midnight Glass Search Input: glass pill input with search icon and optional clear button

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon
          icon="tabler:search"
          className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
        />
        <input
          ref={ref}
          value={value}
          className={cn(
            "flex h-12 w-full pl-11 pr-5 py-2 text-[15px]",
            "rounded-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05]",
            "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
            "text-white/90 placeholder:text-white/40",
            "transition duration-300 ease-out",
            "hover:bg-white/[0.07] hover:border-white/[0.12]",
            "focus-visible:outline-none focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)] focus-visible:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-70",
            onClear && value ? "pr-11" : "",
            className
          )}
          {...props}
        />
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/80"
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
