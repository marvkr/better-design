"use client"

import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/* Recessed-well trigger; the calendar floats as a velvet panel. */

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
  const formatted = value
    ? value.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "w-full items-center justify-start text-left font-normal",
            !value && "text-muted-foreground/80",
            className
          )}
        >
          <Icon icon="tabler:calendar" className="mr-2 h-4 w-4" />
          {formatted ?? placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-xl p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
export type { DatePickerProps }
