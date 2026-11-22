import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard SectionHeader: section title row with an optional trailing action,
// like Payment methods / Edit in the portal.

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const titleSize = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

function SectionHeader({
  title,
  description,
  action,
  size = "md",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)} {...props}>
      <div className="min-w-0">
        <h3 className={cn("font-semibold leading-tight text-foreground", titleSize[size])}>
          {title}
        </h3>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
