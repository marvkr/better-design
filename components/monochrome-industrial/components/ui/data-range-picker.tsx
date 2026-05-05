"use client"

import * as React from "react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
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
 "w-full justify-start text-left font-normal",
 !value && "text-muted-foreground",
 className
 )}
 >
 <Icon icon="tabler:calendar" className="mr-2 h-4 w-4" />
 {value?.from ? (
 value.to ? (
 <>
 {format(value.from, "LLL dd, y")} – {format(value.to, "LLL dd, y")}
 </>
 ) : (
 format(value.from, "LLL dd, y")
 )
 ) : (
 <span>{placeholder}</span>
 )}
 </Button>
 </PopoverTrigger>
 <PopoverContent className="w-auto p-0" align="start">
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
