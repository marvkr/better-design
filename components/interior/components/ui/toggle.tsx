"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Interior Toggle — off it is quiet text on the panel; on it takes the
 * segmented thumb's material: the primary Button's flat ink fill and thumb
 * shadow. "On" is news about state, so it is said with ink and depth, never
 * accent. Focus is inset accent while quiet, the outside inverted line once
 * the surface is ink.
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-[0.5rem]",
    "text-[0.8125rem] font-medium leading-[1.25rem] text-muted-foreground",
    "transition-[background-color,border-color,box-shadow,color,transform] duration-fast",
    "hover:bg-secondary hover:text-foreground",
    "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
    "data-[state=on]:shadow-[var(--shadow-thumb)]",
    "data-[state=on]:hover:bg-primary/90",
    "data-[state=on]:focus-visible:bg-primary",
    "data-[state=on]:focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-border bg-transparent data-[state=on]:border-primary",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 rounded-[0.4375rem] px-2.5 text-[0.75rem]",
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
