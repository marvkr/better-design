import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Neon Vault Button: dark crypto wallet pills.
// Hero (default): hot-magenta gradient pill with a top sheen, hairline rim and
// a soft neon glow, the wallet's Deposit action. Secondary: raised graphite
// pill with a faint top light. Ghost and outline stay quiet on the vault canvas.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold",
    "rounded-full transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero: magenta gradient + sheen + rim + neon glow
        default:
          "bg-primary [background-image:var(--gradient-primary)] text-primary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:brightness-110 active:brightness-95",
        // Raised graphite pill
        secondary:
          "bg-secondary text-secondary-foreground border border-border " +
          "[box-shadow:var(--shadow-raised)] " +
          "hover:bg-accent",
        // Hairline pill on the canvas
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-ring/30",
        // Quiet text action
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        // Danger keeps the raised material in the destructive hue
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.22),0_0.0625rem_0.125rem_oklch(0_0_0/0.45),0_0.25rem_0.875rem_oklch(0.62_0.21_22/0.3)] " +
          "hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        default: "h-9 px-5",
        lg: "h-11 px-7 text-sm",
        icon: "h-9 w-9",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
