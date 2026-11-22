import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { selectedOption } from "./_shared";
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

/** Change chips share one lilac fill; the text colour and the arrow say which way it went. */
const trendTone = {
  up: "bg-(--tag) text-success-text",
  down: "bg-(--tag) text-destructive-text",
  neutral: "bg-(--tag) text-muted-foreground",
} as const;

const trendIcon = {
  up: "iconoir:arrow-up-right",
  down: "iconoir:arrow-down-right",
  neutral: null,
} as const;

/** Read before the value, so a screen reader hears the direction too. */
const trendSpoken = {
  up: "Up ",
  down: "Down ",
  neutral: "No change ",
} as const;

/**
 * Mallow StatCard: one large figure in medium weight on tabular digits, a
 * muted label above it, an optional icon on a small violet-tinted tile, and the
 * change as a quiet chip below.
 */
function StatCard({ label, value, change, icon, description, className, ...props }: StatCardProps) {
  const arrow = change ? trendIcon[change.trend] : null;

  return (
    <Card className={cn("py-0", className)} {...props}>
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-4xl font-medium tracking-tight tabular-nums text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <span
              aria-hidden="true"
              className={cn(
                selectedOption,
                "flex size-10 shrink-0 items-center justify-center rounded-md [&_svg]:size-5",
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
                  "inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-sm tabular-nums",
                  trendTone[change.trend],
                )}
              >
                {arrow && <Icon icon={arrow} className="size-3.5" aria-hidden="true" />}
                <span className="sr-only">{trendSpoken[change.trend]}</span>
                {change.value}
              </span>
            )}
            {description && <span className="text-sm text-muted-foreground">{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { StatCard };
export type { StatCardProps };
