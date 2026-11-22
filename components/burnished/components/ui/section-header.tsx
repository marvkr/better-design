import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished SectionHeader: a medium-weight title with tracking pulled in, a
 * muted description beneath, and actions to the right. The optional eyebrow
 * is a short line in the copper glow colour.
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
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <div className="mb-2 text-sm font-semibold text-primary-text">{eyebrow}</div>
        )}
        <h2 className="text-2xl font-medium leading-tight tracking-[-0.02em] text-balance text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  ),
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
