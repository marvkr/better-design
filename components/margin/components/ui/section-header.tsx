import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin SectionHeader: the list-column header from a notes app. A semibold
 * title at panel size, a muted line under it, and small actions at the end
 * of the row. The optional eyebrow becomes a muted line after the title, so
 * no label ever sits above a heading.
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
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h2 className="text-lg font-semibold text-balance text-foreground">{title}</h2>
        {eyebrow && <div className="text-xs font-medium text-(--primary-text)">{eyebrow}</div>}
        {description && (
          <p className="max-w-2xl text-sm leading-normal text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
    </div>
  ),
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
