import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  quietFinish,
  controlFocusRing,
  pressScale,
  primaryFinish,
  primaryFinishHover,
} from "./_shared";

/**
 * Mallow IconButton: a rounded square sized for one icon. Default is the
 * quiet white action, primary the violet fill, outline a hairline and
 * destructive a red fill. Every press scales it a little toward the page.
 * Give it an `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-lg",
    pressScale,
    controlFocusRing,
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: quietFinish,
        primary: cn(primaryFinish, primaryFinishHover),
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        outline: "bg-transparent text-foreground inset-ring-1 inset-ring-input hover:bg-accent",
        destructive: "bg-(image:--danger-face) text-destructive-foreground shadow-xs",
      },
      size: {
        sm: "size-9 [&_svg]:size-4",
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
