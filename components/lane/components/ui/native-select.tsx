import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Kanban Glass NativeSelect: native <select> on the same white-card field
// surface as Input (formFieldBase), with a custom chevron.
// appearance-none hides the native arrow; pr-9 makes room for the custom one.

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
            "flex h-10 appearance-none items-center cursor-pointer",
            "pl-3.5 pr-9 py-2",
            "[&>option]:bg-card [&>option]:text-foreground",
            error && [
              "border-destructive",
              "focus-visible:border-destructive focus-visible:ring-[color:oklch(0.58_0.20_25/0.35)]",
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
