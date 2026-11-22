"use client"

import * as React from "react"
import { format } from "date-fns"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface DatePickerProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onValueChange, placeholder = "Pick a date", className, disabled }, ref) => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "items-center justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Icon icon="ph:calendar-blank" className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-xl border border-border bg-popover text-popover-foreground [box-shadow:var(--shadow-l)]" align="start">
        <Calendar mode="single" selected={value} onSelect={onValueChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
