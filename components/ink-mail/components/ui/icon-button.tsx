import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, primaryFill } from "./_shared";

/**
 * Ink mail IconButton: a square button for a single icon, on the same 2, 2.5
 * and 3rem heights and the same 1rem corner as Button. The default is the
 * quiet secondary step behind a hairline. Primary is the flat off-white fill,
 * so keep it for the one action a screen exists to offer. Always pass
 * `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center rounded-xl",
    "transition-[background-color,color,border-color] duration-fast ease-out",
    focusRing,
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-muted disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border border-(--line-strong) bg-secondary text-secondary-foreground hover:bg-muted",
        primary: primaryFill,
        ghost:
          "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground disabled:bg-transparent",
        outline:
          "border border-(--line-strong) bg-background text-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
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
