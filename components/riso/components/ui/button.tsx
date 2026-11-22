import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Retro-Playful Button — Y2K poster CTA.
// Signature material (the `default` hero variant): solid poster-blue fill,
// chunky 2px ink border, a hard offset ink shadow with NO blur, and a press
// that slides the button into its own shadow. Filled controls reuse this.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-bold",
    "rounded-md border-2 border-border transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0",
    "active:translate-x-[0.1875rem] active:translate-y-[0.1875rem] active:shadow-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero — poster-blue slab, hard ink offset, lifts on hover.
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[var(--shadow-hard)] " +
          "hover:translate-x-[var(--riso-btn-hover-x,-0.0313rem)] hover:translate-y-[var(--riso-btn-hover-y,-0.0313rem)] hover:shadow-[var(--riso-btn-hover-shadow,var(--shadow-hard))]",
        // Same material, sunbeam-yellow fill — the alternate poster CTA.
        primary:
          "bg-accent text-accent-foreground " +
          "shadow-[var(--shadow-hard)] " +
          "hover:translate-x-[var(--riso-btn-hover-x,-0.0313rem)] hover:translate-y-[var(--riso-btn-hover-y,-0.0313rem)] hover:shadow-[var(--riso-btn-hover-shadow,var(--shadow-hard))]",
        // Secondary: paper card slab.
        secondary:
          "bg-card text-card-foreground " +
          "shadow-[var(--shadow-hard)] " +
          "hover:translate-x-[var(--riso-btn-hover-x,-0.0313rem)] hover:translate-y-[var(--riso-btn-hover-y,-0.0313rem)] hover:shadow-[var(--riso-btn-hover-shadow,var(--shadow-hard))]",
        // Outline: flat bordered, no offset.
        outline: "bg-transparent text-foreground hover:bg-secondary",
        // Ghost: borderless, understated.
        ghost: "border-transparent bg-transparent text-foreground hover:bg-secondary",
        // Destructive — same slab in alarm red.
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[var(--shadow-hard)] " +
          "hover:translate-x-[var(--riso-btn-hover-x,-0.0313rem)] hover:translate-y-[var(--riso-btn-hover-y,-0.0313rem)] hover:shadow-[var(--riso-btn-hover-shadow,var(--shadow-hard))]",
        // Link
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-sm",
        default: "h-10 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
