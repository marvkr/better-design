import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Timeline — vertical event log. Each item has an icon marker, title, timestamp, body.
 *
 * Graphite treatment: each marker is a small raised tile (calm, never glowy),
 * the connecting rail is a hairline border, and the body text steps down the
 * grey ramp from soft white title to dim muted body.
 */

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("relative flex flex-col gap-6", className)} {...props} />
  )
)
Timeline.displayName = "Timeline"

export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  icon?: string
  title?: React.ReactNode
  timestamp?: React.ReactNode
  isLast?: boolean
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li ref={ref} className={cn("relative flex gap-4", className)} {...props}>
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            "bg-card border border-border text-muted-foreground",
            "[box-shadow:var(--shadow-tile)]"
          )}
        >
          <Icon icon={icon ?? "tabler:point-filled"} className="h-3.5 w-3.5" />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className="min-w-0 flex-1 pb-4">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-2">
            {title && <div className="text-sm font-medium text-foreground">{title}</div>}
            {timestamp && (
              <div className="shrink-0 text-xs text-muted-foreground">{timestamp}</div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
        )}
      </div>
    </li>
  )
)
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
