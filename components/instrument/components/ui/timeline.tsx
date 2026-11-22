import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark Timeline: event lamps on a vertical groove, ringed with the
// card surface so each dot reads as set into the panel.

interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

const variantDotClass = {
  default: "bg-border",
  success: "bg-[var(--gauge-ok)] shadow-[0_0_0.375rem_oklch(0.74_0.12_152/0.4)]",
  warning: "bg-[var(--gauge-warn)] shadow-[0_0_0.375rem_oklch(0.76_0.14_70/0.4)]",
  destructive: "bg-destructive shadow-[0_0_0.375rem_oklch(0.55_0.19_25/0.4)]",
};

function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const variant = item.variant ?? "default";

        return (
          <div key={index} className="flex gap-3">
            {/* Left column: dot + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-2 ring-card",
                  item.icon
                    ? "border border-border bg-secondary shadow-[var(--shadow-raised)]"
                    : variantDotClass[variant]
                )}
              >
                {item.icon ? (
                  <span className="text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5">
                    {item.icon}
                  </span>
                ) : null}
              </div>
              {!isLast && <div className="mt-1 h-full w-px bg-border" />}
            </div>

            {/* Right column: content */}
            <div className={cn("pb-6", isLast && "pb-0")}>
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                {item.date && (
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.date}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Timeline };
export type { TimelineProps, TimelineItem };
