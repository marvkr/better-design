import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { glowDestructive, glowPrimary } from "./_shared";

/** A disabled lit button drops its light and rests on warm paper. */
const litDisabled =
  "disabled:bg-secondary disabled:bg-none disabled:shadow-none disabled:before:hidden";

/**
 * Firefly IconButton: a round button for a single icon, on the same 2, 2.5
 * and 3rem heights as Button. The default is quiet warm paper. Primary
 * wears the lit yellow-green material, so keep it for the one action a
 * screen exists to offer. Always pass `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center rounded-full",
    "transition-[background-color,color,border-color,scale] duration-fast ease-out",
    "active:scale-95",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:bg-(--surface-3) disabled:bg-secondary",
        primary: `${glowPrimary} ${litDisabled}`,
        ghost: "bg-transparent text-foreground hover:bg-secondary",
        outline:
          "border border-(--line-strong) bg-transparent text-foreground hover:bg-muted disabled:border-border",
        destructive: `${glowDestructive} ${litDisabled}`,
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
