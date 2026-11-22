import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * InputGroup — composes an input with addons (icons, text, buttons) on either
 * side. The group container is a recessed channel milled into the steel plate:
 * it carries the inset shadow and hairline chrome edge so every child sits
 * "inside" the well. Azure focus ring on focus-within.
 */

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-stretch w-full rounded-lg overflow-hidden",
        "bg-input border border-white/10 [box-shadow:var(--shadow-inset)]",
        "transition-[border-color,box-shadow] duration-fast",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
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
      "flex items-center px-3 text-sm text-muted-foreground bg-muted/40",
      side === "left" ? "border-r border-white/10" : "border-l border-white/10",
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
      "placeholder:text-muted-foreground",
      "outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
InputGroupInput.displayName = "InputGroupInput"

export { InputGroup, InputGroupAddon, InputGroupInput }
