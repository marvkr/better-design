import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Playdesk Button — the desk's download pill.
 *
 * Every raised variant is one moulded object: a vertical gradient for body,
 * a gloss sheen fading out past the midline for light, and a wide soft shadow
 * for height. The pill is fully rounded at every size, and the label sits at
 * medium weight rather than bold so the shape carries the emphasis.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full text-sm font-medium",
    "transition-[box-shadow,background-color,transform] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // The hero pill: sky-blue gradient, gloss, blue-tinted float.
        default: [
          "text-primary-foreground",
          "[background-image:var(--fill-primary)]",
          "[box-shadow:var(--shadow-primary)]",
          "hover:[background-image:var(--fill-primary-hover)]",
          "hover:[box-shadow:var(--shadow-primary-hover)]",
        ].join(" "),
        // The companion pill: light grey gradient under the same gloss.
        secondary: [
          "text-secondary-foreground",
          "[background-image:var(--fill-secondary)]",
          "[box-shadow:var(--shadow-button)]",
          "hover:[background-image:var(--fill-secondary-hover)]",
          "hover:[box-shadow:var(--shadow-button-hover)]",
        ].join(" "),
        outline: [
          "bg-card text-foreground border border-border",
          "[box-shadow:var(--shadow-xs)]",
          "hover:bg-muted hover:border-foreground/20",
        ].join(" "),
        ghost: "text-foreground hover:bg-foreground/[0.05]",
        destructive: [
          "text-destructive-foreground",
          "[background-image:var(--fill-destructive)]",
          "[box-shadow:var(--shadow-destructive)]",
          "hover:[background-image:var(--fill-destructive-hover)]",
          "hover:[box-shadow:var(--shadow-destructive-hover)]",
        ].join(" "),
        link: "text-primary font-semibold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
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
