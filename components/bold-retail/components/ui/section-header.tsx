import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const titleSize = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
} as const satisfies Record<NonNullable<SectionHeaderProps["size"]>, string>;

/**
 * Bold retail SectionHeader: the row above a product rail. A medium Inter
 * title sits on the left with a muted line under it, and the section's
 * actions, such as a Shop link or the carousel arrows, sit at the right end.
 * On a narrow screen the actions wrap below the title.
 */
function SectionHeader({
  title,
  description,
  action,
  size = "md",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-6 gap-y-3",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h2
          className={cn(
            "font-sans font-medium leading-tight text-foreground",
            titleSize[size],
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="max-w-prose text-base text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex shrink-0 items-center gap-3">{action}</div>
      )}
    </div>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
