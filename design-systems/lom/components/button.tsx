import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Library of Minds Button — white primary, ultra-flat, no shadow, generous 1rem radius
// Editorial/cultural aesthetic, content-first

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-2xl transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // White primary — no shadow, ultra-flat editorial
        default:
          "bg-primary text-primary-foreground " +
          "hover:bg-primary/90",
        // Secondary: subtle dark panel, border
        secondary:
          "bg-secondary text-secondary-foreground " +
          "border border-border " +
          "hover:bg-accent",
        // Outline
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-border/80",
        // Ghost
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90",
        // Link
        link: "text-primary underline-offset-4 hover:underline rounded-none",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-xl",
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
