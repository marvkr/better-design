import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Firefly EmptyState: a centred note for a screen with nothing on it yet.
 * A round warm disc holds the icon, a short semibold title says what is
 * missing, and a muted line says what to do. Pass the primary Button as
 * `action`, so the one lit pill on the screen is the way forward.
 */
export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** An Iconify name, such as `carbon:document`. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon = "carbon:circle-dash",
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
        "flex flex-col items-center justify-center gap-4 rounded-xl bg-card px-6 py-10 text-center text-card-foreground",
        className,
      )}
      {...props}
    >
      <span
        data-slot="empty-state-icon"
        className="flex size-12 items-center justify-center rounded-full bg-(--surface-2) text-(--foreground-secondary)"
      >
        <Icon icon={icon} aria-hidden="true" className="size-6" />
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <div className="text-base font-semibold leading-snug text-foreground">
          {title}
        </div>
        {description && (
          <div className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {action && <div className="mt-1 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
