import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Skeleton: an oat block with a 0.5rem corner that pulses
 * slowly while the real content loads. Shape it with size classes, and
 * round it fully for avatars and pills.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

export { Skeleton };
