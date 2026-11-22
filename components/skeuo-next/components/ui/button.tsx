import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Skeuo Next Button — Skeuomorphism 2.0 bendy plastic surface.
// Glossy top highlight + dark inset lip + soft ground shadow. Hover lifts;
// press squishes (translate down + vertical compress) for reactive plasticity.
// Primary: graphite plastic with vertical gloss gradient.
// Secondary: white glass pebble with hairline ring.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold tracking-[-0.012em]",
    "rounded-full transition-all duration-base ease-out",
    "origin-bottom will-change-transform",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-[0.125rem] active:scale-y-[0.97] active:duration-fast",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — graphite plastic w/ glossy top + dark inset lip
        default: [
          "text-primary-foreground",
          "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary)_78%,oklch(1_0_none))_0%,var(--primary)_48%,color-mix(in_oklch,var(--primary)_88%,oklch(0_0_none))_100%)]",
          "shadow-[var(--shadow-pillow-primary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-primary-hover)]",
        ].join(" "),
        // Secondary — white glass pebble w/ hairline ring
        secondary: [
          "text-foreground",
          "bg-[linear-gradient(180deg,oklch(1_0_0)_0%,oklch(0.985_0.004_240)_100%)]",
          "shadow-[var(--shadow-pillow-secondary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-secondary-hover)]",
        ].join(" "),
        // Outline — minimal hairline
        outline:
          "border border-border bg-background text-foreground hover:bg-muted hover:border-foreground/20",
        // Ghost — flat
        ghost: "bg-transparent text-foreground hover:bg-muted",
        // Destructive — vivid red plastic w/ tinted glow
        destructive: [
          "text-destructive-foreground",
          "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--destructive)_85%,oklch(1_0_none))_0%,var(--destructive)_55%,color-mix(in_oklch,var(--destructive)_82%,oklch(0_0_none))_100%)]",
          "shadow-[var(--shadow-pillow-destructive)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-destructive-hover)]",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
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
