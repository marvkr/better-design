import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Clay Product Button, light claymorphic. The signature treatment lives on the
// `default` variant: a vivid blue clay pillow built from a vertical oklch gradient
// + the --shadow-clay-primary recipe (inset top highlight + warm-blue inset bottom
// contact + soft ambient outer drop). It reads as a soft, sculpted blob of clay.
// Filled controls (checkbox/switch/radio/slider) reuse this exact material, scaled.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold",
    "rounded-[var(--radius-lg)] transition-all duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:scale-[0.985]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default = HERO clay-blue pillow. Gradient fill + the primary clay recipe.
        default:
          "text-primary-foreground " +
          "bg-[linear-gradient(180deg,oklch(0.66_0.18_254),var(--primary)_55%,oklch(0.52_0.19_258))] " +
          "[box-shadow:var(--shadow-clay-primary)] " +
          "hover:brightness-[1.04] " +
          "hover:[box-shadow:inset_0_0.09375rem_0.03125rem_0_oklch(0.86_0.1_250_/_0.9),inset_0_-0.125rem_0.15625rem_0_oklch(0.36_0.14_258_/_0.55),0_0.1875rem_0.375rem_-0.0625rem_oklch(0.4_0.14_258_/_0.36),0_0.75rem_1.375rem_-0.375rem_oklch(0.45_0.16_256_/_0.44)] " +
          "active:[box-shadow:var(--shadow-clay-primary-sm)]",
        // Primary alias, same hero clay material.
        primary:
          "text-primary-foreground " +
          "bg-[linear-gradient(180deg,oklch(0.66_0.18_254),var(--primary)_55%,oklch(0.52_0.19_258))] " +
          "[box-shadow:var(--shadow-clay-primary)] " +
          "hover:brightness-[1.04] " +
          "active:[box-shadow:var(--shadow-clay-primary-sm)]",
        // Secondary, neutral clay pillow (warm putty), same paired-shadow language.
        secondary:
          "text-secondary-foreground " +
          "bg-[linear-gradient(180deg,oklch(0.985_0.008_94),var(--secondary))] " +
          "[box-shadow:var(--shadow-clay)] " +
          "hover:brightness-[1.02] " +
          "active:[box-shadow:var(--shadow-clay-sm)]",
        // Outline, flat clay chip with a border, gentle recessed hover.
        outline:
          "border border-border bg-card text-foreground " +
          "[box-shadow:var(--shadow-clay-sm)] " +
          "hover:bg-accent hover:text-accent-foreground",
        // Ghost, no clay, understated.
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        // Destructive, clay pillow tinted red.
        destructive:
          "text-destructive-foreground " +
          "bg-[linear-gradient(180deg,oklch(0.68_0.19_26),var(--destructive),oklch(0.55_0.2_27))] " +
          "[box-shadow:inset_0_0.09375rem_0.03125rem_0_oklch(0.82_0.1_30_/_0.8),inset_0_-0.125rem_0.15625rem_0_oklch(0.42_0.16_28_/_0.5),0_0.125rem_0.25rem_-0.0625rem_oklch(0.45_0.16_28_/_0.32),0_0.5rem_1rem_-0.3125rem_oklch(0.5_0.18_27_/_0.4)] " +
          "hover:brightness-[1.04]",
        // Link
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-9 px-4 text-xs rounded-[var(--radius-md)]",
        default: "h-11 px-6",
        lg:      "h-12 px-8 text-base",
        icon:    "h-11 w-11",
        "icon-sm": "h-9 w-9 rounded-[var(--radius-md)]",
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
