import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Supabase Button — dark developer platform, green (#3ecf8e) primary
// Real supabase.com treatment: green with border ring, depth shadow, inset top highlight
// Secondary: dark surface with subtle border

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-md transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary green — semi-transparent fill + solid border (from supabase-shadcn reference)
        default:
          "bg-primary/70 text-primary-foreground " +
          "border border-primary " +
          "hover:bg-primary/90",
        // Secondary: dark panel with border + subtle shadow
        secondary:
          "bg-secondary text-secondary-foreground " +
          "border border-border " +
          "shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] " +
          "hover:bg-accent hover:border-border/70",
        // Outline
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-primary/30",
        // Ghost
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "border border-destructive/50 " +
          "shadow-[0_1px_3px_rgba(0,0,0,0.3)] " +
          "hover:bg-destructive/90",
        // Link
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg:      "h-10 px-6",
        icon:    "h-9 w-9",
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
