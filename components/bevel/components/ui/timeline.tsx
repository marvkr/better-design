import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Timeline.
 *
 * A vertical event log. Each marker is a small round card lifted on the button
 * shadow, so the run of events reads as a column of physical dots rather than
 * outlined circles. The line joining them is one pixel of the track token,
 * which keeps the log inside the same divider language as a list of rows.
 */

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("relative flex flex-col gap-5", className)}
    {...props}
  />
))
Timeline.displayName = "Timeline"

/** Props for `TimelineItem`; `isLast` drops the connector under the marker. */
export interface TimelineItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  icon?: string
  title?: React.ReactNode
  timestamp?: React.ReactNode
  isLast?: boolean
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li ref={ref} className={cn("relative flex gap-3.5", className)} {...props}>
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            "bg-card text-muted-foreground",
            "[box-shadow:var(--shadow-button)]",
          )}
        >
          <Icon
            icon={icon ?? "solar:clock-circle-linear"}
            className="size-[0.9375rem]"
          />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-[var(--track)]" />}
      </div>
      <div className="min-w-0 flex-1 pb-4">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-2">
            {title && (
              <div className="text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[-0.0125rem] text-foreground">
                {title}
              </div>
            )}
            {timestamp && (
              <div className="shrink-0 text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground">
                {timestamp}
              </div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-1 text-[0.9063rem] leading-[1.3125rem] tracking-[0.0188rem] text-muted-foreground">
            {children}
          </div>
        )}
      </div>
    </li>
  ),
)
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
