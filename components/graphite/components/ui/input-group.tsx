import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * InputGroup — composes an input with addons (icons, text, buttons) on either side.
 * Graphite treatment: the group container is one recessed well (shadow-inset),
 * so every child reads as sitting inside the same pressed-in surface. On focus
 * the well keeps its depth and gains a soft white ring instead of a hue.
 */

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-stretch w-full rounded-lg overflow-hidden",
        "bg-input text-foreground border-0 [box-shadow:var(--shadow-inset)]",
        "transition-[box-shadow] duration-fast",
        "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_oklch(1_0_0_/_0.2)]",
        className
      )}
      {...props}
    />
  )
)
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }
>(({ className, side = "left", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-3 text-sm text-muted-foreground bg-secondary/40",
      side === "left" ? "border-r border-border" : "border-l border-border",
      className
    )}
    {...props}
  />
))
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-9 flex-1 min-w-0 bg-transparent px-3 py-1.5 text-sm text-foreground",
      "placeholder:text-muted-foreground/70",
      "outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
InputGroupInput.displayName = "InputGroupInput"

export { InputGroup, InputGroupAddon, InputGroupInput }
