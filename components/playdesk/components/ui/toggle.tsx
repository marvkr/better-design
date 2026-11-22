"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Playdesk Toggle — off it is a flat desk chip, on it presses into the surface
 * with the same recessed groove the Switch track uses.
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full",
    "text-sm font-medium text-muted-foreground",
    "transition-[box-shadow,background-color,color] duration-fast ease-out",
    "hover:bg-foreground/[0.05] hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-secondary data-[state=on]:text-foreground",
    "data-[state=on]:[box-shadow:var(--shadow-track-inset)]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-border bg-card",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5 text-xs",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
