import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin Skeleton: a flat block in the field grey that pulses softly while
 * the real content loads, and holds still when motion is reduced.
 */
const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-(--field) motion-reduce:animate-none", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
