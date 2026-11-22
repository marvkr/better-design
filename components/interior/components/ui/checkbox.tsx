"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior Checkbox — a 5px-radius cell, per the nested radii scale; never a
 * rounded-full or a 4px shadcn default. Unchecked it is a recessed well.
 * Checked it takes the same flat ink fill and thumb shadow as the primary
 * Button — one material, scaled down. Focus is drawn inset in accent, since
 * a cell has no room outside itself.
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "size-[1.125rem] shrink-0 rounded-[0.3125rem]",
      "border-2 border-border bg-input",
      "shadow-[var(--shadow-well)]",
      "transition-[background-color,border-color,box-shadow] duration-fast",
      "focus-visible:outline-none focus-visible:border-ring focus-visible:bg-card focus-visible:shadow-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
      "data-[state=checked]:shadow-[var(--shadow-thumb)]",
      "data-[state=checked]:focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
      "data-[state=indeterminate]:shadow-[var(--shadow-thumb)]",
      "data-[state=indeterminate]:focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="group flex items-center justify-center text-primary-foreground">
      <Minus
        className="hidden size-3 group-data-[state=indeterminate]:block"
        strokeWidth={2.5}
      />
      <Check
        className="size-3 group-data-[state=indeterminate]:hidden"
        strokeWidth={2.5}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
