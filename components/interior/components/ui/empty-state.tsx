import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior EmptyState — a panel with nothing in it yet. The icon sits in a
 * square 7px-radius well (avatars and tiles are never circles), drawn at the
 * 1.5px outline weight, and everything stays quiet: muted text, no
 * decoration.
 */

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[0.875rem] bg-card px-8 py-12 text-center",
        "shadow-[var(--shadow-lift)]",
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex size-11 items-center justify-center rounded-[0.4375rem] bg-secondary text-muted-foreground shadow-[var(--shadow-well)] [&_svg]:size-5 [&_svg]:stroke-[1.5]">
          {icon}
        </span>
      ) : null}
      <div className="space-y-1">
        <h3 className="text-[0.9375rem] font-medium tracking-[-0.02em] text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mx-auto max-w-sm text-[0.8438rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
