"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export function DataRangePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className={cn("w-[17.5rem] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="text-muted-foreground" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

// feather:calendar
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4m-5 4h18" />
      </g>
    </svg>
  )
}
