"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

/* A time well: the readout in Geist Mono, the way the timeline shows time. */
const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full">
      <ClockIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={ref}
        type="time"
        data-slot="time-picker"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "pl-9 font-mono tabular-nums [color-scheme:dark]",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
)
TimePicker.displayName = "TimePicker"

// feather:clock
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></g>
    </svg>
  )
}

export { TimePicker }
