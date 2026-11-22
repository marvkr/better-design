import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Ops Sharp Button — the precise graphite control of a developer ops surface.
 *
 * The hero (`default`) is the solid near-black tile: graphite fill, a hairline
 * top highlight, a tight contact drop, and a 1px rim (--shadow-primary). It is
 * the same material the active sidebar tile + filled controls wear. Secondary
 * is a crisp white panel button with a hairline border; outline/ghost stay
 * understated for a dense toolbar.
 */

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-md transition-[background-color,box-shadow,border-color,transform] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero — solid graphite tile.
        default:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)] " +
          "hover:bg-primary/90",
        // Same material under an explicit name for showcases that ask for it.
        primary:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)] " +
          "hover:bg-primary/90",
        // Secondary — crisp white panel button.
        secondary:
          "bg-card text-secondary-foreground border border-border [box-shadow:var(--shadow-s)] " +
          "hover:bg-secondary hover:border-ring/30",
        // Outline — transparent with a full hairline border.
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-ring/30",
        // Ghost — no chrome, understated toolbar action.
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        // Destructive.
        destructive:
          "bg-destructive text-destructive-foreground [box-shadow:var(--shadow-s)] " +
          "hover:bg-destructive/90",
        // Link.
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4",
        lg: "h-10 px-6 text-sm",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
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
