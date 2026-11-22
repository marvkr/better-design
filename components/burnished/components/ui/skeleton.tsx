import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished Skeleton: a placeholder pressed into the page as a shallow
 * well, breathing slowly while the real content loads.
 */
const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-(image:--fill-well) shadow-(--bevel-well) motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
