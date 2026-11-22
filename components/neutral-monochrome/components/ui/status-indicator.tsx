import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusVariants = cva(
  "inline-flex shrink-0 rounded-full",
  {
    variants: {
      status: {
        online:  "bg-primary shadow-[0_0_0_0.125rem_oklch(0.5875_0.2039_277.3624/0.25)]",
        busy:    "bg-destructive shadow-[0_0_0_0.125rem_hsl(var(--destructive)/0.25)]",
        away:    "bg-orange-500 shadow-[0_0_0_0.125rem_oklch(0.6958_0.2043_43.491/0.25)]",
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

const statusLabels = {
  online:  "Online",
  busy:    "Busy",
  away:    "Away",
  offline: "Offline",
} satisfies Record<string, string>

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
