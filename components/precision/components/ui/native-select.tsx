import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

// Precision NativeSelect: native <select> on the shared form-field surface
// (white field, hairline border, quiet indigo focus ring). Native arrow is
// hidden via appearance-none and replaced by a custom chevron.

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
            "appearance-none items-center pr-9 cursor-pointer",
            "[&>option]:bg-background [&>option]:text-foreground",
            error && [
              "border-destructive",
              "focus-visible:border-destructive focus-visible:ring-destructive/25",
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
