import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  oxFace,
  oxFaceHover,
  destructiveFace,
  focusRing,
  pillFace,
  pressScale,
  quietFace,
  markFace,
} from "./_shared";

/**
 * Margin Button: a plain ruled label, near square.
 *
 * The default is the signature: flat oxblood ink inside a darker rule, with no
 * light and no drop. It is the one coloured object on a page, so a page
 * carries one or two. `secondary` is the ruled toolbar tab; `outline` keeps
 * only the hairline; `ghost` shows its face on hover alone. `lit` is the pale oxblood mark for a gentle call to
 * action. Every press settles the button a little toward the page.
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap",
    "rounded-lg font-medium",
    pressScale,
    focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(oxFace, oxFaceHover),
        primary: cn(oxFace, oxFaceHover),
        lit: markFace,
        solid: cn(oxFace, oxFaceHover),
        secondary: cn(pillFace, "font-normal"),
        outline:
          "bg-transparent text-foreground shadow-(--pill-edge) font-normal hover:bg-accent",
        ghost:
          "bg-transparent font-normal text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive: destructiveFace,
        link: "h-auto rounded-sm px-0 text-(--primary-text) underline decoration-current/30 underline-offset-4 hover:decoration-current",
        quiet: quietFace,
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-9 px-4 text-sm",
        lg: "h-10 px-5 text-base",
        icon: "size-9 px-0",
        "icon-sm": "size-8 px-0",
        "icon-lg": "size-10 px-0",
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
