"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { activeWash, focusRing } from "./_shared";

/**
 * Ink mail Toggle: a 0.5rem-corner chip that stays pressed. Pressed, it takes
 * the white wash with full ink and a translucent edge, never the solid
 * off-white, which stays with the one primary action. The default chip is
 * bare in muted ink and lifts one surface step under the pointer; the outline
 * chip sits on the page behind a translucent hairline.
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
