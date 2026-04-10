import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Apple Button — pill-shaped CTAs, blue primary, f5f5f7 secondary
// Primary: #0071e3 blue, 980px radius (fully pill), 17px font, 400 weight
// Secondary: #f5f5f7 off-white bg, dark text
// Transition: 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[17px] font-normal leading-[1.17648] tracking-[-0.022em]",
    "rounded-[980px] transition-[background-color] duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.99]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "hover:bg-[#0077ed]",
        secondary:
          "bg-[#f5f5f7] text-[#1d1d1f] " +
          "hover:bg-[#e8e8ed]",
        outline:
          "bg-transparent text-primary " +
          "border border-primary/30 " +
          "hover:border-primary/60",
        ghost:
          "bg-transparent text-primary " +
          "hover:bg-[#f5f5f7]",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90",
        link: "text-primary text-[17px] underline-offset-4 hover:underline font-normal",
      },
      size: {
        sm:      "text-[14px] h-8 px-[14px]",
        default: "h-[44px] px-[22px]",
        lg:      "text-[19px] h-[52px] px-[28px]",
        icon:    "h-[44px] w-[44px]",
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
