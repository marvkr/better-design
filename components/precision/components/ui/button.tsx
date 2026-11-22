import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Precision Button - clean light CRM. The hero lives on `default`: a solid
// desaturated indigo-blue fill with a precise raised material (1px outer ring,
// whisper drop shadow, faint inset top highlight). Filled controls
// (checkbox / switch / radio / slider) reuse this exact material, scaled down.
// Neutral/outline/ghost variants stay crisp and border-first.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-md transition-[background-color,box-shadow,border-color] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary (hero) - solid blue, raised control material.
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[0_0_0_0.0625rem_oklch(0.5_0.18_268),0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.12),inset_0_0.0625rem_0_oklch(1_0_0/0.16)] " +
          "hover:bg-primary/92 " +
          "hover:shadow-[0_0_0_0.0625rem_oklch(0.5_0.18_268),0_0.125rem_0.25rem_oklch(0.21_0.006_271/0.16),inset_0_0.0625rem_0_oklch(1_0_0/0.18)]",
        // Neutral / white surface - crisp hairline + soft drop.
        secondary:
          "bg-background text-secondary-foreground border border-border " +
          "shadow-[0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.06)] " +
          "hover:bg-accent hover:border-border",
        // Outline: transparent, full hairline border.
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-accent hover:border-ring/40",
        // Ghost: no background, understated.
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
        // Destructive.
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_0_0_0.0625rem_oklch(0.5_0.2_24),0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.12),inset_0_0.0625rem_0_oklch(1_0_0/0.14)] " +
          "hover:bg-destructive/92",
        // Link.
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
