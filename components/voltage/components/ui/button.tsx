import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Electric Fintech Button — acid-yellow "electric chip" on deep near-black navy.
// Hero (default) is the bright electric-yellow primary: solid fill, a tight yellow
// rim, a soft yellow-tinted lift, and a top inset sheen so it reads as a lit chip.
// Label is near-black (--primary-foreground) so it stays AA-legible on yellow.
// The chip material (--shadow-chip / --shadow-chip-hover) is reused by the filled
// controls (checkbox / switch / radio / slider) so the DS reads as one material.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold tracking-tight",
    "rounded-md transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98] active:brightness-95",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero — electric-yellow chip.
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-chip)] " +
          "hover:bg-primary/95 hover:[box-shadow:var(--shadow-chip-hover)]",
        // Explicit primary mirrors the hero exactly.
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-chip)] " +
          "hover:bg-primary/95 hover:[box-shadow:var(--shadow-chip-hover)]",
        // Secondary: quiet raised cool panel with border.
        secondary:
          "bg-secondary text-secondary-foreground " +
          "border border-border " +
          "[box-shadow:var(--shadow-xs)] " +
          "hover:bg-accent hover:border-border/70",
        // Outline: transparent with full border.
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-border/80",
        // Ghost: no background, understated.
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        // Destructive.
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:0_0_0_0.0625rem_color-mix(in_oklch,var(--destructive)_55%,transparent),0_0.0625rem_0.1875rem_0_oklch(0_0_0/0.4)] " +
          "hover:bg-destructive/90",
        // Link.
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg:      "h-11 px-6 text-sm",
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
