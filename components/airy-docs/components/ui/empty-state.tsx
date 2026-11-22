import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Airy docs EmptyState: the note a docs page shows when a search finds
 * nothing or a section has no entries. A small square tile holds the icon,
 * a short title says what is missing, and a muted line says what to do
 * next. Pass a Button as `action` for the way forward.
 */
export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** An Iconify name, such as `feather:book-open`. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon = "feather:file-text",
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
        className="flex size-10 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground"
      >
        <Icon icon={icon} aria-hidden="true" className="size-5" />
      </span>
      <div className="flex max-w-sm flex-col gap-1.5">
        <div className="text-base font-semibold leading-snug text-foreground">
          {title}
        </div>
        {description && (
          <div className="text-sm leading-6 text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {action && (
        <div className="mt-1 flex flex-wrap justify-center gap-2">{action}</div>
      )}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
