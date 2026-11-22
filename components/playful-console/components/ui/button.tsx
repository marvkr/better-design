import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { pressDestructive, pressOutline, pressPrimary, pressSecondary } from "./_shared";

/**
 * Playful console Button: a chunky key that presses.
 *
 * Every solid button is a bordered face on an offset slab. It lifts under the
 * pointer and drops into the slab when pressed. The default is the orange
 * key; secondary is a white key on the orange slab; outline is a white key on
 * a cream slab. Ghost and link stay flat for low-emphasis actions.
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[0.5rem] font-bold",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:translate-y-0 disabled:border-(--line-strong) disabled:bg-secondary disabled:text-(--foreground-disabled) disabled:shadow-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // The orange key: the one action a screen exists to offer.
        default: pressPrimary,
        primary: pressPrimary,
        secondary: pressSecondary,
        outline: pressOutline,
        // Deep ink, flat: a strong action that should not compete with orange.
        solid:
          "bg-(--ink) text-(--ink-foreground) transition-colors duration-fast hover:bg-(--foreground-secondary)",
        ghost:
          "bg-transparent text-foreground transition-colors duration-fast hover:bg-secondary",
        destructive: pressDestructive,
        link: "h-auto rounded-sm px-0 font-semibold text-(--link) underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-[0.8125rem]",
        default: "h-10 px-5 text-[0.9375rem]",
        lg: "h-12 px-6 text-base",
        icon: "size-10 px-0",
        "icon-sm": "size-8 px-0",
        "icon-lg": "size-12 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={asChild ? undefined : "button"}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
