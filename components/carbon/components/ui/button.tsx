import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Carbon (Concept 002) Button : white pebble pill primary on smoked-glass surfaces.
// Default = white CTA pill (mirrors "add to your garage" bar from Concept 2).
// Secondary = dark glass pill (translucent w/ inset highlight).

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold tracking-[-0.012em]",
    "rounded-full transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:translate-y-px",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary : silver frosted-glass pill (the "add to your garage" CTA from Concept 2).
        // Surface = 7F7F7F @ 70% w/ 64px backdrop blur + 0,4,16 white@10% inner shadow (Figma effects).
        default: [
          "text-primary-foreground backdrop-blur-[var(--glass-backdrop-blur)] backdrop-saturate-150",
          "bg-primary",
          "shadow-[var(--shadow-pillow-primary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-primary-hover)]",
        ].join(" "),
        // Secondary : darker frosted-glass pill (same Figma recipe, lower-saturation fill)
        secondary: [
          "text-secondary-foreground backdrop-blur-[var(--glass-backdrop-blur)] backdrop-saturate-150",
          "bg-secondary",
          "shadow-[var(--shadow-pillow-secondary)]",
          "hover:-translate-y-px",
          "hover:shadow-[var(--shadow-pillow-secondary-hover)]",
        ].join(" "),
        // Outline : hairline ring, no fill
        outline:
          "border border-border bg-transparent text-foreground hover:bg-[oklch(1_0_0/0.06)] hover:border-[oklch(1_0_0/0.2)]",
        // Ghost : flat
        ghost: "bg-transparent text-muted-foreground hover:bg-[oklch(1_0_0/0.06)] hover:text-foreground",
        // Destructive : same frosted-glass recipe as primary, but tinted with --destructive.
        // Keeps the Figma inner-shadow language consistent across all CTA variants.
        destructive: [
          "text-destructive-foreground backdrop-blur-[var(--glass-backdrop-blur)] backdrop-saturate-150",
          "bg-[color-mix(in_oklch,var(--destructive)_70%,transparent)]",
          "shadow-[var(--shadow-pillow-destructive)]",
          "hover:-translate-y-px",
          "hover:bg-[color-mix(in_oklch,var(--destructive)_82%,transparent)]",
          "hover:shadow-[var(--shadow-pillow-destructive-hover)]",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
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
