import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk Timeline — a hairline spine with a dot per entry. The dot is the
 * accent, the spine stays at border weight.
 */

export interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, items, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("relative space-y-6 border-l border-border pl-6", className)}
      {...props}
    >
      {items.map((item) => (
        <li key={item.title} className="relative">
          <span className="absolute -left-[1.9375rem] top-1 size-2.5 rounded-full bg-primary ring-4 ring-background" />
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            {item.description ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            ) : null}
            {item.time ? (
              <p className="text-[0.6875rem] text-muted-foreground">{item.time}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  ),
);
Timeline.displayName = "Timeline";

export { Timeline };
