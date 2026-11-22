import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Timeline — vertical event log milled into the steel plate. Each item has a
 * raised chrome marker dot, a title, a timestamp, and a body. The connecting
 * rail is a recessed hairline channel.
 */

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("relative flex flex-col gap-6", className)}
    {...props}
  />
))
Timeline.displayName = "Timeline"

export interface TimelineItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  /**
   * Kept for API compatibility with the shared timeline contract. chrome-toggle
   * renders a raised chrome marker dot rather than an icon-font glyph.
   */
  icon?: string
  title?: React.ReactNode
  timestamp?: React.ReactNode
  isLast?: boolean
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    { className, icon: _icon, title, timestamp, isLast, children, ...props },
    ref
  ) => (
    <li ref={ref} className={cn("relative flex gap-4", className)} {...props}>
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            "bg-card border border-white/10 text-muted-foreground",
            "[box-shadow:var(--shadow-sm)]"
          )}
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full [background:var(--knob-on)] [box-shadow:var(--shadow-knob)]"
          />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className="min-w-0 flex-1 pb-4">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-2">
            {title && (
              <div className="text-sm font-medium text-foreground">{title}</div>
            )}
            {timestamp && (
              <div className="shrink-0 text-xs text-muted-foreground">
                {timestamp}
              </div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        )}
      </div>
    </li>
  )
)
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
