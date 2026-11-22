import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Interior Button — a key you could press.
 *
 * The primary action is an ink fill, not a blue one: accent marks interaction
 * and focus, never "this is the main button". The secondary is a cap — a
 * bottom lip and a hairline all round. Every variant presses down 1px, keeps
 * its width when its state changes, and draws focus without a ring: filled
 * surfaces get an outside line in the inverted accent (the accent is chosen
 * against the surface it is drawn on, not against the page), light surfaces
 * get an accent border plus a lift.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "rounded-[0.5625rem] text-[0.8125rem] font-medium leading-[1.25rem]",
    "transition-[background-color,border-color,box-shadow,transform] duration-fast",
    "focus-visible:outline-none",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[var(--shadow-thumb)]",
          "hover:bg-primary/90",
          "focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
        ].join(" "),
        secondary: [
          "bg-card text-foreground",
          "shadow-[var(--shadow-cap)]",
          "hover:bg-secondary",
          "focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring),var(--shadow-focus-lift)]",
        ].join(" "),
        outline: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-secondary hover:border-foreground/30",
          "focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus-lift)]",
        ].join(" "),
        ghost: [
          "text-muted-foreground",
          "hover:bg-secondary hover:text-foreground",
          "focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
        ].join(" "),
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[var(--shadow-thumb)]",
          "hover:bg-destructive/90",
          "focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
        ].join(" "),
        link: "text-accent-foreground underline-offset-4 hover:underline focus-visible:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 rounded-[0.5rem] px-3 text-xs",
        lg: "h-11 px-5",
        icon: "h-10 w-10 px-0",
        "icon-sm": "h-8 w-8 px-0 rounded-[0.5rem]",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
