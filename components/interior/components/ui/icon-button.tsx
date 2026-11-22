import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Interior IconButton — the Button's materials at a single-glyph footprint.
 * An icon button lives inside a panel, so it sits one step down the radius
 * scale at 7px. Same press, same focus shapes: outside inverted line on ink,
 * inset accent on the quiet variants.
 */

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 rounded-[0.4375rem]",
    "transition-[background-color,border-color,box-shadow,color,transform] duration-fast",
    "focus-visible:outline-none",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[var(--shadow-thumb)]",
          "hover:bg-primary/90",
          "focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
        ].join(" "),
        secondary: [
          "bg-card text-foreground",
          "shadow-[var(--shadow-cap)]",
          "hover:bg-secondary",
          "focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring),var(--shadow-focus-lift)]",
        ].join(" "),
        outline: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-secondary hover:border-foreground/30",
          "focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus-lift)]",
        ].join(" "),
        ghost: [
          "text-muted-foreground",
          "hover:bg-secondary hover:text-foreground",
          "focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
        ].join(" "),
      },
      size: {
        default: "size-10 [&_svg]:size-4",
        sm: "size-8 rounded-[0.375rem] [&_svg]:size-3.5",
        lg: "size-12 rounded-[0.5rem] [&_svg]:size-5",
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
