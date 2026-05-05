import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Pillow Light Button
// Pillowed 3D button: inset top highlight + inset bottom shadow ("lip") +
// outer drop shadow tinted with the primary blue. Hover lifts the button.
// Primary: vivid cobalt #1E66FF with a subtle vertical gradient
// Secondary: white with hairline ring + same pillow shadow stack
// Radius: 14px default — distinctive softly-rounded pill

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold tracking-[-0.005em]",
    "rounded-[14px] transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — vertical gradient mixed off --primary + inset highlight +
        // tinted lift glow (color-mix retints if user overrides --primary).
        default: [
          "text-primary-foreground",
          "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary)_85%,white)_0%,var(--primary)_55%,color-mix(in_oklch,var(--primary)_85%,black)_100%)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.30),inset_0_-2px_0_0_rgba(0,0,0,0.18),0_1px_1px_0_rgba(15,23,42,0.08),0_4px_10px_-2px_color-mix(in_oklch,var(--primary)_35%,transparent)]",
          "hover:-translate-y-px",
          "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.32),inset_0_-2px_0_0_rgba(0,0,0,0.20),0_2px_2px_0_rgba(15,23,42,0.10),0_8px_18px_-3px_color-mix(in_oklch,var(--primary)_45%,transparent)]",
        ].join(" "),
        // Secondary — white pillow with hairline ring + ground shadow
        secondary: [
          "text-foreground",
          "bg-[linear-gradient(180deg,#FFFFFF_0%,#FAFAFB_100%)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,1),inset_0_-1.5px_0_0_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.05),0_1px_1px_0_rgba(15,23,42,0.04),0_3px_8px_-2px_rgba(15,23,42,0.10)]",
          "hover:-translate-y-px",
          "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),inset_0_-1.5px_0_0_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.07),0_2px_2px_0_rgba(15,23,42,0.06),0_6px_14px_-3px_rgba(15,23,42,0.14)]",
        ].join(" "),
        // Outline — minimal hairline, no pillow
        outline:
          "border border-border bg-background text-foreground hover:bg-muted hover:border-foreground/20",
        // Ghost — flat
        ghost: "bg-transparent text-foreground hover:bg-muted",
        // Destructive — same pillow recipe, mixed off --destructive
        destructive: [
          "text-destructive-foreground",
          "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--destructive)_85%,white)_0%,var(--destructive)_55%,color-mix(in_oklch,var(--destructive)_85%,black)_100%)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),inset_0_-2px_0_0_rgba(0,0,0,0.20),0_1px_1px_0_rgba(15,23,42,0.08),0_4px_10px_-2px_color-mix(in_oklch,var(--destructive)_35%,transparent)]",
          "hover:-translate-y-px",
          "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.30),inset_0_-2px_0_0_rgba(0,0,0,0.22),0_2px_2px_0_rgba(15,23,42,0.10),0_8px_18px_-3px_color-mix(in_oklch,var(--destructive)_45%,transparent)]",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs rounded-[10px]",
        lg: "h-14 px-8 text-base rounded-[16px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
