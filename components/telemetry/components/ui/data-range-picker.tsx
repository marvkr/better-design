"use client"

import * as React from "react"
import { format } from "date-fns"
import { Icon } from "@iconify/react"
import { type DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

// Control Room DataRangePicker: log-window selector. Recessed trigger
// well; the two-month calendar drops in the console popover surface.

interface DataRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DataRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  disabled,
  className,
}: DataRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    onChange?.(range)
  }

  const displayText = React.useMemo(() => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
      }
      return format(date.from, "LLL dd, y")
    }
    return null
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[17.5rem] justify-start text-left font-normal normal-case tracking-normal",
            "bg-input [box-shadow:var(--shadow-inset)]",
            !date && "text-muted-foreground",
            className
          )}
        >
          <Icon icon="tabler:calendar" className="mr-2 size-4" />
          {displayText ?? <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
          autoFocus
          className="border-0 bg-transparent"
        />
      </PopoverContent>
    </Popover>
  )
}
