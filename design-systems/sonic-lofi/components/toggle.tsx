"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useSound } from "./sound-provider"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-[6px] text-sm font-medium",
    "transition-all duration-150",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-border bg-background text-muted-foreground " +
          "hover:border-ring/50 " +
          "data-[state=on]:border-border",
      },
      size: {
        sm: "h-8 px-2.5",
        default: "h-9 px-3",
        lg: "h-10 px-5",
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
>(({ className, variant, size, onPressedChange, ...props }, ref) => {
  const { playClick } = useSound()
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      onPressedChange={(pressed) => {
        playClick()
        onPressedChange?.(pressed)
      }}
      {...props}
    />
  )
})
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
