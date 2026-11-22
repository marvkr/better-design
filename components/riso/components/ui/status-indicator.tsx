import * as React from "react"
import { cn } from "@/lib/utils"

// Retro-Playful Status Indicator: presence/status dot with optional label

type StatusType = "online" | "offline" | "busy" | "away" | "idle"

const statusConfig = {
  online: { label: "Online", className: "bg-[oklch(0.6889_0.1644_152.71)]" },
  offline: { label: "Offline", className: "bg-muted-foreground/40" },
  busy: { label: "Busy", className: "bg-destructive" },
  away: { label: "Away", className: "bg-[oklch(0.7041_0.1885_47.62)]" },
  idle: { label: "Idle", className: "bg-[oklch(0.8369_0.1644_84.43)]" },
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

// AvatarStatus: overlays a status dot on an avatar
interface AvatarStatusProps {
  status: StatusType
  className?: string
}

function AvatarStatus({ status, className }: AvatarStatusProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background",
        config.className,
        className
      )}
    />
  )
}

export { StatusIndicator, AvatarStatus }
export type { StatusIndicatorProps, AvatarStatusProps, StatusType }
