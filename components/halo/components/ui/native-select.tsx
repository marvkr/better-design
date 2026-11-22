import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo NativeSelect: native <select> with translucent pill styling

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
            "flex h-10 w-full appearance-none items-center",
            "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
            "pl-3 pr-9 py-2 text-sm text-foreground/90",
            "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
            "cursor-pointer",
            "transition duration-base ease-out",
            "hover:bg-foreground/[0.08] hover:border-foreground/[0.15]",
            "focus:outline-none focus:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-70",
            "[&>option]:bg-background [&>option]:text-foreground",
            error && [
              "border-destructive",
              "focus:border-destructive focus:shadow-[0_0_0_0.1875rem_color-mix(in_oklch,var(--destructive)_12%,transparent)]",
            ],
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron icon */}
        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40"
          aria-hidden="true"
        >
          <Icon icon="tabler:chevron-down" className="h-4 w-4" />
        </div>
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
export type { NativeSelectProps }
