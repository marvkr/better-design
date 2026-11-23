import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth StatusIndicator: a lit dot in a dark socket, like a record light
 * on the timeline, with an optional mono label.
 */

type StatusType = "online" | "offline" | "busy" | "away" | "idle"

const statusConfig = {
  online: { label: "Online", dot: "bg-success" },
  offline: { label: "Offline", dot: "bg-muted-foreground" },
  busy: { label: "Busy", dot: "bg-destructive" },
  away: { label: "Away", dot: "bg-warning" },
  idle: { label: "Idle", dot: "bg-muted-foreground/60" },
} satisfies Record<StatusType, { label: string; dot: string }>

const dotSizes = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
}

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  showLabel?: boolean
  label?: React.ReactNode
  size?: "sm" | "md" | "lg"
  pulse?: boolean
}

function StatusIndicator({ status, showLabel, label, size = "md", pulse, className, ...props }: StatusIndicatorProps) {
  const config = statusConfig[status]
  const text = label ?? (showLabel ? config.label : null)
  return (
    <div data-slot="status-indicator" className={cn("inline-flex items-center gap-2", className)} {...props}>
      <span className="relative flex shrink-0 rounded-full p-0.5 bg-input [box-shadow:var(--shadow-inset)]">
        {pulse && (
          <span
            aria-hidden="true"
            className={cn("absolute inset-0.5 rounded-full opacity-60 motion-safe:animate-ping", config.dot)}
          />
        )}
        <span className={cn("relative inline-flex rounded-full", dotSizes[size], config.dot)} />
      </span>
      {text ? (
        <span className="font-mono text-[0.6875rem] uppercase text-muted-foreground">{text}</span>
      ) : (
        <span className="sr-only">{config.label}</span>
      )}
    </div>
  )
}

interface AvatarStatusProps {
  status: StatusType
  className?: string
}

/* A status dot pinned to the corner of an avatar, cut out of it by a ring
   in the stage colour. */
function AvatarStatus({ status, className }: AvatarStatusProps) {
  const config = statusConfig[status]
  return (
    <span
      data-slot="avatar-status"
      className={cn("absolute bottom-0 right-0 block size-2.5 rounded-full ring-2 ring-background", config.dot, className)}
    >
      <span className="sr-only">{config.label}</span>
    </span>
  )
}

export { StatusIndicator, AvatarStatus }
export type { StatusIndicatorProps, AvatarStatusProps, StatusType }
