import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

// Neon Vault NativeSelect: native <select> on the recessed pill track with a
// custom caret, so platform pickers stay on theme.

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
            formFieldSingleLine,
            "appearance-none cursor-pointer pr-9",
            "focus:outline-none focus:border-ring/60 focus:ring-2 focus:ring-ring/40",
            "[&>option]:bg-popover [&>option]:text-foreground",
            error && [
              "border-destructive",
              "focus:border-destructive focus:ring-destructive/30",
            ],
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom caret icon */}
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
