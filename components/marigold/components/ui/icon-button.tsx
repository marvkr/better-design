import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { tbPrimaryRaised, tbPrimaryRaisedHover, tbRaisedPanel } from "./_shared";

// Talentboard IconButton: square control sharing the Button materials.

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg",
    "transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:translate-y-px active:brightness-95",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(tbPrimaryRaised, tbPrimaryRaisedHover),
        secondary: cn(tbRaisedPanel, "hover:bg-accent hover:border-border"),
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:shadow-[var(--tb-shadow-sm)]",
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.22),0_0.0625rem_0.125rem_oklch(0.5_0.16_27/0.3),0_0.25rem_0.75rem_-0.1875rem_oklch(0.6_0.2_27/0.4)] " +
          "hover:brightness-[1.04]",
      },
      size: {
        sm: "h-8 w-8 rounded-md",
        default: "h-9 w-9",
        lg: "h-10 w-10",
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
