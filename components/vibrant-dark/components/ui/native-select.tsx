import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic NativeSelect: dark flat style, bg-secondary, rounded-xl
// No visible border by default; focus ring-2 ring-primary
// Custom chevron in white/muted color for dark bg

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
            "bg-secondary text-foreground",
            "pl-4 pr-10 outline-none",
            "transition-[background,box-shadow] duration-150",
            "hover:bg-secondary/80",
            "focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:bg-secondary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&>option]:bg-card [&>option]:text-foreground",
            // Size variants
            size === "sm" && "h-8 rounded-lg text-xs",
            size === "default" && "h-10 rounded-xl text-sm",
            size === "lg" && "h-12 rounded-[14px] text-base",
            // Error state
            error && "ring-2 ring-destructive focus:ring-destructive",
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron */}
        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
