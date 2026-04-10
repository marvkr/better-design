import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Linear Quality Button — precision-crafted, purple (#5e6ad2) primary
// Precise ring + drop shadow treatment, tight 0.5rem radius

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-md transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98] active:brightness-95",
  ].join(" "),
  {
    variants: {
      variant: {
        // Purple primary — precise multi-layer ring + drop shadow
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[0_0_0_1px_hsl(238_65%_55%/0.5),0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] " +
          "hover:bg-primary/90 hover:shadow-[0_0_0_1px_hsl(238_65%_60%/0.6),0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]",
        // Secondary: very dark panel, border
        secondary:
          "bg-secondary text-secondary-foreground " +
          "border border-border " +
          "shadow-[0_1px_2px_rgba(0,0,0,0.25)] " +
          "hover:bg-accent hover:border-border/60 hover:shadow-[0_1px_4px_rgba(0,0,0,0.35)]",
        // Outline: transparent with full border
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-border/80",
        // Ghost: understated
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_0_0_1px_rgba(239,68,68,0.4),0_1px_3px_rgba(0,0,0,0.3)] " +
          "hover:bg-destructive/90",
        // Link
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg:      "h-10 px-6 text-sm",
        icon:    "h-9 w-9",
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
