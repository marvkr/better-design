import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Gauge Dark IconButton: square key from the same control bank as Button.
// Default (hero) is the machined gold material; secondary the raised plate.

const iconButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center outline-none transition-all duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--gauge-rim)] text-primary-foreground bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] shadow-[var(--shadow-primary)] hover:brightness-[1.06] active:brightness-[0.96] active:shadow-[inset_0_0.0625rem_0.1875rem_oklch(0_0_0/0.35),0_0.0625rem_0_oklch(1_0_0/0.06)]",
        secondary:
          "border border-border bg-secondary text-secondary-foreground shadow-[var(--shadow-raised)] hover:bg-accent hover:text-accent-foreground active:shadow-[var(--shadow-well)] active:bg-muted",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive:
          "border border-[oklch(0.45_0.16_25)] bg-destructive text-destructive-foreground shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.2),0_0.0625rem_0.125rem_oklch(0_0_0/0.5)] hover:brightness-110 active:brightness-95",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:shadow-[var(--shadow-raised)] active:shadow-[var(--shadow-well)]",
      },
      size: {
        xs: "h-7 w-7 rounded-md text-xs",
        sm: "h-8 w-8 rounded-md text-sm",
        default: "h-9 w-9 rounded-lg text-sm",
        lg: "h-10 w-10 rounded-lg text-base",
        xl: "h-11 w-11 rounded-xl text-base",
      },
      corners: {
        square: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
      corners: "square",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, corners, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, corners, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
