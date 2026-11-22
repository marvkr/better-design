import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { hlPrimaryRaised, hlPrimaryRaisedHover, hlRaisedPanel } from "./_shared";

// Hyperline Button: raised cyan primary over the deep purple backdrop.
// Hero treatment = cyan gradient fill + hairline rim + inset top highlight
// + layered drop shadow with a soft cyan ambient glow.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-lg transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:translate-y-px active:brightness-95",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero: the raised cyan material every filled control mirrors.
        default: cn(hlPrimaryRaised, hlPrimaryRaisedHover),
        // Secondary: raised neutral panel with hairline highlight.
        secondary: cn(hlRaisedPanel, "hover:bg-accent hover:border-border"),
        // Outline: hairline border, flat until hover.
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-border " +
          "hover:shadow-[var(--hl-shadow-sm)]",
        // Ghost: understated, for toolbars and table rows.
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        // Destructive: raised red with the same layered recipe.
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_0_0_0.0625rem_oklch(0.48_0.18_22/0.9),inset_0_0.0625rem_0_oklch(1_0_0/0.25),0_0.0625rem_0.125rem_oklch(0_0_0/0.35),0_0.25rem_0.875rem_-0.25rem_oklch(0.6_0.21_22/0.5)] " +
          "hover:brightness-110",
        // Link
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg: "h-10 px-6 text-sm",
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
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
