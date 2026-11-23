import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Button, measured on airbnb.com (13 November 2026)
// Default: brand gradient, linear at rest and radial on hover, weight 500
// Secondary: grey fill with a dark label
// Outline: white with a 1px dark line
// Inverse: dark fill, the site's banner and confirm button
// Ghost: clear until hover, a pill like the header links
// Radius: 12px at 48px height and above, 8px below, and a pill size for the booking button
// No shadow on any button

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-base font-medium",
    "rounded-lg transition-[background-color,border-color,color,scale] duration-fast ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.96]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary bg-(image:--primary-gradient) text-primary-foreground " +
          "hover:bg-(image:--primary-gradient-hover)",
        secondary:
          "bg-secondary text-secondary-foreground " +
          "hover:bg-secondary-hover",
        outline:
          "border border-foreground bg-background text-foreground " +
          "hover:bg-muted",
        inverse:
          "bg-foreground text-background " +
          "hover:bg-inverse-hover",
        ghost:
          "rounded-full bg-transparent text-foreground " +
          "hover:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90",
        link: "text-foreground underline underline-offset-2 hover:text-foreground/80",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-8 px-3 text-xs rounded-sm",
        md: "h-10 px-4 text-sm rounded-sm",
        pill: "h-12 px-6 rounded-full",
        lg: "h-14 px-8",
        icon: "h-10 w-10 rounded-full text-sm",
        "icon-sm": "h-8 w-8 rounded-full text-xs",
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
