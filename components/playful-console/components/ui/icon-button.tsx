import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { pressDestructive, pressOutline, pressPrimary } from "./_shared";

/**
 * Playful console IconButton: a square key for a single icon, on the same 2,
 * 2.5 and 3rem heights as Button. The default is a white key on a cream
 * slab; primary is the orange key, kept for the one action a screen offers.
 * Ghost stays flat for toolbars. Always pass `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center rounded-[0.5rem]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:translate-y-0 disabled:border-(--line-strong) disabled:bg-secondary disabled:text-(--foreground-disabled) disabled:shadow-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: pressOutline,
        primary: pressPrimary,
        ghost:
          "bg-transparent text-foreground transition-colors duration-fast hover:bg-secondary disabled:bg-transparent",
        outline: pressOutline,
        destructive: pressDestructive,
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

/** Props for IconButton: a button whose only content is an icon, so it needs a label. */
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
