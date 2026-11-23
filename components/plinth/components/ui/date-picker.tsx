"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface DatePickerProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

/* A recessed field that reads the date in mono and opens the month in a
   floating panel. */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onValueChange, placeholder = "Pick a date", className, disabled }, ref) => {
    const [open, setOpen] = React.useState(false)
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
              formFieldBase,
              formFieldSingleLine,
              "cursor-pointer items-center gap-2 pl-3 text-left",
              open && "border-ring/70 ring-2 ring-ring/30",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            {value ? <span className="font-mono text-[0.8125rem] tabular-nums">{format(value, "MMM d, yyyy")}</span> : <span>{placeholder}</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date: Date | undefined) => {
              onValueChange?.(date)
              setOpen(false)
            }}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

// feather:calendar
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><path d="M16 2v4M8 2v4m-5 4h18" /></g>
    </svg>
  )
}

export { DatePicker }
