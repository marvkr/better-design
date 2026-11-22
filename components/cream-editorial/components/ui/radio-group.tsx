"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

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

/**
 * Cream editorial radio: a pale paper circle behind a warm edge. A chosen
 * radio turns its edge terracotta and holds a small terracotta dot.
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    data-slot="radio-group-item"
    className={cn(
      "aspect-square size-4 shrink-0 rounded-full border border-(--control) bg-(--field)",
      "transition-[border-color,box-shadow] duration-fast ease-out",
      "hover:border-(--foreground-secondary) data-[state=checked]:border-primary",
      focusRing,
      "disabled:cursor-not-allowed disabled:border-(--line-strong) disabled:bg-secondary",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className="flex size-full items-center justify-center"
    >
      <span className="block size-2 rounded-full bg-primary in-disabled:bg-(--foreground-disabled)" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
