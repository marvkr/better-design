import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Gauge Dark Button.
// Hero (default): machined gold control. Vertical gold gradient, darker gold
// rim, bright top bevel + dark base bevel (--shadow-primary), warm glow.
// Secondary: raised charcoal plate one level above the panel (--shadow-raised).
// Pressing collapses the bevel into a well: depth is the interaction language.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium select-none",
    "rounded-lg transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Machined gold: the DS's signature material.
        default:
          "border border-[var(--gauge-rim)] text-primary-foreground " +
          "bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] " +
          "shadow-[var(--shadow-primary)] " +
          "hover:brightness-[1.06] " +
          "active:brightness-[0.96] active:shadow-[inset_0_0.0625rem_0.1875rem_oklch(0_0_0/0.35),0_0.0625rem_0_oklch(1_0_0/0.06)]",
        // Raised charcoal plate.
        secondary:
          "border border-border bg-secondary text-secondary-foreground " +
          "shadow-[var(--shadow-raised)] " +
          "hover:bg-accent hover:text-accent-foreground " +
          "active:shadow-[var(--shadow-well)] active:bg-muted",
        // Hairline only: sits flush with the panel.
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:shadow-[var(--shadow-raised)] " +
          "active:shadow-[var(--shadow-well)]",
        // No surface at all.
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        // Alarm control: same machined treatment in the destructive hue.
        destructive:
          "border border-[oklch(0.45_0.16_25)] bg-destructive text-destructive-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.2),0_0.0625rem_0.125rem_oklch(0_0_0/0.5),0_0.1875rem_0.625rem_-0.125rem_oklch(0.55_0.19_25/0.3)] " +
          "hover:brightness-110 active:brightness-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
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
