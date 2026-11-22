import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Control Room NativeSelect: native <select> in the recessed instrument
// well material with a console chevron.

interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
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
            "flex h-9 cursor-pointer appearance-none items-center py-1.5 pr-9",
            "focus:outline-none",
            "[&>option]:bg-popover [&>option]:text-foreground",
            error && [
              "border-destructive/60",
              "focus-visible:border-destructive",
              "focus-visible:[box-shadow:var(--shadow-inset),0_0_0_0.0625rem_oklch(0.6_0.23_27/0.5),0_0_0.625rem_oklch(0.6_0.23_27/0.25)]",
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
          <Icon icon="tabler:chevron-down" className="size-4" />
        </div>
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
