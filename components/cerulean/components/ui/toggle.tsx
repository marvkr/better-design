"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Command Noir Toggle — a quiet command chip.
 *
 * Off state: dim label, flat on the surface.
 * On state:  lights up with the cool accent material (fill + rim + glow),
 *            mirroring the primary Button so active controls read as one
 *            material across the system.
 */

const toggleVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-1.5",
    "rounded-md text-sm font-medium leading-none tracking-[-0.005em]",
    "transition-[color,background,box-shadow] duration-fast",
    "cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "text-muted-foreground hover:text-foreground",
    "data-[state=on]:text-primary-foreground",
    "data-[state=on]:[background:var(--accent-fill)]",
    "data-[state=on]:[box-shadow:var(--shadow-accent)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border bg-transparent " +
          "data-[state=on]:border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sizeClasses = {
  default: "h-[2.125rem] px-[0.8125rem]",
  sm: "h-[1.75rem] px-2.5 text-xs",
  lg: "h-[2.5rem] px-4",
}

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  size?: keyof typeof sizeClasses
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size = "default", ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant }), sizeClasses[size], className)}
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants, sizeClasses as toggleSizeClasses }
export type { ToggleProps }
