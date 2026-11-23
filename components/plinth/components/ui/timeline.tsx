import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Timeline: an event log read like the editor's shot track. Each
 * event hangs off a recessed rail on a small seated marker; the time is a
 * Geist Mono readout.
 */

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("relative flex flex-col", className)} {...props} />
  )
)
Timeline.displayName = "Timeline"

export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  icon?: React.ReactNode
  title?: React.ReactNode
  timestamp?: React.ReactNode
  isLast?: boolean
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li ref={ref} className={cn("relative flex gap-3.5", className)} {...props}>
      <div className="relative flex w-7 shrink-0 flex-col items-center">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-input text-muted-foreground [box-shadow:var(--shadow-inset)]">
          {icon ?? <span className="size-2 rounded-full [background:var(--ember-gradient)]" />}
        </span>
        {!isLast && <span aria-hidden="true" className="my-1 w-0.5 flex-1 rounded-full bg-input" />}
      </div>
      <div className={cn("min-w-0 flex-1 pt-1", !isLast && "pb-5")}>
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-3">
            {title && <div className="text-sm font-medium text-foreground">{title}</div>}
            {timestamp && (
              <div className="shrink-0 font-mono text-[0.6875rem] uppercase text-muted-foreground">{timestamp}</div>
            )}
          </div>
        )}
        {children && <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </li>
  )
)
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
