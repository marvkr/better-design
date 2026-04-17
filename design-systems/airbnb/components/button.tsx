import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Airbnb Button — extracted from airbnb.com (2026-04)
// Primary: solid #FF385C, radial gradient on hover
// Secondary: #222 solid
// Outline: white bg, 1px #222 border
// Rounded: 8px default, pill for search CTA
// No drop-shadow on buttons — flat with border or solid fill

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold",
    "rounded-lg transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Rausch solid — radial gradient on hover
        default:
          "bg-primary text-primary-foreground " +
          "hover:[background:var(--rausch-gradient)] hover:text-white",
        // Dark — #222 solid
        secondary:
          "bg-secondary text-secondary-foreground " +
          "hover:bg-[#000000]",
        // Outline — white bg, thin dark border
        outline:
          "border border-foreground bg-background text-foreground " +
          "hover:bg-muted",
        // Subtle outline — light border
        ghost:
          "border border-border bg-background text-foreground " +
          "hover:bg-muted",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90",
        // Link
        link: "text-foreground underline-offset-4 underline hover:text-foreground/80",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 text-xs rounded-lg",
        lg: "h-14 px-8 text-base rounded-xl",
        icon: "h-10 w-10 rounded-full",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
