import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Timeline: an order's tracking log, from Ordered to Delivered.
 *
 * Each event hangs from a round soft grey marker holding a small icon, or a
 * black dot when no icon is given, and a hairline runs down to the next
 * marker. The title reads in black with its time in grey tabular figures at
 * the end of the row; the body sits under it in grey. The last event drops
 * its line on its own, so `isLast` is optional.
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
  /** An Iconify name, such as "mingcute:truck-line". Defaults to a small dot. */
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
      className={cn("group/timeline-item relative flex gap-4", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
          {icon ? (
            <Icon icon={icon} className="size-4" aria-hidden="true" />
          ) : (
            <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
          )}
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
          "min-w-0 flex-1 pt-1 pb-6 group-last/timeline-item:pb-0",
          isLast && "pb-0",
        )}
      >
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-3">
            {title && (
              <div className="min-w-0 text-base font-medium text-foreground">
                {title}
              </div>
            )}
            {timestamp && (
              <div className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {timestamp}
              </div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-1 text-sm text-muted-foreground">{children}</div>
        )}
      </div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
