"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface DateRangePickerProps {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ value, onValueChange, placeholder = "Pick a date range", className, disabled }, ref) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start gap-2 rounded-lg px-3 text-left text-sm font-normal",
            "bg-input border-0 text-foreground",
            "[box-shadow:var(--shadow-inset)] hover:bg-input hover:[box-shadow:var(--shadow-inset-deep)]",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Icon
            icon="tabler:calendar"
            className="h-4 w-4 shrink-0 text-muted-foreground"
          />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
              </>
            ) : (
              format(value.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto rounded-lg border border-border bg-popover p-0 text-popover-foreground [box-shadow:var(--shadow-lg)]"
        align="start"
      >
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onValueChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
)
DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker }
