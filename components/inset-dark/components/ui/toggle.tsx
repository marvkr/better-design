"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Inset Dark Toggle — the signature primitive.
 *
 * Off state: dim white label, sits inside the recessed track.
 * On state:  raised pill with top→bottom gradient, hairline border,
 *            inset top-edge highlight + dual outer drop shadows. Label
 *            picks up a 1px text-shadow that drops it into the pill.
 */

const toggleVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-1.5",
    "rounded-[9px] text-sm font-medium leading-none tracking-[-0.01em]",
    "transition-[color,background,box-shadow] duration-180",
    "cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
    "disabled:pointer-events-none disabled:opacity-50",
    "text-[rgba(255,255,255,0.55)] hover:text-[rgba(255,255,255,0.8)]",
    "data-[state=on]:text-foreground",
    "data-[state=on]:[background:var(--pill-gradient)]",
    "data-[state=on]:[box-shadow:var(--shadow-pill)]",
    "data-[state=on]:[text-shadow:var(--text-shadow-pressed)]",
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
  default: "h-[34px] px-[13px]",
  sm: "h-[28px] px-2.5 text-xs",
  lg: "h-[40px] px-4",
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
