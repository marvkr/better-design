import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel InputGroup.
 *
 * One field well holding an input and its addons. The container carries the
 * pressed surface and the focus ring, so a prefix, a text box and a trailing
 * button read as a single control. An addon is parted from the input by one
 * pixel of the track token, never a border.
 */

/** Props for `InputGroup`, the well that holds an input and its addons. */
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        formFieldBase,
        formFieldSingleLine,
        "items-stretch overflow-hidden px-0 py-0",
        "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_var(--ring)]",
        className,
      )}
      {...props}
    />
  ),
)
InputGroup.displayName = "InputGroup"

/** Props for `InputGroupAddon`; `side` picks which edge carries the divider. */
export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right"
}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, side = "left", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex shrink-0 items-center gap-1.5 px-3.5",
        "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-muted-foreground",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        side === "left" ?
          "[box-shadow:0.0625rem_0_0_0_var(--track)]"
        : "[box-shadow:-0.0625rem_0_0_0_var(--track)]",
        className,
      )}
      {...props}
    />
  ),
)
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "min-w-0 flex-1 bg-transparent px-3.5 outline-none",
      "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-foreground",
      "placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
))
InputGroupInput.displayName = "InputGroupInput"

export { InputGroup, InputGroupAddon, InputGroupInput }
