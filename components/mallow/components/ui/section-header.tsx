import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Mallow SectionHeader: a medium-weight title with a muted line under it and
 * actions on the right; the optional eyebrow sits after the title as a
 * quiet note, never above it.
 */
export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, eyebrow, actions, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="section-header"
      className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-medium leading-tight tracking-tight text-balance text-foreground">{title}</h2>
        {eyebrow && <div className="mt-1 text-sm text-muted-foreground">{eyebrow}</div>}
        {description && (
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  ),
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
