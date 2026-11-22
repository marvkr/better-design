"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

/*
 * Interior RadioGroup — circles are banned, so a radio is a 5px-radius cell
 * like the checkbox, told apart by its indicator: a small 1.5px-radius ink
 * dot seated in the cell, not a tick. Checked, the cell stays a well and the
 * dot carries the primary Button's ink fill and thumb shadow — the selected
 * state is ink and depth, never blue.
 */

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn("grid gap-2.5", className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "flex size-[1.125rem] shrink-0 items-center justify-center rounded-[0.3125rem]",
      "border-2 border-border bg-input",
      "shadow-[var(--shadow-well)]",
      "transition-[background-color,border-color,box-shadow] duration-fast",
      "focus-visible:outline-none focus-visible:border-ring focus-visible:bg-card focus-visible:shadow-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary/20 data-[state=checked]:bg-card data-[state=checked]:shadow-none",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span className="block size-2 rounded-[0.0938rem] bg-primary shadow-[var(--shadow-thumb)]" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
