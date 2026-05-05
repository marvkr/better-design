import * as React from "react"
import { cn } from "@/lib/utils"

// Vercel NativeSelect: native <select> styled to match the design system
// h-10, rounded-[10px], border-border, shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]
// Custom chevron via bg-image SVG (light theme: dark chevron)
// Appearance: none to hide native arrow, pr-8 to make room for custom arrow

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
            "flex h-10 w-full appearance-none items-center",
            "rounded-[10px] border border-border bg-background",
            "pl-3 pr-9 py-2 text-sm text-foreground",
            "shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
            "cursor-pointer",
            "transition duration-200 ease-out",
            "hover:border-foreground/30",
            "focus:outline-none focus:border-foreground focus:shadow-[0_0_0_3px_rgb(0_0_0/0.06)]",
            "disabled:cursor-not-allowed disabled:bg-secondary disabled:opacity-70",
            "[&>option]:bg-background [&>option]:text-foreground",
            error && [
              "border-destructive",
              "focus:border-destructive focus:shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
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
