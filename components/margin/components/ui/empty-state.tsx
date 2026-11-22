import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Margin EmptyState: a quiet grey canvas where content will go, the way an
 * empty list column looks. A small white tile holds the icon, a short title
 * and a muted line follow, then one action.
 */
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon = "solar:notebook-bold", title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl bg-muted px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm">
        <Icon icon={icon} className="size-5" aria-hidden="true" />
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        {description && <div className="text-sm leading-normal text-muted-foreground">{description}</div>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
