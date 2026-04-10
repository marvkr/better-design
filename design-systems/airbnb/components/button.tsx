import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Airbnb Button — warm/coral primary (#D33753), light theme, round-md
// Real airbnb.com treatment: gradient coral CTA with outer shadow for depth
// Secondary: white/light bg with border shadow for elevation

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-lg transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Coral gradient — horizontal gradient with animated bg-position on hover (from airbnb-shadcn reference)
        default:
          "bg-gradient-to-r from-[#D33753] via-[#D13660] to-[#C72D65] text-primary-foreground " +
          "bg-[size:_150%] hover:bg-[position:_100%_100%] " +
          "focus-visible:border-[#D3D3D3] focus-visible:border-2",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_1px_3px_rgba(0,0,0,0.15)] " +
          "hover:bg-destructive/90",
        // Outline: border with subtle shadow for elevation on light bg
        outline:
          "border border-secondary bg-background text-foreground " +
          "shadow-[0_1px_2px_rgba(0,0,0,0.06)] " +
          "hover:bg-accent hover:shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
        // Secondary: light surface with shadow
        secondary:
          "border border-secondary bg-secondary/90 text-secondary-foreground " +
          "shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] " +
          "hover:bg-secondary hover:shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
        // Ghost
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link
        link: "text-foreground/90 underline-offset-4 underline hover:text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm:      "h-9 px-3 rounded-md",
        lg:      "h-12 px-8 text-base rounded-xl",
        icon:    "h-10 w-10",
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
