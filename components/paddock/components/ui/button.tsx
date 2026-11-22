import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { primaryFace, primaryFaceHover, focusRing, pressScale, quietChip, raisedSurface } from "./_shared";

/**
 * Paddock Button: a small rounded rectangle.
 *
 * The default is the signature: a solid deep teal fill with white text and a
 * crisp 1px highlight along the top edge, the front desk's one action colour.
 * `secondary` is the white control with a 1px cool border; `accent` is the
 * sky blue check-in action a page may feature once. Status colours never sit
 * on a button, so a teal fill always reads as "do this". A press scales the
 * control a little toward the page.
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap",
    "rounded-md font-medium",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(primaryFace, primaryFaceHover),
        primary: cn(primaryFace, primaryFaceHover),
        solid: cn(primaryFace, primaryFaceHover),
        accent: "bg-(--arrived-fill) text-primary-foreground shadow-(--arrived-face) hover:brightness-105",
        secondary: raisedSurface,
        outline:
          "border border-input bg-transparent text-foreground hover:bg-accent",
        quiet: quietChip,
        ghost:
          "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-(--card-ring) hover:bg-destructive/90",
        link: "h-auto rounded-sm px-0 text-(--primary-text) underline decoration-current/30 underline-offset-4 hover:decoration-current",
      },
      size: {
        sm: "h-7 px-2.5 text-[0.8125rem]",
        default: "h-8 px-3 text-sm",
        lg: "h-9 px-4 text-sm",
        icon: "size-8 px-0",
        "icon-sm": "size-7 px-0",
        "icon-lg": "size-9 px-0",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={asChild ? undefined : "button"}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
