import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Electric Fintech NativeSelect: native <select> sharing formFieldBase so its
// closed surface matches every other form field (recessed cool-charcoal pocket,
// hairline border brightening to the electric ring on focus). Appearance: none
// hides the native arrow; pr-9 leaves room for the custom chevron.

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
            "flex h-9 appearance-none items-center pr-9 py-1.5 cursor-pointer",
            "focus:border-ring focus:ring-2 focus:ring-ring/35",
            "[&>option]:bg-popover [&>option]:text-popover-foreground",
            error && [
              "border-destructive",
              "focus:border-destructive focus:ring-destructive/35",
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
