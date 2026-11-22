import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const titleSize = {
  sm: "font-sans text-base font-medium tracking-tight leading-tight",
  md: "font-sans text-xl font-medium tracking-tight leading-tight",
  lg: "font-serif text-4xl font-normal tracking-tight leading-none",
} as const satisfies Record<NonNullable<SectionHeaderProps["size"]>, string>;

/**
 * Ink mail SectionHeader: a title, a grey line under it, and the section's
 * actions at the end of the row. The large size sets the title in the
 * editorial serif; the smaller sizes stay in Inter. On a narrow screen the
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
      <div className="flex min-w-0 flex-col gap-1.5">
        <h2 className={cn("text-foreground", titleSize[size])}>{title}</h2>
        {description && (
          <p className="max-w-prose text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex shrink-0 items-center gap-2">{action}</div>
      )}
    </div>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
