import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Margin Timeline: an event log strung on a hairline. Each event hangs from
 * a small paper tab holding its icon, then the title, the time and a muted
 * body.
 */
const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} data-slot="timeline" className={cn("relative flex flex-col gap-5", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

/** Props for one event: a solar icon name, a title, a time and the body as children. */
export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  icon?: string;
  title?: React.ReactNode;
  timestamp?: React.ReactNode;
  isLast?: boolean;
}

/** One event on the timeline, joined to the next by a hairline. */
const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li ref={ref} data-slot="timeline-item" className={cn("relative flex gap-3", className)} {...props}>
      <div className="relative flex flex-col items-center">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm">
          <Icon icon={icon ?? "solar:record-circle-bold"} className="size-3.5" aria-hidden />
        </div>
        {!isLast && <div aria-hidden className="-mb-5 mt-1.5 w-px flex-1 bg-border" />}
      </div>
      <div className="min-w-0 flex-1 pb-1 pt-1">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-3">
            {title && <div className="text-sm font-medium text-foreground">{title}</div>}
            {timestamp && <div className="shrink-0 text-xs tabular-nums text-muted-foreground">{timestamp}</div>}
          </div>
        )}
        {children && <div className="mt-0.5 text-sm leading-snug text-muted-foreground">{children}</div>}
      </div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
