import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Spinner: orange arc on a faint track.

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-[0.1563rem]",
  xl: "h-8 w-8 border-[0.1875rem]",
};

function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div role="status" aria-label="Loading" className={cn("inline-flex", className)} {...props}>
      <span
        className={cn(
          "animate-spin rounded-full",
          "border-border/60 border-t-primary",
          sizeMap[size]
        )}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export { Spinner };
export type { SpinnerProps };
