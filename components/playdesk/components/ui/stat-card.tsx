import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk StatCard — a window holding one number. The delta is a small pill,
 * tinted rather than coloured text, so it stays readable at a glance.
 */

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: React.ReactNode;
}

const trendStyles = {
  up: "bg-[var(--pop-green)] text-[var(--pop-green-foreground)]",
  down: "bg-destructive/10 text-destructive",
  flat: "bg-muted text-muted-foreground",
} as const;

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, delta, trend = "flat", icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-card p-5 [box-shadow:var(--shadow-window)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground">
          {label}
        </p>
        {icon ? (
          <span className="ml-auto text-muted-foreground [&_svg]:size-4">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-3xl font-medium tracking-[-0.04em] text-foreground">
        {value}
      </p>
      {delta ? (
        <span
          className={cn(
            "mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-bold tracking-[0.02em]",
            trendStyles[trend],
          )}
        >
          {delta}
        </span>
      ) : null}
    </div>
  ),
);
StatCard.displayName = "StatCard";

export { StatCard };
