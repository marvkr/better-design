"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

/**
 * Firefly Label: near-black ink at the body size, set in medium weight so it
 * names a field without shouting over it. When its control is disabled the
 * label fades to the disabled ink instead of dropping to half opacity.
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
