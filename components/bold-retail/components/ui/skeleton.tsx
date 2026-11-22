import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Skeleton: a square soft grey block, the same grey as the
 * photo stage, that pulses while the real content loads. Shape it with size
 * classes, and round it fully for avatars and pills.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("animate-pulse rounded-none bg-secondary motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

export { Skeleton };
