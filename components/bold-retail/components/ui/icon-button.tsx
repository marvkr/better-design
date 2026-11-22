import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, primaryFill } from "./_shared";

/**
 * Bold retail IconButton: a circle for a single icon, such as the heart on
 * a product tile or the bag in the header, on the same 2, 2.5 and 3rem
 * heights as Button. The default is the soft grey circle. Primary is the
 * flat black circle, kept for the one action a screen exists to offer, and
 * red is kept for a destructive action. Always pass `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center rounded-full",
    "transition-[background-color,color,border-color,scale] duration-fast ease-out",
    "active:scale-95",
    focusRing,
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-secondary disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:bg-(--secondary-hover)",
        primary: primaryFill,
        ghost: "bg-transparent text-foreground hover:bg-secondary",
        outline:
          "border border-(--line-strong) bg-background text-foreground hover:border-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-(--sale-deep)",
      },
      size: {
        sm: "size-8 [&_svg]:size-4",
        default: "size-10 [&_svg]:size-5",
        lg: "size-12 [&_svg]:size-6",
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
