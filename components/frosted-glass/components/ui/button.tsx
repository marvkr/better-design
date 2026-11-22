import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { frostedGlassSurface, frostedGlassHover } from "./_shared";

// Frosted Glass Button — a frosted glass pill.
// default / primary ARE the DS's signature glass material (frostedGlassSurface):
// specular top rim + chromatic cyan/magenta edge + soft outer glow. The filled
// controls (checkbox / switch / radio / slider) mirror this exact surface.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[0.9375rem] font-medium leading-none tracking-[0.01em] text-foreground",
    "rounded-full transition-all duration-slow ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(frostedGlassSurface, frostedGlassHover),
        primary: cn(frostedGlassSurface, frostedGlassHover),
        secondary: cn(
          "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[oklch(1_0_0/0.05)]",
          "border border-[color:oklch(1_0_0/0.1)] text-secondary-foreground",
          "shadow-[inset_0_0.0625rem_0_-0.0313rem_oklch(1_0_0/0.3)]",
          "hover:bg-[var(--fg-fill)] hover:text-foreground",
        ),
        outline: cn(
          "bg-transparent border border-[color:var(--fg-border)]",
          "hover:bg-[oklch(1_0_0/0.06)] hover:border-[color:oklch(1_0_0/0.24)]",
        ),
        ghost:
          "bg-transparent text-muted-foreground hover:bg-[oklch(1_0_0/0.06)] hover:text-foreground",
        destructive: cn(
          "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[oklch(0.62_0.21_18/0.8)] text-destructive-foreground",
          "border border-[color:oklch(1_0_0/0.16)]",
          "shadow-[inset_0_0.0938rem_0.0313rem_-0.0313rem_oklch(1_0_0/0.5),0_0.5rem_1.375rem_-0.5rem_oklch(0.62_0.21_18/0.6)]",
          "hover:brightness-110",
        ),
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
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
  },
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
