"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

// Amber Glass DatePicker: glass trigger opening the glass calendar.

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  className,
}: DatePickerProps) {
  const [internal, setInternal] = React.useState<Date | undefined>(value)
  const date = value ?? internal

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-[15rem] items-center rounded-lg px-3 py-2 text-left text-sm font-medium",
            formFieldBase,
            !date && "text-muted-foreground",
            className
          )}
        >
          <Icon icon="tabler:calendar" className="mr-2 h-4 w-4 text-primary" />
          {date ? date.toLocaleDateString() : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(next) => {
            setInternal(next)
            onChange?.(next)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
export type { DatePickerProps }
