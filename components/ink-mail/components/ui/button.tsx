import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, glassFill, primaryFill } from "./_shared";

/**
 * Ink mail Button: a 1rem-corner block in Inter semibold.
 *
 * The primary is flat off-white with black ink, the one solid bright surface
 * on the black page. The glass variant is the translucent call to action that
 * pairs with it: a faint white gradient behind a translucent edge. Secondary
 * and outline step down through surface luminance and hairlines. Nothing
 * casts a shadow.
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl font-semibold",
    "transition-[background-color,background-image,color,border-color] duration-fast ease-out",
    focusRing,
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-muted disabled:bg-none disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: primaryFill,
        primary: primaryFill,
        glass: glassFill,
        secondary:
          "border border-(--line-strong) bg-secondary text-secondary-foreground hover:bg-muted",
        outline:
          "border border-(--line-strong) bg-background text-foreground hover:bg-secondary",
        ghost: "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "h-auto rounded-sm px-0 font-medium text-(--link) underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
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
