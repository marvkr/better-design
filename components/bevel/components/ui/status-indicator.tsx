import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Bevel StatusIndicator.
 *
 * An 8px dot and a label. The dot takes the 1px ring from the shadow stack so
 * it holds its edge on any surface, and every state pulls a token rather than
 * a color of its own. The optional pulse repeats the dot at full opacity and
 * drops the ring, because a halo with a rim reads as a second dot.
 */

const dotVariants = cva(
  "size-2 shrink-0 rounded-full [box-shadow:var(--shadow-ring)]",
  {
    variants: {
      status: {
        online: "bg-[var(--success)]",
        offline: "bg-muted-foreground",
        busy: "bg-destructive",
        away: "bg-[var(--warning)]",
        idle: "bg-[var(--track)]",
      },
    },
    defaultVariants: {
      status: "online",
    },
  },
)

/** Props for `StatusIndicator`; `pulse` adds the repeating halo. */
export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {
  label?: React.ReactNode
  pulse?: boolean
}

const StatusIndicator = React.forwardRef<
  HTMLSpanElement,
  StatusIndicatorProps
>(({ className, status, label, pulse, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center gap-2 text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  >
    <span className="relative inline-flex">
      <span className={cn(dotVariants({ status }))} />
      {pulse && (
        <span
          className={cn(
            "absolute inset-0 animate-ping rounded-full",
            dotVariants({ status }),
            "opacity-60 [box-shadow:none]",
          )}
        />
      )}
    </span>
    {label && (
      <span className="font-semibold text-[var(--strong)]">{label}</span>
    )}
  </span>
))
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator }
