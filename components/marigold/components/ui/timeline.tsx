import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Timeline: event feed with tinted markers per intent.

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

const markerVariant = {
  default: "bg-primary",
  success: "bg-[oklch(0.66_0.15_152)]",
  warning: "bg-[oklch(0.8_0.13_78)]",
  destructive: "bg-destructive",
};

function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-1.5 flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full",
                  markerVariant[item.variant ?? "default"]
                )}
              >
                {item.icon}
              </span>
              {!isLast && <span className="my-1 w-px flex-1 bg-border/70" />}
            </div>
            <div className={cn("min-w-0 flex-1", !isLast && "pb-6")}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{item.title}</span>
                {item.date && (
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {item.date}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
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
