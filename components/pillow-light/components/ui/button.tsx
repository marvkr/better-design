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
    "rounded-[0.875rem] transition-all duration-fast ease-out",
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
          "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary)_85%,oklch(1_0_none))_0%,var(--primary)_55%,color-mix(in_oklch,var(--primary)_85%,oklch(0_0_none))_100%)]",
          "shadow-[var(--shadow-pillow-primary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-primary-hover)]",
        ].join(" "),
        // Secondary — white pillow with hairline ring + ground shadow
        secondary: [
          "text-foreground",
          "bg-[linear-gradient(180deg,oklch(1_0_0)_0%,oklch(0.9854_0.0013_286.3758)_100%)]",
          "shadow-[var(--shadow-pillow-secondary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-secondary-hover)]",
        ].join(" "),
        // Outline — minimal hairline, no pillow
        outline:
          "border border-border bg-background text-foreground hover:bg-muted hover:border-foreground/20",
        // Ghost — flat
        ghost: "bg-transparent text-foreground hover:bg-muted",
        // Destructive — same pillow recipe, mixed off --destructive
        destructive: [
          "text-destructive-foreground",
          "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--destructive)_85%,oklch(1_0_none))_0%,var(--destructive)_55%,color-mix(in_oklch,var(--destructive)_85%,oklch(0_0_none))_100%)]",
          "shadow-[var(--shadow-pillow-destructive)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-destructive-hover)]",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs rounded-[0.625rem]",
        lg: "h-14 px-8 text-base rounded-[1rem]",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9 rounded-[0.625rem]",
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
