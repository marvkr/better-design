import * as React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

/*
 * Ops Sharp Stat Card : a single metric tile on the white ops panel (the DS
 * Card). A muted label, a large graphite value, an optional icon chip on the
 * secondary surface, and a trend pill tinted from the DS success/destructive
 * tokens.
 */

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
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
        {(change || description) && (
          <div className="mt-3 flex items-center gap-2">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium",
                  change.trend === "up" &&
                    "border border-success/20 bg-success/10 text-success",
                  change.trend === "down" &&
                    "border border-destructive/20 bg-destructive/10 text-destructive",
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
