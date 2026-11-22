import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Paddock Skeleton: a flat well-grey placeholder in the shape of the content
 * it stands in for, pulsing gently while the page loads.
 */
const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-muted motion-reduce:animate-none", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
