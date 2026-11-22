import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { selectedOption } from "./_shared";

/**
 * Mallow Timeline: an event log strung on a hairline, each event hanging from
 * a small violet-tinted tile with its icon, then the title, a tabular time and the
 * body.
 */
const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} data-slot="timeline" className={cn("relative flex flex-col gap-6", className)} {...props} />
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
        <div className={cn(selectedOption, "flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground")}>
          <Icon icon={icon ?? "iconoir:circle"} aria-hidden="true" className="size-4" />
        </div>
        {!isLast && <div aria-hidden="true" className="-mb-6 mt-2 flex-1 border-s border-border" />}
      </div>
      <div className="min-w-0 flex-1 pb-2 pt-1">
        {(title || timestamp) && (
          <div className="flex items-baseline justify-between gap-3">
            {title && <div className="text-sm font-medium text-foreground">{title}</div>}
            {timestamp && <time className="shrink-0 text-sm tabular-nums text-muted-foreground">{timestamp}</time>}
          </div>
        )}
        {children && <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };
