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
  neutral: "bg-secondary text-(--foreground-secondary)",
} as const;

const trendIcon = {
  up: "carbon:arrow-up",
  down: "carbon:arrow-down",
  neutral: null,
} as const;

/** Read before the value, so a screen reader hears the direction too. */
const trendSpoken = {
  up: "Up ",
  down: "Down ",
  neutral: "No change ",
} as const;

/**
 * Firefly StatCard: one number on warm paper.
 *
 * The label sits small and muted above a large semibold figure on tabular
 * digits. An optional icon rests in a raised white disc at the top right.
 * The change shows as a tinted pill with an arrow: green when it rises, red
 * when it falls, warm grey when it holds.
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
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-popover text-foreground shadow-(--shadow-card) [&_svg]:size-5"
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
                  "inline-flex h-6 items-center gap-0.5 rounded-full px-2 text-xs font-medium tabular-nums",
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
