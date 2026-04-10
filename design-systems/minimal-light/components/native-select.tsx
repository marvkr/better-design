import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe NativeSelect: dark monochromatic, rounded-xl, border-border
// bg-secondary with inset depth shadow; focus: white ring (ring = white)
// tracking-wide for premium feel; warm gray chevron

interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean
  size?: "sm" | "default" | "lg" | "xl"
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, size = "default", children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "flex w-full appearance-none cursor-pointer",
            "rounded-xl border border-border bg-secondary",
            "text-foreground tracking-wide",
            "pl-4 pr-10 outline-none",
            "shadow-[inset_0_1px_2px_0_rgba(35,35,35,0.6)]",
            "transition-colors duration-200",
            "hover:border-border/80 hover:bg-accent",
            "focus:ring-1 focus:ring-ring focus:ring-offset-0",
            "focus:border-primary/30",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "[&>option]:bg-card [&>option]:text-foreground",
            // Sizes
            size === "sm" && "h-8 rounded-lg text-xs",
            size === "default" && "h-10 text-sm",
            size === "lg" && "h-12 text-base",
            size === "xl" && "h-14 text-base tracking-wider",
            // Error
            error && "border-destructive/60 focus:ring-destructive/40",
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron — warm muted gray */}
        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
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
