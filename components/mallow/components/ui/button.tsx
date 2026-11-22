import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { quietFinish, controlFocusRing, pressScale, primaryFinish, primaryFinishHover } from "./_shared";

/**
 * Mallow Button: a rounded rectangle with a 0.625rem corner, 3rem tall by default.
 *
 * The default is solid violet with white text, a faint shade along its bottom
 * edge and a small soft drop. Secondary is the quiet white action: a white
 * face, a hairline and a small drop. Focus draws a card-coloured gap and a
 * violet ring around the button.
 */
const buttonVariants = cva(
  [
    "relative inline-flex max-w-full shrink-0 select-none items-center justify-center whitespace-nowrap",
    "rounded-lg font-semibold",
    pressScale,
    controlFocusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: `${primaryFinish} ${primaryFinishHover}`,
        primary: `${primaryFinish} ${primaryFinishHover}`,
        lit: `${primaryFinish} ${primaryFinishHover}`,
        solid: `${primaryFinish} ${primaryFinishHover}`,
        secondary: quietFinish,
        outline: "bg-transparent text-foreground inset-ring-1 inset-ring-input hover:bg-accent",
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive: "bg-(image:--danger-face) text-destructive-foreground shadow-xs",
        link: "h-auto rounded-sm px-0 text-(--primary-text) underline decoration-current/30 underline-offset-4 hover:decoration-current",
      },
      size: {
        sm: "h-9 gap-2 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        default: "h-12 gap-2.5 px-5 text-base [&_svg:not([class*='size-'])]:size-5",
        lg: "h-14 gap-2.5 px-6 text-lg [&_svg:not([class*='size-'])]:size-5",
        icon: "size-12 px-0 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-9 px-0 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-14 px-0 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={asChild ? undefined : "button"}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
