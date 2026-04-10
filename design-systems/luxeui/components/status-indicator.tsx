import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Luxe StatusIndicator: presence dot — online=white, offline=muted, busy=destructive
// Monochromatic: no green — online uses white/foreground tone for premium feel

const statusIndicatorVariants = cva(
  "inline-flex shrink-0 rounded-full",
  {
    variants: {
      status: {
        online:  "bg-primary shadow-[0_0_0_2px_hsl(var(--background))]",
        offline: "bg-muted-foreground shadow-[0_0_0_2px_hsl(var(--background))]",
        busy:    "bg-destructive shadow-[0_0_0_2px_hsl(var(--background))]",
        away:    "bg-muted-foreground/50 shadow-[0_0_0_2px_hsl(var(--background))]",
      },
      size: {
        xs:      "h-1.5 w-1.5",
        sm:      "h-2 w-2",
        default: "h-2.5 w-2.5",
        lg:      "h-3 w-3",
      },
    },
    defaultVariants: {
      status: "online",
      size: "default",
    },
  }
)

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {
  pulse?: boolean
}

function StatusIndicator({
  status,
  size,
  pulse = false,
  className,
  ...props
}: StatusIndicatorProps) {
  const statusLabel = {
    online: "Online",
    offline: "Offline",
    busy: "Busy",
    away: "Away",
  }[status ?? "online"]

  return (
    <span
      role="img"
      aria-label={statusLabel}
      className={cn(
        "relative inline-flex",
        className
      )}
      {...props}
    >
      {pulse && status === "online" && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40"
          )}
        />
      )}
      <span className={cn(statusIndicatorVariants({ status, size }))} />
    </span>
  )
}

export { StatusIndicator, statusIndicatorVariants }
