import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-mono text-xs font-black uppercase tracking-[0.12em] leading-none",
    "rounded-[0.125rem] border-2 border-border cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform,color] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:-translate-x-px hover:-translate-y-px",
    "active:translate-x-[0.1875rem] active:translate-y-[0.1875rem] active:[box-shadow:0.0625rem_0.0625rem_0_oklch(0.115_0.012_255)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)] hover:[box-shadow:var(--shadow-button-hover)]",
        primary:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)] hover:[box-shadow:var(--shadow-button-hover)]",
        secondary:
          "bg-card text-foreground [box-shadow:var(--shadow-button)] hover:bg-secondary hover:[box-shadow:var(--shadow-button-hover)]",
        outline:
          "bg-background text-foreground [box-shadow:var(--shadow-sm)] hover:bg-card hover:[box-shadow:var(--shadow-md)]",
        ghost:
          "border-transparent bg-transparent text-foreground shadow-none hover:border-border hover:bg-primary hover:text-primary-foreground hover:[box-shadow:var(--shadow-sm)]",
        destructive:
          "bg-destructive text-destructive-foreground [box-shadow:var(--shadow-button)] hover:[box-shadow:var(--shadow-button-hover)]",
        link:
          "border-transparent bg-transparent p-0 text-foreground underline decoration-2 underline-offset-4 shadow-none hover:translate-x-0 hover:translate-y-0 hover:text-accent",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-10 px-4",
        lg: "h-11 px-6 text-sm",
        icon: "h-10 w-10",
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
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
