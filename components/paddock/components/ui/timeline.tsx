import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { raisedSurface } from "./_shared";

/** Paddock Timeline: an ordered log of events strung on a thin line. */
const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} data-slot="timeline" className={cn("relative flex flex-col gap-5", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

/** Props for one event: an icon, a title, a time and a body. */
export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  icon?: string;
  title?: React.ReactNode;
  timestamp?: React.ReactNode;
  isLast?: boolean;
}

/**
 * One event: a small white tile holding the icon (or a grey dot), then the
 * title, the time as a quiet date and the body in muted text.
 */
const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li ref={ref} data-slot="timeline-item" className={cn("relative flex gap-3", className)} {...props}>
      <div className="relative flex flex-col items-center">
        <div
          aria-hidden="true"
          className={cn("flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground", raisedSurface)}
        >
          {icon ? (
            <Icon icon={icon} className="size-3.5" />
          ) : (
            <span className="size-2 rounded-full bg-muted-foreground" />
          )}
        </div>
        {!isLast && <div aria-hidden="true" className="-mb-5 mt-1.5 w-0.25 flex-1 bg-border" />}
      </div>
      <div className="min-w-0 flex-1 pt-1">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-3">
            {title && <div className="text-sm font-medium text-foreground">{title}</div>}
            {timestamp && <div className="shrink-0 text-xs tabular-nums text-muted-foreground">{timestamp}</div>}
          </div>
        )}
        {children && <div className="mt-0.5 text-[0.8125rem] text-muted-foreground">{children}</div>}
      </div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
