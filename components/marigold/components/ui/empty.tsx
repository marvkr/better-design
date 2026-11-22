import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Empty: compact zero-state block.

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function Empty({ icon, title, description, action, className, ...props }: EmptyProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-2 py-10 text-center", className)}
      {...props}
    >
      {icon && (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground shadow-[var(--tb-shadow-raise)] [&_svg]:size-5">
          {icon}
        </span>
      )}
      <div className="text-sm font-medium text-foreground">{title}</div>
      {description && <div className="max-w-xs text-xs text-muted-foreground">{description}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export { Empty };
export type { EmptyProps };
