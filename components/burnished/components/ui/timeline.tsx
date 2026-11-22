import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Burnished Timeline: an event log strung on a hairline. Each event hangs
 * from a round graphite bevel with its icon, followed by the title, the
 * time and the body.
 */
const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      data-slot="timeline"
      className={cn("relative flex flex-col gap-6", className)}
      {...props}
    />
  ),
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  icon?: string;
  title?: React.ReactNode;
  timestamp?: React.ReactNode;
  isLast?: boolean;
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, title, timestamp, isLast, children, ...props }, ref) => (
    <li ref={ref} data-slot="timeline-item" className={cn("relative flex gap-4", className)} {...props}>
      <div className="relative flex flex-col items-center">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(image:--fill-raised) text-muted-foreground shadow-(--bevel-raised)">
          <Icon icon={icon ?? "ph:circle-fill"} className="size-3.5" />
        </div>
        {!isLast && <div className="-mb-6 mt-2 w-[0.0625rem] flex-1 bg-border" />}
      </div>
      <div className="min-w-0 flex-1 pb-2 pt-1">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-3">
            {title && <div className="text-sm font-semibold text-foreground">{title}</div>}
            {timestamp && (
              <div className="shrink-0 text-xs tabular-nums text-muted-foreground">{timestamp}</div>
            )}
          </div>
        )}
        {children && (
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
        )}
      </div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
