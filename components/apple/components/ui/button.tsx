import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Button — pill-shaped CTAs, blue primary, f5f5f7 secondary
// Primary: #0071e3 blue, 980px radius (fully pill), 17px font, 400 weight
// Secondary: #f5f5f7 off-white bg, dark text
// Transition: 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[1.0625rem] font-normal leading-[1.17648] tracking-[-0.022em]",
    "rounded-[61.25rem] transition-[background-color] duration-slow",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.99]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "hover:bg-[oklch(0.5831_0.1989_255.9725)]",
        secondary:
          "bg-[oklch(0.9707_0.0027_286.3504)] text-[oklch(0.2316_0.0038_286.0989)] " +
          "hover:bg-[oklch(0.9324_0.0067_286.2691)]",
        outline:
          "bg-transparent text-primary " +
          "border border-primary/30 " +
          "hover:border-primary/60",
        ghost:
          "bg-transparent text-primary " +
          "hover:bg-[oklch(0.9707_0.0027_286.3504)]",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90",
        link: "text-primary text-[1.0625rem] underline-offset-4 hover:underline font-normal",
      },
      size: {
        sm:      "text-[0.875rem] h-8 px-[0.875rem]",
        default: "h-[2.75rem] px-[1.375rem]",
        lg:      "text-[1.1875rem] h-[3.25rem] px-[1.75rem]",
        icon:    "h-[2.75rem] w-[2.75rem]",
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
