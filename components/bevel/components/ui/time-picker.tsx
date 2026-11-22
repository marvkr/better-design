"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel TimePicker.
 *
 * The native time input on the system's field surface, so it matches the
 * inputs it sits between in a stacked form. A clock glyph leads the value from
 * inside the well, and the browser's own picker button keeps its place at the
 * right, dimmed back to the muted tone.
 */

/** Props for `TimePicker`; every native time input attribute passes through. */
export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Icon
        icon="solar:clock-circle-linear"
        className="pointer-events-none absolute left-3.5 top-1/2 size-[1.0625rem] -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        type="time"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "pl-10 text-[0.9063rem] tracking-[0.0188rem]",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-55",
          className,
        )}
        {...props}
      />
    </div>
  ),
)
TimePicker.displayName = "TimePicker"

export { TimePicker }
