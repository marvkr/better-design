import * as React from "react"
import { cn } from "@/lib/utils"

// Energetic NativeSelect: light marketplace, rounded-[14px], NO shadows, NO extra borders
// White bg, charcoal text, ring-1 focus (no border shift)
// Charcoal/muted chevron matching the light theme

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
            "bg-background text-foreground font-medium",
            "pl-4 pr-10 outline-none",
            "transition-colors duration-150",
            "focus:ring-1 focus:ring-ring focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary",
            "[&>option]:bg-background [&>option]:text-foreground",
            // Sizes — Energetic uses taller controls (h-11 default)
            size === "sm" && "h-9 rounded-xl text-xs",
            size === "default" && "h-11 rounded-[14px] text-sm",
            size === "lg" && "h-12 rounded-[14px] text-base",
            // No border normally — just ring on focus; error uses ring-destructive
            "ring-1 ring-inset ring-border",
            error && "ring-destructive focus:ring-destructive",
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron — charcoal/muted for light theme */}
        <div
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
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
