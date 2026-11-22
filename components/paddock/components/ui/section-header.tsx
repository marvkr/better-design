import * as React from "react";

import { cn } from "@/lib/utils";

/** Props for a section title with a description and actions. */
export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * Paddock SectionHeader: a compact page header. A tight semibold title, a
 * muted line under it and actions to the right. The optional eyebrow sits
 * beside the title as a grey chip, never above it.
 */
const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, eyebrow, actions, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="section-header"
      className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground">{title}</h2>
          {eyebrow && (
            <span className="inline-flex h-5.5 items-center rounded-sm bg-secondary px-2 text-xs font-medium text-secondary-foreground">
              {eyebrow}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  ),
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
