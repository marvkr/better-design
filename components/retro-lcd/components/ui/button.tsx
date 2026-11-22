import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Retro LCD Button — a calculator / digital-watch key.
// Primary: solid olive "ink" key, LCD-green legend, subtle raised rim + press travel.
// Secondary: graphite casing key. Outline/ghost: thin olive trace on the screen.
// Monospace legends, slight uppercase tracking for the digital readout feel.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-mono text-sm font-semibold uppercase tracking-wider",
    "rounded-md transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        // Olive ink key — solid fill, raised rim (inset top highlight + drop)
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.12),0_0.125rem_0.25rem_oklch(0_0_0/0.22)] " +
          "hover:brightness-110 active:shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.3)]",
        // Graphite casing key
        secondary:
          "bg-secondary text-secondary-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.10),0_0.125rem_0.25rem_oklch(0_0_0/0.22)] " +
          "hover:brightness-110 active:shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.3)]",
        // Olive trace on the screen
        outline:
          "border border-foreground/60 bg-transparent text-foreground " +
          "hover:bg-foreground/5 active:bg-foreground/10",
        // No trace until hover
        ghost:
          "bg-transparent text-foreground " +
          "hover:bg-foreground/5 active:bg-foreground/10",
        // Low-battery brick
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.12),0_0.125rem_0.25rem_oklch(0_0_0/0.22)] " +
          "hover:brightness-110 active:shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.3)]",
        // Underlined segment
        link: "text-foreground underline-offset-4 underline hover:text-foreground/80 normal-case tracking-normal",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3.5 text-xs rounded-md",
        lg: "h-14 px-7 text-base rounded-lg",
        icon: "h-10 w-10 rounded-md",
        "icon-sm": "h-9 w-9 rounded-md",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
