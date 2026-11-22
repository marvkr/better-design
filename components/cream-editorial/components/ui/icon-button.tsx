import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, primaryFill } from "./_shared";

/**
 * Cream editorial IconButton: a square block for a single icon with the
 * same 0.5rem corner as Button, on 2, 2.25 and 2.75rem sizes. The default
 * is a quiet oat block. Primary is the flat terracotta, so keep it for the
 * one action a screen exists to offer. Hover only deepens the colour.
 * Always pass `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center rounded-md",
    "transition-[background-color,color,border-color] duration-fast ease-out",
    focusRing,
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-muted disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-muted",
        primary: primaryFill,
        ghost:
          "bg-transparent text-(--foreground-secondary) hover:bg-secondary hover:text-foreground disabled:bg-transparent",
        outline:
          "border border-(--line-strong) bg-background text-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "size-8 [&_svg]:size-4",
        default: "size-9 [&_svg]:size-[1.125rem]",
        lg: "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      data-slot="icon-button"
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
