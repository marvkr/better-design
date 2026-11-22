"use client"

import * as React from "react"
import { format } from "date-fns"
import { type DateRange } from "react-day-picker"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * Bevel DateRangePicker.
 *
 * The same field trigger as the single DatePicker, reading "6 Jan to 14 Jan"
 * once both ends are set. The popover holds two months side by side on wide
 * screens, where the two round ends of the range join through the tinted
 * middle days.
 */

/** Props for `DateRangePicker`, a two-date field with a calendar popover. */
export interface DateRangePickerProps {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const DateRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      value,
      onValueChange,
      placeholder = "Pick a date range",
      className,
      disabled,
    },
    ref,
  ) => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "items-center justify-start gap-2 text-left text-[0.9063rem] tracking-[0.0188rem]",
            !value?.from && "text-muted-foreground",
            className,
          )}
        >
          <Icon
            icon="solar:calendar-linear"
            className="size-[1.0625rem] shrink-0 text-muted-foreground"
          />
          {value?.from ?
            value.to ?
              <>
                {format(value.from, "LLL dd, y")} to{" "}
                {format(value.to, "LLL dd, y")}
              </>
            : format(value.from, "LLL dd, y")
          : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto rounded-[0.875rem] bg-popover p-0 text-popover-foreground [box-shadow:var(--shadow-lg)]"
      >
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onValueChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  ),
)
DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker }
