import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Button — dark analytics board, glowing electric-violet primary.
// default/primary: saturated violet fill, violet rim, soft outer glow + inset
// highlight (the --shadow-glow material reused by checkbox/switch/radio/slider).
// secondary/outline/ghost: dark panels over the canvas.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-md transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98] active:brightness-95",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero — glowing violet material.
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-glow)] " +
          "hover:bg-primary/95 hover:[box-shadow:var(--shadow-glow-hover)]",
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-glow)] " +
          "hover:bg-primary/95 hover:[box-shadow:var(--shadow-glow-hover)]",
        // Secondary: dark panel, border, subtle shadow.
        secondary:
          "bg-secondary text-secondary-foreground " +
          "border border-border " +
          "[box-shadow:0_0.0625rem_0.125rem_oklch(0_0_0/0.25)] " +
          "hover:bg-accent hover:border-border/60",
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-border/80",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:0_0_0_0.0625rem_oklch(from_var(--destructive)_l_c_h/0.5),0_0.0625rem_0.1875rem_oklch(0_0_0/0.35)] " +
          "hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg:      "h-10 px-6 text-sm",
        icon:    "h-9 w-9",
        "icon-sm": "h-8 w-8 rounded-md",
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
