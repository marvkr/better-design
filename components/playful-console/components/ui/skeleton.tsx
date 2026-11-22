import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console Skeleton: a cream block at the 0.25rem field corner that
 * pulses while the real content loads. Shape it with size classes, and
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
      className={cn("animate-pulse rounded-md bg-(--surface-3)", className)}
      {...props}
    />
  );
}

export { Skeleton };
