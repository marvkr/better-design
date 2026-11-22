import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { glassHover, primaryMaterial, primaryMaterialHover } from "./_shared";

// Amber Glass Button
// Hero (default): amber gradient pill glowing through the dark glass.
// Secondary: translucent glass chip with hairline rim (Filter / Sort treatment).

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold tracking-[-0.01em]",
    "rounded-lg transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:translate-y-px active:brightness-95",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero: the amber material. Shared token with every filled control.
        default: cn(primaryMaterial, primaryMaterialHover),
        // Alias kept in sync with the hero treatment.
        primary: cn(primaryMaterial, primaryMaterialHover),
        // Translucent glass chip with sheen.
        secondary: cn(
          "backdrop-blur-[var(--ag-blur)] bg-[var(--ag-fill)] text-foreground",
          "border border-[color:var(--ag-border)]",
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
          glassHover
        ),
        // Hairline outline on bare canvas.
        outline:
          "border border-[color:var(--ag-border-strong)] bg-transparent text-foreground " +
          "hover:bg-[var(--ag-fill)] hover:border-[color:var(--ag-border-strong)]",
        // Understated, lights up on hover.
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-[var(--ag-fill)] hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.18),0_0_0_0.0625rem_oklch(0.6_0.21_27/0.5),0_0.125rem_0.5rem_oklch(0_0_0/0.35)] " +
          "hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg: "h-10 px-6 text-sm",
        icon: "h-9 w-9",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
