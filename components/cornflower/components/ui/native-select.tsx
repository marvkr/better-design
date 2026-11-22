import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Ledger Light NativeSelect: native <select> styled to match the design system
// h-10, rounded-md, border-border, inset shadow, calm focus ring
// Custom chevron via inline SVG; appearance-none to hide native arrow, pr-9 for the custom arrow

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
            formFieldBase,
            "flex h-10 appearance-none items-center pr-9 py-2 cursor-pointer",
            "focus:outline-none focus:border-ring focus:ring-[0.1875rem] focus:ring-ring/25",
            "disabled:bg-secondary disabled:opacity-70",
            "[&>option]:bg-background [&>option]:text-foreground",
            error && [
              "border-destructive",
              "focus:border-destructive focus:ring-[0.1875rem] focus:ring-destructive/25",
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
