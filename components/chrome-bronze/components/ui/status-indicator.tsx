import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure StatusIndicator — a small raised steel dot + label. The dot
 * carries the knob shadow so it reads as a tiny polished bead. Optional pulse
 * radiates a fading ring.
 */

const dotVariants = cva("h-2 w-2 rounded-full shrink-0 [box-shadow:var(--shadow-knob)]", {
  variants: {
    status: {
      online: "bg-[oklch(0.78_0.15_145)]",
      offline: "bg-muted-foreground/60",
      busy: "bg-destructive",
      away: "bg-[oklch(0.82_0.14_80)]",
      idle: "bg-muted-foreground/40",
    },
  },
  defaultVariants: {
    status: "online",
  },
})

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {
  label?: React.ReactNode
  pulse?: boolean
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, status, label, pulse, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground", className)}
      {...props}
    >
      <span className="relative inline-flex">
        <span className={cn(dotVariants({ status }))} />
        {pulse && (
          <span
            className={cn(
              "absolute inset-0 rounded-full animate-ping",
              dotVariants({ status }),
              "opacity-60 [box-shadow:none]"
            )}
          />
        )}
      </span>
      {label && <span className="font-medium text-foreground">{label}</span>}
    </span>
  )
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator }
