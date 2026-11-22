import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Kanban Glass Button.
// default / primary ARE the DS's signature control material: a solid indigo pill
// (the board's accent) with a thin top specular highlight and a soft lift, so it
// reads like a card that wants to be dragged. The filled controls
// (checkbox / switch / radio / slider) mirror this exact material, scaled down.
// `secondary` is the dark-slate CTA seen on the board ("Add New Task").

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium",
    "rounded-[var(--radius-md)] transition-[background,box-shadow,transform] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Signature indigo pill — specular top rim + soft lift
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[var(--shadow-primary-inset)] " +
          "hover:bg-[color-mix(in_oklch,var(--primary)_88%,oklch(0_0_none)_12%)]",
        primary:
          "bg-primary text-primary-foreground " +
          "shadow-[var(--shadow-primary-inset)] " +
          "hover:bg-[color-mix(in_oklch,var(--primary)_88%,oklch(0_0_none)_12%)]",
        // Dark-slate CTA pill (the board's "Add New Task" button)
        secondary:
          "bg-[oklch(0.30_0.018_262)] text-[oklch(0.99_0.003_250)] " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.12),var(--shadow-sm)] " +
          "hover:bg-[oklch(0.26_0.018_262)]",
        // Outline — white card on the board, hairline border
        outline:
          "border border-border bg-card text-foreground " +
          "shadow-[var(--shadow-xs)] hover:border-[color:oklch(0_0_0/0.14)] hover:shadow-[var(--shadow-sm)]",
        // Ghost — flat, surface hover
        ghost: "text-foreground hover:bg-[oklch(0_0_0/0.05)]",
        // Destructive — same lift material as primary, rim derived from --destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.28),0_0.125rem_0.3125rem_oklch(0.5_0.18_25/0.30)] " +
          "hover:bg-[color-mix(in_oklch,var(--destructive)_90%,oklch(0_0_none)_10%)]",
        // Link — indigo accent
        link: "text-primary underline-offset-4 hover:underline rounded-none",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
