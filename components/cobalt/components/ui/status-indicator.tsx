import * as React from "react"

import { cn } from "@/lib/utils"

/* StatusIndicator — presence dots; online glows cyan like the spec's pips. */

type StatusType = "online" | "offline" | "busy" | "away" | "idle"

const statusConfig = {
  online: {
    label: "Online",
    className: "bg-chart-2 [box-shadow:0_0_0.375rem_oklch(0.75_0.13_215_/_0.6)]",
  },
  offline: { label: "Offline", className: "bg-muted-foreground/40" },
  busy: { label: "Busy", className: "bg-destructive" },
  away: { label: "Away", className: "bg-chart-3" },
  idle: { label: "Idle", className: "bg-chart-4" },
} satisfies Record<StatusType, { label: string; className: string }>

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  pulse?: boolean
}

const dotSizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
}

function StatusIndicator({
  status,
  showLabel,
  size = "md",
  pulse,
  className,
  ...props
}: StatusIndicatorProps) {
  const config = statusConfig[status]

  return (
    <div className={cn("flex items-center gap-1.5", className)} {...props}>
      <span className="relative flex shrink-0">
        {pulse && status === "online" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              config.className
            )}
          />
        )}
        <span className={cn("relative inline-flex rounded-full", dotSizes[size], config.className)} />
      </span>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
      )}
    </div>
  )
}

interface AvatarStatusProps {
  status: StatusType
  className?: string
}

function AvatarStatus({ status, className }: AvatarStatusProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-card",
        config.className,
        className
      )}
    />
  )
}

export { StatusIndicator, AvatarStatus }
export type { StatusIndicatorProps, AvatarStatusProps, StatusType }
