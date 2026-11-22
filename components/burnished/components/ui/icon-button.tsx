import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  copperRim,
  creamBevelHover,
  focusRing,
  pressScale,
  quietBevel,
  raisedBevel,
} from "./_shared";

/**
 * Burnished IconButton: a round bevel sized for one icon. It wears the same
 * finishes as Button: graphite by default, cream inside a copper rim for
 * primary, the quiet face for outline, and the red bevel for destructive.
 * Every press scales it a little toward the page. Give it an `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-full",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: raisedBevel,
        primary: cn(copperRim, "text-primary-foreground shadow-(--bevel-primary)", creamBevelHover),
        ghost:
          "bg-transparent text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
        outline: quietBevel,
        destructive:
          "bg-(image:--fill-destructive) text-destructive-foreground shadow-(--bevel-primary)",
      },
      size: {
        sm: "size-8 [&_svg]:size-3.5",
        default: "size-10 [&_svg]:size-4",
        lg: "size-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
