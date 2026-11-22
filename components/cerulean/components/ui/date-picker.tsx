"use client"

import * as React from "react"
import { format } from "date-fns"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"
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
            "flex h-9 items-center justify-start py-1.5 text-left font-normal",
            "data-[state=open]:border-transparent data-[state=open]:[box-shadow:var(--shadow-well),0_0_0_0.125rem_var(--ring)]",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Icon icon="tabler:calendar" className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onValueChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
