import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { raisedSurface } from "./_shared";

/** Props for a framed empty state with an icon, a title and an optional action. */
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Paddock EmptyState: an open slot on the schedule grown into a
 * panel. A grey well with a dashed outline holds a white icon tile, a title,
 * a muted line and an optional action.
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon = "mingcute:folder-open-line", title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-input bg-muted px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      <div className={cn("flex size-11 items-center justify-center rounded-lg text-muted-foreground", raisedSurface)}>
        <Icon icon={icon} aria-hidden="true" className="size-5" />
      </div>
      <div className="max-w-sm space-y-1">
        <div className="text-[0.9375rem] font-semibold tracking-tight text-foreground">{title}</div>
        {description && <div className="text-[0.8125rem] text-muted-foreground">{description}</div>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
