import * as React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

// Gauge Dark StatCard: a metric gauge face. Mono digits for the reading,
// status-hued change chips, the icon on a raised plate.

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: {
    value: string | number;
    trend: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  description?: string;
}

function StatCard({
  label,
  value,
  change,
  icon,
  description,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </span>
            <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground shadow-[var(--shadow-raised)]">
              {icon}
            </div>
          )}
        </div>
        {(change || description) && (
          <div className="mt-3 flex items-center gap-2">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-xs font-medium",
                  change.trend === "up" &&
                    "bg-[oklch(0.74_0.12_152/0.12)] text-[var(--gauge-ok)]",
                  change.trend === "down" &&
                    "bg-destructive/10 text-[oklch(0.72_0.16_25)]",
                  change.trend === "neutral" &&
                    "bg-secondary text-muted-foreground"
                )}
              >
                {change.value}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { StatCard };
export type { StatCardProps };
