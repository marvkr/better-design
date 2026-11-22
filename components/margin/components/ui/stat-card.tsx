import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

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

const trendTone = {
  up: "bg-success/12 text-success-text",
  down: "bg-destructive/12 text-destructive-text",
  neutral: "bg-(--field) text-muted-foreground",
} as const;

const trendIcon = {
  up: "solar:arrow-right-up-linear",
  down: "solar:arrow-right-down-linear",
  neutral: null,
} as const;

/** Read before the value, so a screen reader hears the direction too. */
const trendSpoken = {
  up: "Up ",
  down: "Down ",
  neutral: "No change ",
} as const;

/**
 * Margin StatCard: one figure on a white sheet. A small muted label and an
 * icon in a soft oxblood tile share the top row, the number sits under them in
 * semibold tabular digits, and the change is a small tinted chip.
 */
function StatCard({ label, value, change, icon, description, className, ...props }: StatCardProps) {
  const arrow = change ? trendIcon[change.trend] : null;

  return (
    <Card className={cn("py-0", className)} {...props}>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-sm text-muted-foreground">{label}</span>
          {icon && (
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-md bg-(--mark) text-(--mark-foreground) [&_svg]:size-4"
            >
              {icon}
            </span>
          )}
        </div>
        <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">{value}</span>
        {(change || description) && (
          <div className="flex flex-wrap items-center gap-2">
            {change && (
              <span
                className={cn(
                  "inline-flex h-5 items-center gap-0.5 rounded-sm px-1.5 text-xs font-medium tabular-nums",
                  trendTone[change.trend],
                )}
              >
                {arrow && <Icon icon={arrow} className="size-3" aria-hidden="true" />}
                <span className="sr-only">{trendSpoken[change.trend]}</span>
                {change.value}
              </span>
            )}
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { StatCard };
export type { StatCardProps };
