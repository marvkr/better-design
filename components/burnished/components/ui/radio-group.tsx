"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";
import { copperRim, focusRing, wellInset } from "./_shared";

/**
 * Burnished RadioGroup: each option is a round well. The chosen one fills
 * with the primary's cream bevel inside a copper rim, with a small umber
 * dot at the centre.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    data-slot="radio-group"
    className={cn("grid gap-3", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    data-slot="radio-group-item"
    className={cn(
      "relative aspect-square size-5 shrink-0 rounded-full border-2 border-transparent",
      wellInset,
      "transition-[box-shadow,border-color] duration-fast ease-(--ease-out)",
      "[@media(hover:hover)_and_(pointer:fine)]:hover:border-input",
      focusRing,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className={cn(
        "absolute -inset-0.5 flex items-center justify-center rounded-full shadow-(--bevel-primary)",
        copperRim,
      )}
    >
      <span className="size-1.5 rounded-full bg-primary-foreground" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
