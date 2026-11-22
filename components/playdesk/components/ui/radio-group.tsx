"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

/*
 * Playdesk RadioGroup — the selected dial takes the primary Button's blue
 * gradient and gloss, with a white centre dot punched out of it.
 */

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2.5", className)}
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
    className={cn(
      "size-[1.125rem] shrink-0 rounded-full",
      "border border-border bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "transition-[box-shadow,background-color,border-color] duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // background-origin defaults to the padding box, so with a transparent
      // border the gradient tile repeats and its darkest end shows as a hairline
      // along the top edge. Painting from the border box removes it.
      "data-[state=checked]:border-transparent data-[state=checked]:[background-origin:border-box]",
      "data-[state=checked]:[background-image:var(--fill-primary)]",
      "data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex size-full items-center justify-center">
      <span className="block size-1.5 rounded-full bg-primary-foreground" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
