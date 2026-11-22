"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Label: warm ink in the sans at medium weight, naming a
 * field without competing with it. A disabled control fades its label to
 * the disabled ink.
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
