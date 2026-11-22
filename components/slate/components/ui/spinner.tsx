import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Ops Sharp Spinner : a tight circular loader. A border ring in the DS border
 * color with a graphite-ink leading arc, spinning at a precise, even pace.
 */

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-2",
  xl: "h-8 w-8 border-[0.1875rem]",
};

function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn(
        "animate-spin rounded-full border-border border-t-foreground",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { Spinner };
export type { SpinnerProps };
