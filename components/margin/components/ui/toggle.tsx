"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, pressScale } from "./_shared";

/**
 * Margin Toggle: a small toolbar button that stays pressed. Off, it is the
 * paper tab with a hairline ring; on, it turns the soft oxblood of a selected
 * row. The `inset` variant sits flat inside a grey track (a ToggleGroup)
 * and, when pressed, becomes the paper tab set into that track.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "data-[state=on]:bg-(--mark) data-[state=on]:text-(--mark-foreground)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-card text-foreground shadow-sm hover:bg-muted",
        outline: "bg-transparent text-foreground shadow-sm hover:bg-accent",
        inset:
          "rounded-md bg-transparent text-muted-foreground hover:text-foreground data-[state=on]:bg-card data-[state=on]:font-medium data-[state=on]:text-foreground data-[state=on]:shadow-sm",
      },
      size: {
        default: "h-7.5 px-3 text-sm",
        sm: "h-7 px-2.5 text-sm",
        lg: "h-9 px-4 text-sm",
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
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
