import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { wellInset } from "./_shared";

/**
 * Burnished EmptyState: a recessed well where content will go, with a round
 * graphite bevel holding the icon. The hollow says "nothing here yet"
 * without a dashed border.
 */
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon = "ph:package", title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl px-6 py-10 text-center",
        wellInset,
        className,
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-(image:--fill-raised) text-muted-foreground shadow-(--bevel-raised)">
        <Icon icon={icon} className="size-5" />
      </div>
      <div className="max-w-md space-y-1.5">
        <div className="text-base font-semibold text-foreground">{title}</div>
        {description && (
          <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>
        )}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
