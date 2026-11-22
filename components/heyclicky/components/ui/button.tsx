import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Heyclicky Button — the glossy download pill.
 *
 * Full-round, borderless, filled with a vertical gradient and lit by a white
 * gloss line along the top edge. Depth comes from one wide soft throw, so the
 * pill floats over the dotted desktop rather than sitting on a rule. Hover
 * lifts it a pixel; press puts it back down.
 */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-medium leading-none tracking-[-0.01em]",
    "transition-[background,box-shadow,transform,color] duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-45",
    "hover:-translate-y-px active:translate-y-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // The blue install pill.
        default:
          "bg-[image:var(--gradient-primary)] text-primary-foreground " +
          "shadow-[var(--shadow-primary)] " +
          "hover:bg-[image:var(--gradient-primary-hover)] hover:shadow-[var(--shadow-primary-hover)]",
        // The silver companion pill that sits beside it.
        secondary:
          "bg-[image:var(--gradient-silver)] text-foreground " +
          "shadow-[var(--shadow-button)] " +
          "hover:bg-[image:var(--gradient-silver-hover)] hover:shadow-[var(--shadow-button-hover)]",
        // A quiet white pill for tertiary actions.
        outline:
          "border border-border bg-card text-foreground " +
          "shadow-[var(--shadow-xs)] " +
          "hover:border-ring/35 hover:shadow-[var(--shadow-sm)]",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-[image:var(--gradient-destructive)] text-destructive-foreground " +
          "shadow-[var(--shadow-primary)] " +
          "hover:shadow-[var(--shadow-button-hover)]",
        link: "text-primary underline-offset-4 hover:underline hover:translate-y-0",
      },
      size: {
        sm: "h-8 px-4 text-[0.8125rem]",
        default: "h-10 px-5 text-sm",
        lg: "h-11 px-7 text-base",
        icon: "h-10 w-10 px-0",
        "icon-sm": "h-8 w-8 px-0",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
