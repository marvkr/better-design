import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const titleSize = {
  sm: "text-base font-semibold",
  md: "text-xl font-medium tracking-tight",
  lg: "text-2xl font-medium tracking-tight",
} satisfies Record<NonNullable<SectionHeaderProps["size"]>, string>;

/**
 * Airy docs SectionHeader: a docs section opening. The title sits over a
 * muted one-line summary, with the section's actions at the end of the row.
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
      <div className="flex min-w-0 flex-col gap-1.5">
        <h2 className={cn("leading-tight text-foreground", titleSize[size])}>
          {title}
        </h2>
        {description && (
          <p className="max-w-prose text-sm leading-6 text-muted-foreground">
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
