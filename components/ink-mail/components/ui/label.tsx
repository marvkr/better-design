"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

/**
 * Ink mail Label: off-white ink in Inter medium at the small size, so it
 * names a field without competing with it. When its control is disabled the
 * label drops to the disabled ink instead of half opacity.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    data-slot="label"
    className={cn(
      "flex select-none items-center gap-2 text-sm font-medium leading-snug text-foreground",
      "peer-disabled:cursor-not-allowed peer-disabled:text-(--foreground-disabled)",
      className,
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
