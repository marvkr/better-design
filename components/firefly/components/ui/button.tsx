import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { glowDestructive, glowPrimary } from "./_shared";

/**
 * Firefly Button: the one glowing action.
 *
 * Every button is a full pill. The default is lit from within: a yellow-green
 * gradient under white highlights, an inner top line and a soft bloom, with a
 * brighter layer that fades in under the pointer. The rest stay quiet so the
 * lit pill is the only thing on the screen that glows: near-black ink, warm
 * paper, a strong outline, and a ghost.
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-medium",
    "transition-[background-color,color,border-color,scale] duration-fast ease-out",
    "active:scale-98",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:bg-secondary disabled:bg-none disabled:text-(--foreground-disabled) disabled:shadow-none disabled:before:hidden",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // The lit pill: the one action a screen exists to offer.
        default: glowPrimary,
        primary: glowPrimary,
        // Near-black ink for a strong action that should not glow.
        solid:
          "bg-(--ink) text-(--ink-foreground) hover:bg-(--ink-hover)",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-(--surface-3)",
        outline:
          "border border-(--line-strong) bg-transparent text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-secondary",
        destructive: glowDestructive,
        link: "h-auto rounded-sm px-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10 px-0",
        "icon-sm": "size-8 px-0",
        "icon-lg": "size-12 px-0",
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
