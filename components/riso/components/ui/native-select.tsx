import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Retro-Playful NativeSelect: native <select> styled to match the design system
// h-10, rounded-lg, border-border
// Custom chevron via bg-image SVG (light theme: dark chevron)
// Appearance: none to hide native arrow, pr-8 to make room for custom arrow

interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="group relative w-full">
        <select
          ref={ref}
          className={cn(
            formFieldBase,
            "flex h-10 appearance-none items-center py-2 pr-9 cursor-pointer",
            "[&>option]:bg-card [&>option]:text-foreground",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron icon — tracks the field's hover lift */}
        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform duration-fast group-hover:-translate-x-px group-hover:-translate-y-[calc(50%+0.0625rem)]"
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
