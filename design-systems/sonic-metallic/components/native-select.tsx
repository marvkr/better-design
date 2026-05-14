import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Tactile Minimal NativeSelect: native <select> with custom chevron

interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-9 w-full appearance-none items-center",
            "rounded-[6px] border border-border bg-background",
            "pl-3 pr-9 py-1.5 text-sm text-foreground",
            "cursor-pointer",
            "transition-all duration-150",
            "hover:border-ring/50",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:border-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && [
              "border-destructive",
              "focus:border-destructive focus:ring-destructive",
            ],
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron icon */}
        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        >
          <Icon icon="tabler:chevron-down" className="h-4 w-4" />
        </div>
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
export type { NativeSelectProps }
