import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Ledger Light Button — calm fintech CTA. The hero `default` is a solid
// cornflower-blue chip with a 1px darker rim and a soft low-alpha blue glow;
// it sinks 1px on press. Filled controls reuse this exact material.

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none tracking-tight",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-fast ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none [-webkit-tap-highlight-color:transparent]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-[var(--primary-rim)] bg-primary text-primary-foreground " +
          "shadow-[var(--shadow-primary)] hover:bg-primary/95 hover:shadow-[var(--shadow-primary-hover)] " +
          "active:translate-y-px active:shadow-[var(--shadow-primary-active)]",
        primary:
          "rounded-md border border-[var(--primary-rim)] bg-primary text-primary-foreground " +
          "shadow-[var(--shadow-primary)] hover:bg-primary/95 hover:shadow-[var(--shadow-primary-hover)] " +
          "active:translate-y-px active:shadow-[var(--shadow-primary-active)]",
        secondary:
          "rounded-md border border-border bg-card text-secondary-foreground " +
          "shadow-[var(--shadow-soft)] hover:bg-secondary hover:border-ring/30 " +
          "active:translate-y-px active:shadow-none",
        outline:
          "rounded-md border border-border bg-background text-foreground " +
          "hover:bg-muted hover:border-ring/35 " +
          "active:translate-y-px",
        ghost:
          "rounded-md bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground active:translate-y-px",
        destructive:
          "rounded-md border border-[var(--destructive-rim)] bg-destructive text-destructive-foreground " +
          "shadow-[var(--shadow-destructive)] hover:bg-destructive/95 " +
          "active:translate-y-px active:shadow-none",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4 py-1.5 text-sm",
        lg: "h-10 px-6 text-sm",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
