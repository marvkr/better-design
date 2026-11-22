import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Timeline: a vertical log of events, like dated entries in
 * a reading journal.
 *
 * Each event hangs from a small oat disc, and a warm hairline runs from one
 * disc down to the next. The title reads in ink with its time in muted
 * tabular figures at the end of the row; the body sits under it in the
 * secondary ink. The last event drops its line on its own, so `isLast` is
 * optional.
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
  /** An Iconify name, such as "ph:file-text". Without one, the disc holds a small ink dot. */
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
      className={cn("group/timeline-item relative flex gap-3.5", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-(--foreground-secondary)">
          {icon ? (
            <Icon icon={icon} className="size-3.5" aria-hidden="true" />
          ) : (
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-(--foreground-secondary)"
            />
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
              <div className="min-w-0 text-sm font-medium text-foreground">
                {title}
              </div>
            )}
            {timestamp && (
              <div className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {timestamp}
              </div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-1 text-sm leading-relaxed text-(--foreground-secondary)">
            {children}
          </div>
        )}
      </div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
