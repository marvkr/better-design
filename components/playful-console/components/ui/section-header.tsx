import * as React from "react";

import { cn } from "@/lib/utils";

/** Props for SectionHeader: a title, an optional line under it and actions. */
interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const titleSize = {
  sm: "text-base font-bold",
  md: "text-xl font-extrabold tracking-tight",
  lg: "text-2xl font-extrabold tracking-tight",
} as const satisfies Record<NonNullable<SectionHeaderProps["size"]>, string>;

/**
 * Playful console SectionHeader: a heavy title, a muted line under it, and
 * the section's actions at the end of the row. On a narrow screen the
 * actions drop below the title instead of squeezing it.
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
        "flex flex-wrap items-end justify-between gap-x-4 gap-y-3",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className={cn("leading-tight text-foreground", titleSize[size])}>
          {title}
        </h2>
        {description && (
          <p className="max-w-prose text-sm text-muted-foreground">
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
