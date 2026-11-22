import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

// Clay Product NativeSelect: native <select> styled to match the design system.
// Closed trigger surface consumes the shared formFieldBase (recessed clay well),
// so it reads as the same scooped-out field as Input/Textarea.

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
            "[&>option]:bg-card [&>option]:text-foreground",
            error && [
              "border-destructive",
              "focus-visible:border-destructive focus-visible:[box-shadow:var(--shadow-clay-inset),0_0_0_0.1875rem_color-mix(in_oklch,var(--destructive)_28%,transparent)]",
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
