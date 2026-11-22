import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard EmptyState: card-framed zero state with a dashed inner well.

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl p-10 text-center",
        "border border-dashed border-border bg-card/50",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground shadow-[var(--tb-shadow-raise)] [&_svg]:size-6">
          {icon}
        </span>
      )}
      <div className="text-base font-semibold text-foreground">{title}</div>
      {description && (
        <div className="max-w-sm text-sm text-muted-foreground">{description}</div>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
