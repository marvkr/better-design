"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, quietChip, raisedSurface } from "./_shared";

/** The teal fill a pressed standalone toggle takes, the same face as the primary Button. */
const pressedInk =
  "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-(--primary-face) " +
  "data-[state=on]:hover:bg-primary/88";

/**
 * Paddock Toggle: a small rounded button. Off, it is the white bordered
 * surface of every neutral control; on, it turns to the primary's teal. The `inset` variant sits flat
 * inside a ToggleGroup's grey track and rises as a white segment when pressed.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(raisedSurface, pressedInk),
        outline: cn(quietChip, pressedInk),
        inset: cn(
          "bg-transparent text-muted-foreground hover:text-foreground",
          "data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-(--segment-lift)",
        ),
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3 text-[0.8125rem]",
        lg: "h-11 px-5 text-[0.9375rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** A two-state button built on Radix Toggle. */
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    data-slot="toggle"
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
