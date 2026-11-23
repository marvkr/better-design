import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// NativeSelect: native <select> on the shared formFieldBase surface,
// so it reads as the same recessed well as Input and the other field triggers.
// appearance-none hides the native arrow; pr-9 makes room for the custom chevron.

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
            "flex h-9 appearance-none items-center py-1.5 pr-9 cursor-pointer",
            "[&>option]:bg-popover [&>option]:text-popover-foreground",
            error && [
              "border-destructive",
              "focus-visible:border-destructive focus-visible:[box-shadow:0_0_0_0.1875rem_oklch(from_var(--destructive)_l_c_h/0.3)]",
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
