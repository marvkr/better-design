import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Stripe Button — light, indigo primary (#635BFF), 6px radius
// Primary: solid indigo with lift shadow on hover + translateY(-1px)
// Secondary: transparent outline, indigo border
// Shadow: Stripe's characteristic rgba(50,50,93,...) navy-purple shadow

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium tracking-[-0.01em]",
    "rounded-md transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[0_4px_6px_rgba(50,50,93,0.11),0_1px_3px_rgba(0,0,0,0.08)] " +
          "hover:bg-primary/90 hover:-translate-y-px hover:shadow-[0_7px_14px_rgba(50,50,93,0.1),0_3px_6px_rgba(0,0,0,0.08)]",
        secondary:
          "bg-transparent text-primary " +
          "border border-primary/60 " +
          "hover:bg-primary/5 hover:border-primary",
        outline:
          "border border-border bg-transparent text-foreground " +
          "shadow-[0_1px_2px_rgba(50,50,93,0.06)] " +
          "hover:bg-muted hover:border-border/80",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_4px_6px_rgba(223,27,65,0.15)] " +
          "hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded",
        default: "h-10 px-5",
        lg:      "h-11 px-6",
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
