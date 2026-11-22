import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark EmptyState: an unpopulated equipment bay. Dashed outline over
// the recessed well surface, with the icon on a raised plate.

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-input/60 p-10 text-center shadow-[var(--shadow-well)]",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground shadow-[var(--shadow-raised)]">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
