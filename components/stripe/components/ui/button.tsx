import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium tracking-[-0.01em]",
    "rounded-md transition-[background-color,color,box-shadow] duration-fast",
    "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)]",
    "disabled:pointer-events-none disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] hover:bg-primary/90",
        secondary:
          "bg-background text-foreground [box-shadow:var(--shadow-control)] " +
          "hover:bg-secondary hover:[box-shadow:var(--shadow-control-hover)]",
        outline:
          "bg-background text-foreground [box-shadow:var(--shadow-control)] " +
          "hover:bg-muted hover:[box-shadow:var(--shadow-control-hover)]",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-control)] hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-3.5",
        lg:      "h-10 px-4",
        icon:    "h-9 w-9",
        "icon-sm": "h-8 w-8 rounded-md",
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
