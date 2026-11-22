import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { focusRing, primaryFill } from "./_shared";

/**
 * Bold retail Button: the black pill.
 *
 * Every button is a full pill with medium Inter at 1rem. The primary is flat
 * black with white text, the action a store page exists to offer: Add to bag,
 * Buy, Notify me. The secondary is the soft grey pill beside it, and the
 * on-image pill is white for photography. A press shrinks the pill a little;
 * nothing shines and nothing casts a shadow.
 */
const buttonVariants = cva(
  [
    "inline-flex max-w-full shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-medium",
    "transition-[background-color,color,border-color,scale] duration-fast ease-out",
    "active:scale-97",
    focusRing,
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-secondary disabled:text-(--foreground-disabled)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: primaryFill,
        primary: primaryFill,
        // The same black, named for callers that ask for a solid ink pill.
        solid: primaryFill,
        secondary: "bg-secondary text-secondary-foreground hover:bg-(--secondary-hover)",
        outline:
          "border border-(--line-strong) bg-background text-foreground hover:border-foreground",
        // The white pill that sits on product photography.
        inverse: "bg-background text-foreground hover:bg-secondary",
        ghost: "bg-transparent text-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-(--sale-deep)",
        link: "h-auto rounded-sm px-0 text-foreground underline underline-offset-4 hover:text-(--foreground-secondary)",
      },
      size: {
        sm: "h-8 px-3.5 text-sm",
        default: "h-10 px-5 text-base",
        lg: "h-12 px-8 text-base",
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
