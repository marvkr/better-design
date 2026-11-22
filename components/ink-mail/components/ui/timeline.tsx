import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Ink mail Timeline: a vertical event log, the way a message's delivery
 * history reads (queued, sent, delivered, opened).
 *
 * Each event hangs from a round marker on the elevated surface step, edged
 * by a translucent hairline, and a hairline rail runs down to the next one.
 * The title reads in full ink with its timestamp in muted mono digits at the
 * end of the row; the body sits under it in the secondary ink. The last
 * event drops its rail on its own, so `isLast` is optional.
 */
const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    data-slot="timeline"
    className={cn("relative flex flex-col", className)}
    {...props}
  />
));
Timeline.displayName = "Timeline";

export interface TimelineItemProps extends Omit<
  React.LiHTMLAttributes<HTMLLIElement>,
  "title"
> {
  /** An Iconify name, such as "ph:paper-plane-tilt". Defaults to a small dot. */
  icon?: string;
  title?: React.ReactNode;
  timestamp?: React.ReactNode;
  isLast?: boolean;
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="timeline-item"
      className={cn("group/timeline-item relative flex gap-3", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-(--line-strong) bg-secondary text-(--foreground-secondary)">
          <Icon
            icon={icon ?? "ph:dot-outline"}
            className="size-4"
            aria-hidden="true"
          />
        </span>
        <span
          aria-hidden="true"
          data-slot="timeline-connector"
          className={cn(
            "my-1 w-px flex-1 bg-border group-last/timeline-item:hidden",
            isLast && "hidden",
          )}
        />
      </div>
      <div
        className={cn(
          "min-w-0 flex-1 pt-1.5 pb-6 group-last/timeline-item:pb-0",
          isLast && "pb-0",
        )}
      >
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-3">
            {title && (
              <div className="min-w-0 text-sm font-medium text-foreground">
                {title}
              </div>
            )}
            {timestamp && (
              <div className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                {timestamp}
              </div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-1 text-sm text-(--foreground-secondary)">
            {children}
          </div>
        )}
      </div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
