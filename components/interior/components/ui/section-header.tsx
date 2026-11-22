import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior SectionHeader — title first, supporting line under it, actions to
 * the right. The title is medium with negative tracking; weight never does
 * the work tracking can.
 */

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-end justify-between gap-4 pb-4",
        className,
      )}
      {...props}
    >
      <div className="space-y-1">
        <h2 className="text-[1.0625rem] font-medium tracking-[-0.02em] text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="max-w-prose text-[0.8438rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  ),
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
