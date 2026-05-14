import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useSound } from "./sound-provider"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "transition-all duration-150 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "rounded-[6px] bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "rounded-[6px] bg-primary text-primary-foreground hover:bg-primary/90",
        glass:
          "rounded-full backdrop-blur-md bg-black/20 text-white " +
          "border border-white/15 " +
          " " +
          "hover:bg-black/30",
        secondary: "rounded-[6px] bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground",
        outline: "rounded-[6px] border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "rounded-[6px] bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "rounded-[6px] bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-3.5 py-1.5 text-sm",
        lg: "h-10 px-6 text-sm",
        icon: "h-9 w-9",
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
  ({ className, variant, size, asChild = false, onClick, onPointerDown, ...props }, ref) => {
    const { playClick, playTick } = useSound()
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
          playTick()
          onPointerDown?.(e)
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          playClick()
          onClick?.(e)
        }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
