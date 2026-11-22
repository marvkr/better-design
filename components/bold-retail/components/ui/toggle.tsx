"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { activeInvert, focusRing } from "./_shared";

/**
 * Bold retail Toggle: the filter chip. A white pill behind a hairline that
 * flips fully to black with white text when pressed. There is no middle
 * state: a chip is on or it is off.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border bg-background font-medium text-foreground",
    "transition-[background-color,border-color,color] duration-fast ease-out",
    focusRing,
    "disabled:cursor-not-allowed disabled:border-border disabled:bg-secondary disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    activeInvert,
    "data-[state=on]:hover:border-(--primary-hover) data-[state=on]:hover:bg-(--primary-hover)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-border hover:border-foreground",
        outline: "border-(--line-strong) hover:border-foreground",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-9 px-4 text-sm",
        lg: "h-10 px-5 text-base",
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
