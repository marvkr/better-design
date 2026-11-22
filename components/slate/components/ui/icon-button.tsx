import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Ops Sharp IconButton — the square icon control of the dense ops toolbar.
 *
 * Mirrors the Button's material vocabulary: the hero is the solid graphite tile
 * (--shadow-primary), secondary is a crisp white panel chip, ghost stays bare
 * for a toolbar. Sharp rounded-md corners, never a soft pill.
 */

const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0",
    "rounded-md transition-[background-color,box-shadow,border-color,transform] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)] hover:bg-primary/90",
        secondary:
          "bg-card text-secondary-foreground border border-border [box-shadow:var(--shadow-s)] hover:bg-secondary hover:border-ring/30",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground [box-shadow:var(--shadow-s)] hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-ring/30",
      },
      size: {
        xs: "h-7 w-7 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-9 w-9 text-sm",
        lg: "h-10 w-10 text-base",
        xl: "h-11 w-11 text-base",
      },
      corners: {
        square: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
      corners: "square",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, corners, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, corners, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
