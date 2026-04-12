import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Glassmorphic Button — frosted glass pill with inset glow
// Primary: glass fill + inset white glow + brightness hover
// Outline: transparent with subtle white border
// Ghost: transparent, no border, brightness hover only

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-full transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:brightness-90 active:scale-[0.98]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "backdrop-blur-xl bg-white/10 text-white " +
          "shadow-[inset_0_0_8px_rgba(255,255,255,0.15)] " +
          "hover:brightness-125 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.2)]",
        primary:
          "backdrop-blur-xl bg-primary/80 text-primary-foreground " +
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_16px_oklch(0.65_0.19_250/0.2)] " +
          "hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_24px_oklch(0.65_0.19_250/0.3)]",
        secondary:
          "backdrop-blur-xl bg-white/[0.06] text-secondary-foreground " +
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.08)] " +
          "hover:bg-white/[0.1] hover:text-foreground",
        outline:
          "bg-transparent text-foreground " +
          "border border-white/[0.15] " +
          "hover:bg-white/[0.06] hover:border-white/[0.25]",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-white/[0.06] hover:text-foreground",
        destructive:
          "backdrop-blur-xl bg-destructive/80 text-destructive-foreground " +
          "shadow-[inset_0_0_8px_rgba(255,100,100,0.15)] " +
          "hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4",
        lg: "h-11 px-6 text-sm",
        icon: "h-10 w-10",
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
