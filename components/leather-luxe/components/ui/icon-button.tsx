import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Leather Luxe IconButton: a raised charcoal coin; ghost and outline stay flat.

const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-full select-none",
    "transition-[filter,background-color,color,box-shadow] duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:brightness-95 active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background-image:var(--gradient-raised)] text-foreground " +
          "border border-highlight [box-shadow:var(--shadow-raised-sm)] " +
          "hover:brightness-125",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
        outline:
          "bg-transparent text-foreground " +
          "border border-highlight " +
          "hover:bg-accent",
      },
      size: {
        sm: "h-8 w-8 [&>svg]:h-3.5 [&>svg]:w-3.5",
        default: "h-10 w-10 [&>svg]:h-4 [&>svg]:w-4",
        lg: "h-11 w-11 [&>svg]:h-5 [&>svg]:w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
