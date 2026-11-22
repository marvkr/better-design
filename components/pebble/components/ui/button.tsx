import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Concept-001 Pebble Button
// Pebble-soft 3D button: deep inset shadow lip + glossy top highlight +
// strong neutral ground shadow. Hover lifts. Mirrors Concept 1's black pill chip.
// Primary: pure black #0A0A0B with subtle vertical gradient
// Secondary: white pebble with hairline ring + soft ground shadow
// Radius: 999px (full pill) default — matches Concept 1's date chip silhouette

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold tracking-[-0.012em]",
    "rounded-full transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — black pebble pill w/ glossy top + deep inset lip
        default: [
          "text-primary-foreground",
          "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary)_70%,oklch(1_0_none))_0%,var(--primary)_45%,oklch(0_0_0)_100%)]",
          "shadow-[var(--shadow-pillow-primary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-primary-hover)]",
        ].join(" "),
        // Secondary — white pebble w/ hairline ring
        secondary: [
          "text-foreground",
          "bg-[linear-gradient(180deg,oklch(1_0_0)_0%,oklch(0.9815_0.0045_314.8051)_100%)]",
          "shadow-[var(--shadow-pillow-secondary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-secondary-hover)]",
        ].join(" "),
        // Outline — minimal hairline
        outline:
          "border border-border bg-background text-foreground hover:bg-muted hover:border-foreground/20",
        // Ghost — flat
        ghost: "bg-transparent text-foreground hover:bg-muted",
        // Destructive — vivid red glow (mirrors Concept 1 selected dot)
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
