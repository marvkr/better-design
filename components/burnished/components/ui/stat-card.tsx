import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { raisedBevel } from "./_shared";
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
  up: "bg-success/12 text-success",
  down: "bg-destructive/12 text-destructive",
  neutral: "bg-muted text-muted-foreground",
} as const;

const trendIcon = {
  up: "ph:arrow-up-right",
  down: "ph:arrow-down-right",
  neutral: null,
} as const;

/** Read before the value, so a screen reader hears the direction too. */
const trendSpoken = {
  up: "Up ",
  down: "Down ",
  neutral: "No change ",
} as const;

/**
 * Burnished StatCard: one figure on an umber slab. A muted label sits over
 * a large semibold number on tabular digits; the icon rests on a small
 * raised graphite bevel tile at the top right. The change is a pill washed
 * in its own hue with an arrow.
 */
function StatCard({
  label,
  value,
  change,
  icon,
  description,
  className,
  ...props
}: StatCardProps) {
  const arrow = change ? trendIcon[change.trend] : null;

  return (
    <Card className={cn("py-0", className)} {...props}>
      <CardContent className="flex flex-col gap-3.5 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <span
              aria-hidden="true"
              className={cn(
                raisedBevel,
                "flex size-9 shrink-0 items-center justify-center rounded-lg text-primary-text [&_svg]:size-4",
              )}
            >
              {icon}
            </span>
          )}
        </div>
        {(change || description) && (
          <div className="flex flex-wrap items-center gap-2">
            {change && (
              <span
                className={cn(
                  "inline-flex h-6 items-center gap-0.5 rounded-full px-2.5 text-xs font-semibold tabular-nums",
                  trendTone[change.trend],
                )}
              >
                {arrow && (
                  <Icon icon={arrow} className="size-3" aria-hidden="true" />
                )}
                <span className="sr-only">{trendSpoken[change.trend]}</span>
                {change.value}
              </span>
            )}
            {description && (
              <span className="text-sm text-muted-foreground">
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
