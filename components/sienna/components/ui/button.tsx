import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* Pill controls with the compact orange action and ivory secondary surface. */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-full cursor-pointer select-none",
    "transition-[box-shadow,transform,color] duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [background-image:linear-gradient(to_bottom,var(--primary-from),var(--primary-to))] [box-shadow:var(--shadow-primary)] " +
          "hover:[box-shadow:var(--shadow-primary-hover)]",
        primary:
          "bg-primary text-primary-foreground [background-image:linear-gradient(to_bottom,var(--primary-from),var(--primary-to))] [box-shadow:var(--shadow-primary)] " +
          "hover:[box-shadow:var(--shadow-primary-hover)]",
        secondary:
          "bg-secondary text-secondary-foreground [box-shadow:var(--shadow-button)] " +
          "hover:bg-accent hover:[box-shadow:var(--shadow-button-hover)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-foreground/20 hover:text-accent-foreground",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground [background-image:linear-gradient(to_bottom,var(--destructive-from),var(--destructive-to))] [box-shadow:var(--shadow-destructive)] " +
          "hover:[box-shadow:var(--shadow-destructive-hover)]",
        link: "text-foreground underline-offset-4 hover:underline hover:text-ring",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        default: "h-10 px-5",
        lg: "h-12 px-6 text-base",
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
