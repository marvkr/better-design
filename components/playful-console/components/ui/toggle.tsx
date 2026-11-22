"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { pressedWash } from "./_shared";

/**
 * Playful console Toggle: a chip that stays pressed. Pressed, it takes the
 * orange wash behind the orange rim, never the full orange key, which stays
 * with the one primary action. The default chip is bare and turns cream
 * under the pointer; the outline chip is a white face with an olive edge.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md border font-semibold text-foreground",
    "transition-[background-color,border-color,color] duration-fast ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    pressedWash,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent hover:bg-secondary",
        outline:
          "border-(--line-strong) bg-card hover:bg-secondary disabled:border-border disabled:bg-secondary",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        default: "h-8 px-3 text-sm",
        lg: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** A two-state chip; pass `pressed` and `onPressedChange` to control it. */
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
