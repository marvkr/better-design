import * as React from "react"
import { cn } from "@/lib/utils"

// Earthy NativeSelect: dark neutral, rounded-lg (8px), border-border, bg-secondary
// No glows — white ring-1 on focus; standard muted chevron
// Minimal — closest to a standard shadcn select but dark

interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean
  size?: "sm" | "default" | "lg"
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, size = "default", children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "flex w-full appearance-none cursor-pointer",
            "border border-border bg-secondary text-foreground",
            "pl-3 pr-9 outline-none",
            "transition-colors duration-150",
            "hover:border-border/60",
            "focus:ring-1 focus:ring-ring focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&>option]:bg-card [&>option]:text-foreground",
            // Sizes
            size === "sm" && "h-8 rounded-md text-xs",
            size === "default" && "h-9 rounded-lg text-sm",
            size === "lg" && "h-10 rounded-lg text-base",
            // Error
            error && "border-destructive focus:ring-destructive",
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron — muted white */}
        <div
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
export type { NativeSelectProps }
