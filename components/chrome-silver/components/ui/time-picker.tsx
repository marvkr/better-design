"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      <input
        ref={ref}
        type="time"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "pl-9 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
          className
        )}
        {...props}
      />
    </div>
  )
)
TimePicker.displayName = "TimePicker"

export { TimePicker }
