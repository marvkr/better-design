import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth InputGroup: one recessed well that holds a field and its addons.
 * The well takes the inset and the focus ring; the field inside it is bare.
 * Addons read like the editor's parameter units: mono, muted, divided from
 * the field by a hairline.
 */

interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  disabled?: boolean
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, prefix, suffix, disabled, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="input-group"
      aria-disabled={disabled || undefined}
      className={cn(
        "flex h-9 w-full items-stretch overflow-hidden rounded-lg",
        "bg-input border border-transparent [box-shadow:var(--shadow-inset)]",
        "transition-[border-color,box-shadow] duration-fast",
        "hover:border-border",
        "focus-within:border-ring/70 focus-within:ring-2 focus-within:ring-ring/30",
        "[&_input]:h-full [&_input]:min-w-0 [&_input]:flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:bg-transparent [&_input]:[box-shadow:none]",
        "[&_input]:focus-visible:ring-0 [&_input]:focus-visible:border-0",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {prefix && <InputGroupAddon side="left">{prefix}</InputGroupAddon>}
      {children}
      {suffix && <InputGroupAddon side="right">{suffix}</InputGroupAddon>}
    </div>
  )
)
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }
>(({ className, side = "left", ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-group-addon"
    className={cn(
      "flex shrink-0 select-none items-center px-3",
      "font-mono text-[0.6875rem] uppercase text-muted-foreground [&_svg]:size-4",
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
    data-slot="input-group-input"
    className={cn(
      "flex h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground",
      "placeholder:text-muted-foreground outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
InputGroupInput.displayName = "InputGroupInput"

export { InputGroup, InputGroupAddon, InputGroupInput }
