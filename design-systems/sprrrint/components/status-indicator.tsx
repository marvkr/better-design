import * as React from "react"
import { cn } from "@/lib/utils"

export type StatusType = "online" | "busy" | "away" | "offline"

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType
  size?: "sm" | "default" | "lg"
  label?: string
  showLabel?: boolean
}

const statusStyles: Record<StatusType, { dot: string; label: string }> = {
  online:  { dot: "bg-green-500",                            label: "Online" },
  busy:    { dot: "bg-red-500",                              label: "Busy" },
  away:    { dot: "bg-amber-400",                            label: "Away" },
  offline: { dot: "bg-transparent border-2 border-border",  label: "Offline" },
}

const dotSizes = {
  sm:      "h-2 w-2",
  default: "h-2.5 w-2.5",
  lg:      "h-3.5 w-3.5",
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ status, size = "default", label, showLabel = false, className, ...props }, ref) => {
    const styles = statusStyles[status]
    const displayLabel = label ?? styles.label

    return (
      <span
        ref={ref}
        role="status"
        aria-label={displayLabel}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <span
          className={cn(
            "inline-block shrink-0 rounded-full",
            dotSizes[size],
            styles.dot,
          )}
        />
        {showLabel && (
          <span className="text-sm text-muted-foreground">{displayLabel}</span>
        )}
      </span>
    )
  }
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator }
