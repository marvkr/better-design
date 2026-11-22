import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior Timeline — a hairline rail with a square 5px-radius ink node per
 * entry, seated on the rail with a bezel-coloured punch-out. The node is ink
 * with the thumb shadow, never accent: an entry that already happened is a
 * fact, not live state. Times are metadata, so they run mono.
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
          <span className="absolute -left-[1.9375rem] top-0.5 size-[0.8125rem] rounded-[0.3125rem] bg-primary shadow-[0_0_0_0.1875rem_var(--background),var(--shadow-thumb)]" />
          <div className="space-y-0.5">
            <p className="text-[0.8125rem] font-medium tracking-[-0.01em] text-foreground">
              {item.title}
            </p>
            {item.description ? (
              <p className="text-[0.7813rem] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            ) : null}
            {item.time ? (
              <p className="font-mono text-[0.6563rem] tabular-nums text-muted-foreground">
                {item.time}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  ),
);
Timeline.displayName = "Timeline";

export { Timeline };
