"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Graphite Toggle — the signature primitive.
 *
 * Off state: dim soft-white label, flush with the recessed surface.
 * On state:  a raised pill in the same material as the primary button,
 *            top to bottom gradient with a hairline highlight and soft
 *            outer drop. The label sinks slightly into the pill via a
 *            1px pressed text-shadow.
 */

const toggleVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-1.5",
    "rounded-lg text-sm font-medium leading-none tracking-[-0.01em]",
    "transition-[color,background,box-shadow] duration-fast",
    "cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
    "disabled:pointer-events-none disabled:opacity-50",
    "text-foreground/55 hover:text-foreground/80",
    "data-[state=on]:text-foreground",
    "data-[state=on]:bg-[image:var(--pill-gradient)]",
    "data-[state=on]:hover:bg-[image:var(--pill-gradient-hover)]",
    "data-[state=on]:[box-shadow:var(--shadow-pill)]",
    "data-[state=on]:[text-shadow:var(--text-shadow-pressed)]",
    "active:translate-y-px",
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
