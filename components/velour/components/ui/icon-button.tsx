import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* Default is a raised velour disc, the secondary button material scaled down. */

const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-md select-none cursor-pointer",
    "transition-[background-image,box-shadow,color,transform] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:translate-y-px active:[box-shadow:var(--shadow-s)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "text-secondary-foreground [background-image:var(--velour-raised)] " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:[background-image:var(--velour-hover)] hover:[box-shadow:var(--shadow-button-hover)]",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/30",
      },
      size: {
        sm: "h-8 w-8 [&>svg]:h-3.5 [&>svg]:w-3.5",
        default: "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4",
        lg: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
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
