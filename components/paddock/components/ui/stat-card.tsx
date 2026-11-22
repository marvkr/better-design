import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { quietChip } from "./_shared";
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
  down: "bg-destructive/10 text-destructive-text",
  neutral: "bg-secondary text-secondary-foreground",
} as const;

const trendIcon = {
  up: "mingcute:arrow-right-up-line",
  down: "mingcute:arrow-right-down-line",
  neutral: null,
} as const;

/** Read before the value, so a screen reader hears the direction too. */
const trendSpoken = {
  up: "Up ",
  down: "Down ",
  neutral: "No change ",
} as const;

/**
 * Paddock StatCard: one figure on a white bordered card. A muted label sits over
 * a large semibold number on tabular digits, the icon rests in a grey chip
 * at the top right, and the change is a small flat chip tinted in its own hue.
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
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[0.8125rem] text-muted-foreground">{label}</span>
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <span
              aria-hidden="true"
              className={cn(
                quietChip,
                "flex size-8 shrink-0 items-center justify-center rounded-sm text-muted-foreground [&_svg]:size-4",
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
                  "inline-flex h-5.5 items-center gap-0.5 rounded-sm px-2 text-xs font-medium tabular-nums",
                  trendTone[change.trend],
                )}
              >
                {arrow && <Icon icon={arrow} className="size-3" aria-hidden="true" />}
                <span className="sr-only">{trendSpoken[change.trend]}</span>
                {change.value}
              </span>
            )}
            {description && (
              <span className="text-[0.8125rem] text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { StatCard };
export type { StatCardProps };
