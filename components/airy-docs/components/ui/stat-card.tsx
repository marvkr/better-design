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
  up: "feather:arrow-up-right",
  down: "feather:arrow-down-right",
  neutral: null,
} as const;

/** Read before the value, so a screen reader hears the direction too. */
const trendSpoken = {
  up: "Up ",
  down: "Down ",
  neutral: "No change ",
} as const;

/**
 * Airy docs StatCard: one number on a hairline card, the way a docs
 * analytics page reports views or API calls. A muted label sits over a
 * large medium-weight figure on tabular digits; an icon rests in a small
 * tray tile at the top right. The change is a tinted pill with an arrow.
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
            <span className="text-3xl font-medium tracking-tight tabular-nums text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-(--foreground-secondary) [&_svg]:size-4"
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
                  "inline-flex h-5.5 items-center gap-0.5 rounded-full px-2 text-xs font-medium tabular-nums",
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
