import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Midnight Glass Button — frosted glass pill with prismatic gradient border ring
// The gradient ring wrapper creates the signature border glow effect
// Primary: glass fill + inset glow + gradient ring
// Outline: transparent with subtle white border (no ring)
// Ghost: transparent, no border, brightness hover only

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[0.9375rem] font-medium leading-none tracking-[0.01em]",
    "rounded-full transition-all duration-slow ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:bg-white/[0.15] active:scale-[0.98]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-white " +
          "border border-white/[0.15] " +
          "shadow-[inset_0_0_0.5rem_oklch(1_0_0/0.15)] " +
          "hover:bg-white/[0.1]",
        primary:
          "backdrop-blur-xl bg-white/[0.15] text-white " +
          "border border-white/[0.25] " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.2),0_0_1rem_oklch(1_0_0/0.08)] " +
          "hover:bg-white/[0.2] hover:shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.25),0_0_1.5rem_oklch(1_0_0/0.12)]",
        secondary:
          "backdrop-blur-xl bg-white/[0.06] text-secondary-foreground " +
          "border border-white/[0.12] " +
          "shadow-[inset_0_0_0.375rem_oklch(1_0_0/0.08)] " +
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
          "border border-white/[0.12] " +
          "shadow-[inset_0_0_0.5rem_oklch(0.7017_0.1895_23.3274/0.15)] " +
          "hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        default: "h-12 px-8",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
        "icon-sm": "h-9 w-9",
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
  /** Wrap with a prismatic gradient border ring (the signature effect) */
  ring?: boolean;
}

const GradientRing = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex p-px rounded-full",
      "bg-[linear-gradient(165deg,oklch(1_0_0/0.42)_0%,oklch(1_0_0/0.16)_20%,oklch(1_0_0/0.03)_50%,oklch(1_0_0/0.08)_80%,oklch(1_0_0/0.21)_100%)]",
      className
    )}
    {...props}
  />
));
GradientRing.displayName = "GradientRing";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ring = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const btn = (
      <Comp
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );

    if (ring) {
      return <GradientRing>{btn}</GradientRing>;
    }

    return btn;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, GradientRing };
