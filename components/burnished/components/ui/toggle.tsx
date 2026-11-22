"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, pressScale, quietBevel, raisedBevel } from "./_shared";

/**
 * Burnished Toggle: a bevelled pill. Off, it is the graphite bevel of every
 * neutral control; on, it takes the primary's cream bevel. The `inset`
 * variant sits flat inside a well (a ToggleGroup) until it is pressed.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[0.016em]",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "data-[state=on]:bg-(image:--fill-primary) data-[state=on]:text-primary-foreground data-[state=on]:shadow-(--bevel-primary)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: raisedBevel,
        outline: quietBevel,
        inset:
          "bg-transparent text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
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
