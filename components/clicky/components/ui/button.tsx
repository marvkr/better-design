"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useSound } from "./sound-provider"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none tracking-tight",
    "transform-gpu transition-[transform,box-shadow,background-color,border-color] duration-base ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none [-webkit-tap-highlight-color:transparent]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-[var(--primary-rim)] bg-primary text-primary-foreground " +
          "shadow-[var(--shadow-tactile)] hover:shadow-[var(--shadow-tactile-hover)] " +
          "active:translate-y-px active:shadow-[var(--shadow-tactile-active)]",
        primary:
          "rounded-md border border-[var(--primary-rim)] bg-primary text-primary-foreground " +
          "shadow-[var(--shadow-tactile)] hover:shadow-[var(--shadow-tactile-hover)] " +
          "active:translate-y-px active:shadow-[var(--shadow-tactile-active)]",
        glass:
          "rounded-full backdrop-blur-md bg-black/20 text-white " +
          "border border-white/15 " +
          " " +
          "hover:bg-black/30",
        secondary:
          "rounded-md border border-border bg-card text-secondary-foreground " +
          "shadow-[var(--shadow-soft)] hover:bg-secondary hover:shadow-[var(--shadow-soft-hover)] " +
          "active:translate-y-px active:shadow-none",
        outline:
          "rounded-md border border-border bg-background text-foreground " +
          "shadow-[var(--shadow-soft)] hover:bg-muted hover:border-ring/40 " +
          "active:translate-y-px active:shadow-none",
        ghost: "rounded-md bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground active:translate-y-px",
        destructive:
          "rounded-md border border-[var(--destructive-rim)] bg-destructive text-destructive-foreground " +
          "shadow-[var(--shadow-tactile-destructive)] hover:shadow-[var(--shadow-tactile-destructive-hover)] " +
          "active:translate-y-px active:shadow-[var(--shadow-tactile-destructive-active)]",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-3.5 py-1.5 text-sm",
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
  ({ className, variant, size, asChild = false, onClick, onPointerDown, ...props }, ref) => {
    const { playClick, playTick } = useSound()
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        type={asChild ? undefined : "button"}
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
