import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Playdesk IconButton — the Button's material at a single-glyph footprint.
 * Circular at every size, because the desk has no square controls.
 */

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 rounded-full",
    "transition-[box-shadow,background-color,transform] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "text-primary-foreground",
          "[background-image:var(--fill-primary)]",
          "[box-shadow:var(--shadow-primary)]",
          "hover:[background-image:var(--fill-primary-hover)]",
          "hover:[box-shadow:var(--shadow-primary-hover)]",
        ].join(" "),
        secondary: [
          "text-secondary-foreground",
          "[background-image:var(--fill-secondary)]",
          "[box-shadow:var(--shadow-button)]",
          "hover:[background-image:var(--fill-secondary-hover)]",
          "hover:[box-shadow:var(--shadow-button-hover)]",
        ].join(" "),
        outline:
          "bg-card text-foreground border border-border [box-shadow:var(--shadow-xs)] hover:bg-muted",
        ghost: "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground",
      },
      size: {
        default: "size-10 [&_svg]:size-4",
        sm: "size-8 [&_svg]:size-3.5",
        lg: "size-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

export interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={asChild ? undefined : "button"}
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
