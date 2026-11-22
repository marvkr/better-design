import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Leather Luxe NativeSelect: a native <select> in the recessed well.

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
            "flex h-10 appearance-none items-center py-2 pr-9 cursor-pointer",
            "[&>option]:bg-card [&>option]:text-foreground",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:[box-shadow:var(--shadow-well),0_0_0_0.1875rem_oklch(0.52_0.16_28/0.25)]",
            className
          )}
          {...props}
        >
          {children}
        </select>

        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
export type { NativeSelectProps }
