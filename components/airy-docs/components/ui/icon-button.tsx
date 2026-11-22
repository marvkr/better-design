import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, primaryFill } from "./_shared";

/**
 * Airy docs IconButton: a round button for one icon, on the same heights as
 * Button. The default is a quiet hairline circle on white, the kind a docs
 * header uses for theme and search. Primary takes the flat green. Always
 * pass `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center rounded-full",
    "transition-[background-color,color,border-color] duration-fast ease-out",
    focusRing,
    "disabled:pointer-events-none disabled:bg-muted disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border border-border bg-background text-(--foreground-secondary) hover:bg-secondary hover:text-foreground disabled:border-transparent",
        primary: `${primaryFill}`,
        ghost: "bg-transparent text-(--foreground-secondary) hover:bg-secondary hover:text-foreground",
        outline:
          "border border-(--line-strong) bg-transparent text-foreground hover:bg-secondary disabled:border-border",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "size-8 [&_svg]:size-3.5",
        default: "size-9 [&_svg]:size-4",
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
