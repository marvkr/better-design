"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Amber Glass Toggle: glass chip that lights amber when pressed.

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-fast ease-out " +
    "hover:bg-[var(--ag-fill)] hover:text-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "data-[state=on]:bg-primary/15 data-[state=on]:text-primary data-[state=on]:shadow-[inset_0_0_0.625rem_oklch(0.69_0.195_42/0.12),inset_0_0_0_0.0625rem_oklch(0.69_0.195_42/0.3)]",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-[color:var(--ag-border-strong)] bg-transparent text-muted-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
