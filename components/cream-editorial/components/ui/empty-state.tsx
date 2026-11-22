import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial EmptyState: a centred note on an oat card for a screen
 * with nothing on it yet. An oat disc holds the icon, a serif title says what
 * is missing, and a caption line says what to do. Pass the primary Button as
 * `action`, so the one terracotta block on the screen is the way forward.
 */
export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** An Iconify name, such as `ph:file-text`. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon = "ph:file-text",
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
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card px-6 py-12 text-center text-card-foreground",
        className,
      )}
      {...props}
    >
      <span
        data-slot="empty-state-icon"
        className="flex size-12 items-center justify-center rounded-full bg-muted text-(--foreground-secondary)"
      >
        <Icon icon={icon} aria-hidden="true" className="size-6" />
      </span>
      <div className="flex max-w-sm flex-col gap-1.5">
        <div className="font-serif text-xl font-medium leading-snug tracking-tight text-foreground">
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
