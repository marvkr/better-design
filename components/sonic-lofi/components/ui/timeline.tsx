import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Timeline — vertical event log. Each item has an icon marker, title, timestamp, body.
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
            "flex h-8 w-8 items-center justify-center rounded-full shrink-0",
            "bg-card border border-border text-muted-foreground",
            "[box-shadow:var(--shadow-s)]"
          )}
        >
          <Icon icon={icon ?? "tabler:point-filled"} className="h-3.5 w-3.5" />
        </div>
        {!isLast && <div className="mt-1 flex-1 w-px bg-border" />}
      </div>
      <div className="flex-1 min-w-0 pb-4">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-2">
            {title && <div className="text-sm font-medium text-foreground">{title}</div>}
            {timestamp && <div className="text-xs text-muted-foreground shrink-0">{timestamp}</div>}
          </div>
        )}
        {children && <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{children}</div>}
      </div>
    </li>
  )
)
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
