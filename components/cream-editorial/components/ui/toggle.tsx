"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { activeWash, focusRing } from "./_shared";

/**
 * Cream editorial Toggle: a sans label that stays pressed. Pressed, it takes
 * the oat block in full ink, the way a category filter reads; terracotta
 * stays with the one primary action. The default toggle is bare and warms
 * under the pointer; the outline toggle sits on cream behind a firmer line.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md border font-medium text-muted-foreground",
    "transition-[background-color,border-color,color] duration-fast ease-out",
    "hover:text-foreground",
    focusRing,
    "disabled:pointer-events-none disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    activeWash,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent hover:bg-secondary",
        outline:
          "border-(--line-strong) bg-background hover:bg-secondary disabled:border-border",
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        default: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-sm",
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
