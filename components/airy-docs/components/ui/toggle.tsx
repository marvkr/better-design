"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { activeWash } from "./_shared";

/**
 * Airy docs Toggle: a pill that stays pressed. Pressed, it takes the faint
 * green wash with green ink, the same mark as the active sidebar link. The
 * default pill is bare and greys under the pointer; the outline pill sits on
 * white behind a hairline.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border font-medium text-(--foreground-secondary)",
    "transition-[background-color,border-color,color] duration-fast ease-out",
    "outline-none focus-visible:ring-3 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    activeWash,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent hover:bg-secondary hover:text-foreground",
        outline:
          "border-(--line-strong) bg-background hover:bg-secondary hover:text-foreground disabled:border-border disabled:bg-secondary",
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
