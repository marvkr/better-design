import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { oxFace, oxFaceHover, destructiveFace, focusRing, pillFace, pressScale, quietFace } from "./_shared";

/**
 * Margin IconButton: a small square toolbar tab sized for one icon. The
 * default is the paper tab with a hairline ring, `primary` the oxblood face,
 * `secondary` the paper field face, `ghost` shows a grey face on hover alone,
 * and `outline` keeps only the hairline. Give it an `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-lg",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(pillFace, "aria-expanded:bg-(--field)"),
        primary: cn(oxFace, oxFaceHover),
        secondary: quietFace,
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive: destructiveFace,
        outline: "bg-transparent text-foreground shadow-(--pill-edge) hover:bg-accent",
      },
      size: {
        sm: "size-8 [&_svg]:size-3.5",
        default: "size-9 [&_svg]:size-4",
        lg: "size-10 [&_svg]:size-4.5",
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
