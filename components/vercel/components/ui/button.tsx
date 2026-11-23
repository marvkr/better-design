import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Button — pure black/white, minimal, 6px radius
// Primary: white bg, black text (inverted on dark bg) — Geist design language
// Secondary: transparent with subtle white border
// Height: 32px default (Geist md), tight 14px font, -0.006em tracking

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[0.875rem] font-medium tracking-[-0.006em]",
    "rounded-md transition-all duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "border border-primary " +
          "hover:bg-primary/90",
        secondary:
          "bg-transparent text-foreground " +
          "border border-[oklch(1_0_0/0.15)] " +
          "hover:bg-[oklch(1_0_0/0.05)] hover:border-[oklch(1_0_0/0.3)]",
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-6 px-2 text-[0.75rem] rounded-[0.3125rem]",
        default: "h-8 px-3",
        lg:      "h-10 px-4 text-[0.875rem] rounded-lg",
        icon:    "h-8 w-8",
        "icon-sm": "h-6 w-6 rounded-[0.3125rem]",
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
