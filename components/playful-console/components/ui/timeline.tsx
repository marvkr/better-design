import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Playful console Timeline: a vertical event log, like a changelog.
 *
 * Each event hangs from a small white tile with an olive edge holding a
 * duotone icon, and a dashed olive line runs down to the next tile. The
 * title reads bold in ink with its time in mono at the end of the row, and
 * the body sits under it in the secondary ink. The last event drops its
 * line on its own, so `isLast` is optional.
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

/** Props for one event in the Timeline. */
export interface TimelineItemProps extends Omit<
  React.LiHTMLAttributes<HTMLLIElement>,
  "title"
> {
  /** An Iconify name, such as "ph:file-text-duotone". Defaults to a small dot. */
  icon?: string;
  title?: React.ReactNode;
  timestamp?: React.ReactNode;
  isLast?: boolean;
}

/** One event: its tile, its connecting line, its title, time and body. */
const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="timeline-item"
      className={cn("group/timeline-item relative flex gap-3", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border-[0.09375rem] border-(--line-strong) bg-card text-primary shadow-(--shadow-control-off)">
          <Icon
            icon={icon ?? "ph:dot-outline-fill"}
            className="size-4"
            aria-hidden="true"
          />
        </span>
        <span
          aria-hidden="true"
          data-slot="timeline-connector"
          className={cn(
            "my-1.5 w-0 flex-1 border-l-[0.125rem] border-dashed border-(--line-strong) group-last/timeline-item:hidden",
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
              <div className="min-w-0 text-sm font-bold text-foreground">
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
