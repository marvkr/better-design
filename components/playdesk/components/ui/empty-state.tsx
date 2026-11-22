import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk EmptyState — a window with nothing in it. The icon sits in a round
 * recessed well so the panel still has one piece of desk hardware in it.
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
        "flex flex-col items-center justify-center gap-3 rounded-xl bg-card px-8 py-12 text-center",
        "[box-shadow:var(--shadow-window)]",
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground [box-shadow:var(--shadow-track-inset)] [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <div className="space-y-1">
        <h3 className="text-base font-medium tracking-[-0.02em] text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
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
