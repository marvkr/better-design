import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass StatusIndicator: glowing column dots (To Do amber, In Progress
// green, Blocked violet).

type StatusType = "online" | "offline" | "busy" | "away" | "idle"

const statusConfig = {
  online: {
    label: "Online",
    className: "bg-[oklch(0.72_0.15_155)] shadow-[0_0_0.5rem_oklch(0.72_0.15_155/0.5)]",
  },
  offline: { label: "Offline", className: "bg-muted-foreground/40" },
  busy: {
    label: "Busy",
    className: "bg-destructive shadow-[0_0_0.5rem_oklch(0.6_0.21_27/0.5)]",
  },
  away: {
    label: "Away",
    className: "bg-[oklch(0.69_0.195_42)] shadow-[0_0_0.5rem_oklch(0.69_0.195_42/0.5)]",
  },
  idle: {
    label: "Idle",
    className: "bg-[oklch(0.78_0.14_80)] shadow-[0_0_0.5rem_oklch(0.78_0.14_80/0.5)]",
  },
} satisfies Record<StatusType, { label: string; className: string }>

const dotSizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
}

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  pulse?: boolean
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, showLabel, size = "md", pulse, ...props }, ref) => {
    const config = statusConfig[status]

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <span className="relative inline-flex">
          <span
            className={cn("rounded-full", dotSizes[size], config.className)}
          />
          {pulse && (
            <span
              className={cn(
                "absolute inset-0 animate-ping rounded-full opacity-60",
                dotSizes[size],
                config.className
              )}
            />
          )}
        </span>
        {showLabel && (
          <span className="text-xs font-semibold text-muted-foreground">
            {config.label}
          </span>
        )}
      </div>
    )
  }
)
StatusIndicator.displayName = "StatusIndicator"

interface AvatarStatusProps {
  status: StatusType
  className?: string
}

function AvatarStatus({ status, className }: AvatarStatusProps) {
  const config = statusConfig[status]

  return (
    <span
      aria-label={config.label}
      className={cn(
        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full",
        "ring-2 ring-[oklch(0.19_0.005_75)]",
        config.className,
        className
      )}
    />
  )
}

export { StatusIndicator, AvatarStatus }
export type { StatusIndicatorProps, AvatarStatusProps, StatusType }
