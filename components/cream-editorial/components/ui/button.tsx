import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, primaryFill } from "./_shared";

/**
 * Cream editorial Button: a flat block with a 0.5rem corner.
 *
 * Type is the clean sans at medium weight. The primary is flat terracotta
 * with white type; hover deepens it and nothing else moves. The secondary is
 * a cream block behind a warm hairline, and the ink variant is the dark
 * block a reading room uses for "Contact sales". No gradients, no shadows.
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md font-medium",
    "transition-[background-color,color,border-color] duration-fast ease-out",
    focusRing,
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-muted disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: primaryFill,
        primary: primaryFill,
        // Warm ink block, for a strong action that is not the terracotta one.
        solid: "bg-foreground text-background hover:bg-foreground/85",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
        outline:
          "border border-(--line-strong) bg-background text-foreground hover:bg-secondary",
        ghost: "bg-transparent text-(--foreground-secondary) hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "h-auto rounded-sm px-0 text-(--primary-text) underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-9 px-4 text-[0.9375rem]",
        lg: "h-11 px-5 text-base",
        icon: "size-9 px-0",
        "icon-sm": "size-8 px-0",
        "icon-lg": "size-11 px-0",
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
