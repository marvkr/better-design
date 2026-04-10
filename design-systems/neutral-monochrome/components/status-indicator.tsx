import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusVariants = cva(
  "inline-flex shrink-0 rounded-full",
  {
    variants: {
      status: {
        online:  "bg-primary shadow-[0_0_0_2px_hsl(239_84%_67%/0.25)]",
        busy:    "bg-destructive shadow-[0_0_0_2px_hsl(var(--destructive)/0.25)]",
        away:    "bg-orange-500 shadow-[0_0_0_2px_hsl(24_100%_50%/0.25)]",
        offline: "bg-muted-foreground/40",
      },
      size: {
        sm:      "h-2 w-2",
        default: "h-2.5 w-2.5",
        lg:      "h-3.5 w-3.5",
      },
    },
    defaultVariants: {
      status: "offline",
      size: "default",
    },
  }
)

const statusLabels: Record<string, string> = {
  online:  "Online",
  busy:    "Busy",
  away:    "Away",
  offline: "Offline",
}

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {
  showLabel?: boolean
}

function StatusIndicator({
  status,
  size,
  showLabel = false,
  className,
  ...props
}: StatusIndicatorProps) {
  const label = statusLabels[status ?? "offline"]

  if (!showLabel) {
    return (
      <span
        role="status"
        aria-label={label}
        className={cn(statusVariants({ status, size }), className)}
        {...props}
      />
    )
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      <span
        role="status"
        aria-hidden="true"
        className={cn(statusVariants({ status, size }))}
      />
      <span className="text-sm text-muted-foreground">{label}</span>
    </span>
  )
}

export { StatusIndicator, statusVariants }
