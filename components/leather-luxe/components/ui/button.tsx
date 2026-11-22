import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Leather Luxe Button. The default variant is the hero: a cognac leather
// pill with a glass sheen along the top edge, a stitched dashed seam just
// inside the rim, and a deep warm drop shadow. Secondary actions are raised
// charcoal pills with a hairline highlight, like the wallet's utility chips.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full text-sm font-medium select-none",
    "transition-[filter,transform,box-shadow,background-color,border-color] duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background-image:var(--gradient-leather)] text-primary-foreground " +
          "border border-[oklch(0.68_0.115_58/0.55)] " +
          "[box-shadow:var(--shadow-leather)] " +
          "after:pointer-events-none after:absolute after:inset-1 after:rounded-full " +
          "after:border after:border-dashed after:border-[oklch(0.98_0.02_80/0.28)] " +
          "hover:brightness-110 active:brightness-95 active:translate-y-px " +
          "active:[box-shadow:var(--shadow-leather-sm)]",
        secondary:
          "[background-image:var(--gradient-raised)] text-secondary-foreground " +
          "border border-highlight " +
          "[box-shadow:var(--shadow-raised)] " +
          "hover:brightness-125 active:brightness-95 active:translate-y-px " +
          "active:[box-shadow:var(--shadow-raised-sm)]",
        destructive:
          "[background-image:linear-gradient(180deg,oklch(0.58_0.17_30),oklch(0.46_0.15_26))] " +
          "text-destructive-foreground border border-[oklch(0.62_0.16_30/0.5)] " +
          "[box-shadow:var(--shadow-leather-sm)] " +
          "hover:brightness-110 active:brightness-95 active:translate-y-px",
        outline:
          "bg-transparent text-foreground border border-highlight " +
          "hover:bg-accent hover:[box-shadow:var(--shadow-raised-sm)] " +
          "active:bg-accent/70",
        ghost:
          "bg-transparent text-muted-foreground border border-transparent " +
          "hover:bg-accent hover:text-foreground active:bg-accent/70",
        link:
          "bg-transparent text-primary underline-offset-4 hover:underline " +
          "h-auto px-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 px-0",
        "icon-sm": "h-8 w-8 px-0",
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
