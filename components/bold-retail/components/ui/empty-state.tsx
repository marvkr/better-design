import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Bold retail EmptyState: a centred message for a page with nothing on it
 * yet, such as an empty bag or a search with no results. A grey circle holds
 * the icon, a medium title says what is missing, and a muted line says what
 * to do next. Pass the black pill Button as `action`, so the way forward is
 * the one black shape on the page.
 */
export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** An Iconify name, such as `mingcute:shopping-bag-1-line`. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon = "mingcute:inbox-line",
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
        "flex flex-col items-center justify-center gap-5 rounded-none border border-(--border-soft) bg-card px-6 py-12 text-center text-card-foreground",
        className,
      )}
      {...props}
    >
      <span
        data-slot="empty-state-icon"
        className="flex size-14 items-center justify-center rounded-full bg-secondary text-foreground"
      >
        <Icon icon={icon} aria-hidden="true" className="size-6" />
      </span>
      <div className="flex max-w-sm flex-col gap-1.5">
        <div className="text-xl font-medium leading-snug text-foreground">
          {title}
        </div>
        {description && (
          <div className="text-base leading-relaxed text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {action && (
        <div className="mt-1 flex flex-wrap justify-center gap-3">{action}</div>
      )}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
