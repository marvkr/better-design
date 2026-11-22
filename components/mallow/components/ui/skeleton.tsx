import * as React from "react";

import { cn } from "@/lib/utils";
import { optionTrack } from "./_shared";

/**
 * Mallow Skeleton: a lilac block where content will land, fading slowly in
 * and out while it loads. It holds still under reduced motion.
 */
const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md motion-reduce:animate-none", optionTrack, className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
