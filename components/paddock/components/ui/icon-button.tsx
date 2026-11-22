import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { primaryFace, primaryFaceHover, focusRing, pressScale, quietChip, raisedSurface } from "./_shared";

/**
 * Paddock IconButton: a small rounded square sized for one icon, like a
 * row's more and add buttons. The default is a raised white tile with a
 * 1px border; `primary` is the solid teal face, `ghost` a bare muted icon that gains a grey
 * fill on hover, and `outline` a bordered tile. Give it an `aria-label`.
 */
const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-md",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: raisedSurface,
        primary: cn(primaryFace, primaryFaceHover),
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        secondary: quietChip,
        outline: "border border-input bg-transparent text-foreground hover:bg-accent",
        destructive: "bg-destructive text-destructive-foreground shadow-(--card-ring) hover:bg-destructive/90",
      },
      size: {
        sm: "size-8 [&_svg]:size-4",
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

/** Props for IconButton; the label is required because the button shows only an icon. */
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
