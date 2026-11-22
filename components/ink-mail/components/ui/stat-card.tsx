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
  up: "bg-(--success-tint) text-(--success-text)",
  down: "bg-(--destructive-tint) text-(--destructive-text)",
  neutral: "border border-(--line-strong) bg-secondary text-(--foreground-secondary)",
} as const;

const trendIcon = {
  up: "ph:trend-up",
  down: "ph:trend-down",
  neutral: null,
} as const;

/** Read before the value, so a screen reader hears the direction too. */
const trendSpoken = {
  up: "Up ",
  down: "Down ",
  neutral: "No change ",
} as const;

/**
 * Ink mail StatCard: one metric on the card step, the way a sending dashboard
 * reports volume or delivery rate.
 *
 * A muted caption sits over a large medium-weight figure on tabular digits.
 * An optional icon rests in a small bordered square at the top right. The
 * change is a status pill: green when it rises, red when it falls, a quiet
 * neutral chip when it holds.
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
    <Card className={className} {...props}>
      <CardContent className="flex flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-3xl font-medium tracking-tight tabular-nums text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-(--foreground-secondary) [&_svg]:size-4"
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
                  "inline-flex h-6 items-center gap-1 rounded-full px-2 text-xs font-medium tabular-nums",
                  trendTone[change.trend],
                )}
              >
                {arrow && (
                  <Icon icon={arrow} className="size-3.5" aria-hidden="true" />
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
