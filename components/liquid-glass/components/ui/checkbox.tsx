"use client"

import * as React from "react"
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { Checkbox as GlassCheckbox } from "./glass-checkbox"

/*
 * Liquid Glass Checkbox — the kit's tick: a recessed box under a cap of clear
 * glass that bends it even at rest, so the control always reads as glass.
 * The tick draws itself in beneath the cap, and the cap swells while pressed.
 * The system is light, so the glass keeps its light tokens on a dark page.
 * It takes the shadcn Checkbox props; "indeterminate" shows as unchecked.
 */
type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  size?: "sm" | "md" | "lg"
}

function Checkbox({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  id,
  size = "md",
  "aria-label": ariaLabel,
}: CheckboxProps) {
  const [own, setOwn] = React.useState(defaultChecked === true)
  const on = checked === undefined ? own : checked === true
  return (
    <span data-slot="checkbox" data-state={on ? "checked" : "unchecked"} className={cn("inline-flex", className)}>
      <GlassCheckbox
        id={id}
        aria-label={ariaLabel}
        label=""
        theme="light"
        size={size}
        checked={on}
        disabled={disabled}
        onChange={(next) => {
          setOwn(next)
          onCheckedChange?.(next)
        }}
      />
    </span>
  )
}

export { Checkbox }
