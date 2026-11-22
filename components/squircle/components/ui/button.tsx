import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Liquid Glass Button — pill-shaped, frosted glass secondary, iOS-blue primary.
// Glass = translucent fill + backdrop-blur + 1px light edge + specular top highlight.
// Squircle corners come from the global corner-shape rule in globals.css.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[0.9375rem] font-medium leading-none tracking-[-0.01em]",
    "rounded-full transition-[background-color,box-shadow,transform,filter] duration-base",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[0_0.125rem_0.75rem_color-mix(in_oklch,var(--primary)_35%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.35)] " +
          "hover:brightness-[1.06]",
        secondary:
          "bg-[oklch(1_0_0/0.5)] text-foreground backdrop-blur-md " +
          "border border-[oklch(1_0_0/0.65)] " +
          "shadow-[0_0.125rem_0.875rem_oklch(0_0_0/0.08),inset_0_0.0625rem_0_oklch(1_0_0/0.6)] " +
          "hover:bg-[oklch(1_0_0/0.72)]",
        outline:
          "bg-transparent text-primary " +
          "border border-primary/30 " +
          "hover:bg-primary/8 hover:border-primary/50",
        ghost:
          "bg-transparent text-foreground " +
          "hover:bg-[oklch(1_0_0/0.5)] hover:backdrop-blur-md",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_0.125rem_0.75rem_color-mix(in_oklch,var(--destructive)_35%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.3)] " +
          "hover:brightness-[1.06]",
        link: "text-primary underline-offset-4 hover:underline font-medium",
      },
      size: {
        sm:      "text-[0.8125rem] h-8 px-[0.875rem]",
        default: "h-[2.5rem] px-[1.25rem]",
        lg:      "text-[1.0625rem] h-[3rem] px-[1.625rem]",
        icon:    "h-[2.5rem] w-[2.5rem]",
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
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
