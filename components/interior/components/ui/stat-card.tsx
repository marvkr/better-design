import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior StatCard — a panel holding one number. The label is a section
 * label; the number runs mono with tabular-nums (mono is for metadata and
 * numbers). The delta is a 6px-radius chip, tinted success or destructive —
 * never a pill, never amber.
 */

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: React.ReactNode;
}

const trendStyles = {
  up: "bg-success/10 text-success",
  down: "bg-destructive/10 text-destructive",
  flat: "bg-secondary text-muted-foreground shadow-[var(--shadow-row)]",
} as const;

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, delta, trend = "flat", icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[0.875rem] bg-card p-5 shadow-[var(--shadow-lift)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </p>
        {icon ? (
          <span className="ml-auto text-muted-foreground [&_svg]:size-4">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-2 font-mono text-[1.75rem] font-medium leading-tight tabular-nums tracking-[-0.02em] text-foreground">
        {value}
      </p>
      {delta ? (
        <span
          className={cn(
            "mt-2.5 inline-flex items-center rounded-[0.375rem] px-2 py-0.5",
            "font-mono text-[0.6563rem] font-medium tabular-nums",
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
