"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

// Tactile Minimal Calendar — clean semantic surfaces, solid selection

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 bg-popover text-popover-foreground rounded-[10px] border border-border",
        className
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "inline-flex items-center justify-center",
          "h-7 w-7 rounded-[6px]",
          "bg-transparent border border-border",
          "text-muted-foreground transition-all duration-150",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "active:scale-[0.98]"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-[6px] w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected])]:bg-accent",
          "first:[&:has([aria-selected])]:rounded-l-[6px] last:[&:has([aria-selected])]:rounded-r-[6px]",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 p-0 rounded-[6px] font-normal text-foreground",
          "transition-all duration-150",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "active:scale-[0.98]",
          "aria-selected:opacity-100"
        ),
        day_selected: cn(
          "bg-primary text-primary-foreground font-medium",
          "hover:bg-primary hover:text-primary-foreground",
          "focus:bg-primary focus:text-primary-foreground"
        ),
        day_today: cn("bg-accent text-accent-foreground"),
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-30",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <Icon icon="tabler:chevron-left" className="h-4 w-4" />
        ),
        IconRight: ({ ...props }) => (
          <Icon icon="tabler:chevron-right" className="h-4 w-4" />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
