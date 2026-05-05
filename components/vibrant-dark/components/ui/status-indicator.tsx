import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Status Indicator: glowing colored dot for presence/status

type StatusType = "online" | "offline" | "busy" | "away" | "idle"

const statusConfig: Record<StatusType, { label: string; dotClass: string; glowClass: string }> = {
  online:  { label: "Online",  dotClass: "bg-[hsl(var(--success))]", glowClass: "shadow-[0_0_0_4px_hsl(146_80%_44%/0.25)]" },
  offline: { label: "Offline", dotClass: "bg-muted-foreground/40",    glowClass: "" },
  busy:    { label: "Busy",    dotClass: "bg-destructive",            glowClass: "shadow-[0_0_0_4px_hsl(339_90%_51%/0.25)]" },
  away:    { label: "Away",    dotClass: "bg-[hsl(var(--warning))]",  glowClass: "shadow-[0_0_0_4px_hsl(37_91%_55%/0.25)]" },
  idle:    { label: "Idle",    dotClass: "bg-yellow-400",             glowClass: "" },
}

const dotSizes = { sm: "h-1.5 w-1.5", md: "h-2.5 w-2.5", lg: "h-3.5 w-3.5" }

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  pulse?: boolean
}

function StatusIndicator({ status, showLabel, size = "md", pulse, className, ...props }: StatusIndicatorProps) {
  const config = statusConfig[status]

  return (
    <div className={cn("flex items-center gap-1.5", className)} {...props}>
      <span className="relative flex shrink-0">
        {pulse && status === "online" && (
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", config.dotClass)} />
        )}
        <span className={cn("relative inline-flex rounded-full", dotSizes[size], config.dotClass, config.glowClass)} />
      </span>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
      )}
    </div>
  )
}

interface AvatarStatusProps { status: StatusType; className?: string }

function AvatarStatus({ status, className }: AvatarStatusProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background",
        config.dotClass,
        className
      )}
    />
  )
}

export { StatusIndicator, AvatarStatus }
export type { StatusIndicatorProps, StatusType }
