import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Midnight Glass NativeSelect: native <select> with glass pill styling

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
            "flex h-12 w-full appearance-none items-center",
            "rounded-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05]",
            "pl-5 pr-11 py-2 text-[15px] text-white/90",
            "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
            "cursor-pointer",
            "transition duration-300 ease-out",
            "hover:bg-white/[0.07] hover:border-white/[0.12]",
            "focus:outline-none focus:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)] focus:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-70",
            "[&>option]:bg-zinc-900 [&>option]:text-white/90",
            error && [
              "border-destructive",
              "focus:border-destructive focus:shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
            ],
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom chevron icon */}
        <div
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/40"
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
