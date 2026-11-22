"use client"

import * as React from "react"
import { format } from "date-fns"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * Bevel DatePicker.
 *
 * The trigger is a form field, not a button, so a date sits in a stacked form
 * on the same pressed well as the inputs above and below it. Tapping it opens
 * the month grid on the popover surface: no border, the 14px radius and the
 * deeper drop shadow, so the sheet separates from the card it opens over.
 */

/** Props for `DatePicker`, a single-date field with a calendar popover. */
export interface DatePickerProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    { value, onValueChange, placeholder = "Pick a date", className, disabled },
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
            !value && "text-muted-foreground",
            className,
          )}
        >
          <Icon
            icon="solar:calendar-linear"
            className="size-[1.0625rem] shrink-0 text-muted-foreground"
          />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto rounded-[0.875rem] bg-popover p-0 text-popover-foreground [box-shadow:var(--shadow-lg)]"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  ),
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
