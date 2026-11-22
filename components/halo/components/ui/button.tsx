import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Halo Button — translucent controls.
// default/primary: bright-blue vertical gradient, hairline white rim, soft drop shadow.
// secondary/outline/ghost: translucent over the dark canvas.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "text-sm font-semibold tracking-tight leading-none",
    "rounded-sm transition-all duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-primary to-primary/85 text-primary-foreground " +
          "border border-primary-foreground/20 " +
          "shadow-[0_0.25rem_0.375rem_-0.0625rem_color-mix(in_oklch,var(--shade)_25%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.18)] " +
          "hover:brightness-110",
        primary:
          "bg-gradient-to-t from-primary to-primary/85 text-primary-foreground " +
          "border border-primary-foreground/20 " +
          "shadow-[0_0.25rem_0.375rem_-0.0625rem_color-mix(in_oklch,var(--shade)_25%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.18)] " +
          "hover:brightness-110",
        secondary:
          "backdrop-blur-xl bg-foreground/[0.08] text-foreground " +
          "border border-border " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.08)] " +
          "hover:bg-foreground/[0.12]",
        outline:
          "bg-transparent text-foreground " +
          "border border-foreground/[0.15] " +
          "hover:bg-foreground/[0.06] hover:border-foreground/[0.25]",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-foreground/[0.06] hover:text-foreground",
        destructive:
          "bg-gradient-to-t from-destructive to-destructive/85 text-destructive-foreground " +
          "border border-destructive-foreground/15 " +
          "shadow-[0_0.25rem_0.375rem_-0.0625rem_color-mix(in_oklch,var(--shade)_25%,transparent)] " +
          "hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4",
        lg: "h-12 px-5 text-sm",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
