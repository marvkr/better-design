import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { softPanel, optionTrack } from "./_shared";

/**
 * Mallow EmptyState: a lilac option track where content will land, with the
 * icon on a violet-ringed tile, a title, a muted line and an optional action.
 */
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon = "iconoir:archive", title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(
        optionTrack,
        "flex flex-col items-center justify-center gap-4 rounded-2xl px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      <div className={cn(softPanel, "flex size-12 items-center justify-center rounded-md text-muted-foreground")}>
        <Icon icon={icon} aria-hidden="true" className="size-5" />
      </div>
      <div className="max-w-md space-y-1">
        <div className="text-base font-medium text-foreground">{title}</div>
        {description && <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
