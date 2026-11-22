import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Playful console EmptyState: a centred note for a screen with nothing on
 * it yet. The icon sits on a small orange-washed tile with the orange rim,
 * a heavy title says what is missing, and a muted line says what to do.
 * Pass the primary Button as `action`, so the orange key is the way forward.
 */
export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** An Iconify name, such as `ph:chart-bar-duotone`. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon = "ph:sparkle-duotone",
      title,
      description,
      action,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card px-6 py-10 text-center text-card-foreground",
        className,
      )}
      {...props}
    >
      <span
        data-slot="empty-state-icon"
        className="flex size-12 items-center justify-center rounded-[0.5rem] border-[0.09375rem] border-(--primary-rim) bg-(--primary-wash) text-foreground shadow-(--shadow-control)"
      >
        <Icon icon={icon} aria-hidden="true" className="size-6" />
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <div className="text-lg font-extrabold leading-snug tracking-tight text-foreground">
          {title}
        </div>
        {description && (
          <div className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {action && <div className="mt-1 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
