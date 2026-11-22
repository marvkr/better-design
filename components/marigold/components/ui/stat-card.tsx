import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { tbCardSurface } from "./_shared";

// Talentboard StatCard: KPI tile like Estimated ARR, with trend chip.

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

function StatCard({ label, value, change, icon, description, className, ...props }: StatCardProps) {
  return (
    <div className={cn(tbCardSurface, "rounded-xl p-5", className)} {...props}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium",
              change.trend === "up" &&
                "bg-[oklch(0.66_0.15_152/0.14)] text-[color:var(--tb-success)]",
              change.trend === "down" && "bg-destructive/15 text-destructive",
              change.trend === "neutral" && "bg-secondary text-muted-foreground"
            )}
          >
            {change.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
            {change.trend === "down" && <ArrowDownRight className="h-3 w-3" />}
            {change.trend === "neutral" && <Minus className="h-3 w-3" />}
            {change.value}
          </span>
        )}
      </div>
      {description && <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}

export { StatCard };
export type { StatCardProps };
