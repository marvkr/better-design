"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, quietFinish, pressScale, selectedLift } from "./_shared";

/**
 * Mallow Toggle: a rounded button that presses on and off. Off, it is the violet tint
 * or the quiet white finish; on, it takes the solid violet primary. The
 * `inset` variant lies flat until it is pressed, then takes the violet tint and ring.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(
          selectedLift,
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-(--violet-edge)",
        ),
        outline: cn(
          quietFinish,
          "data-[state=on]:bg-primary data-[state=on]:bg-none data-[state=on]:hover:bg-none data-[state=on]:text-primary-foreground data-[state=on]:shadow-(--violet-edge)",
        ),
        inset:
          "bg-transparent text-muted-foreground hover:text-foreground data-[state=on]:bg-(--option-face) data-[state=on]:text-foreground data-[state=on]:shadow-(--option-edge)",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-5 text-base",
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
