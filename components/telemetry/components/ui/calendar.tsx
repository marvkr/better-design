"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

// Control Room Calendar: shift-schedule grid.
// Console panel with hairline frame; the selected day carries the
// signal-green plate, today is an outlined cell.

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
        "rounded-md border border-border bg-card p-4",
        className
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label:
          "text-xs font-semibold uppercase tracking-widest text-foreground",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "absolute left-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-sm",
          "border border-border bg-secondary",
          "text-muted-foreground transition-colors duration-fast",
          "hover:border-ring/50 hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        ),
        button_next: cn(
          "absolute right-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-sm",
          "border border-border bg-secondary",
          "text-muted-foreground transition-colors duration-fast",
          "hover:border-ring/50 hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "w-9 rounded-xs text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground",
        week: "flex w-full mt-2",
        day: cn(
          "relative h-9 w-9 p-0 text-center text-xs",
          "[&:has([aria-selected])]:bg-primary/10",
          "first:[&:has([aria-selected])]:rounded-l-xs last:[&:has([aria-selected])]:rounded-r-xs",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 rounded-xs p-0 font-normal text-foreground/80",
          "transition-colors duration-fast",
          "hover:bg-accent hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          "aria-selected:opacity-100"
        ),
        selected: cn(
          "[&_button]:bg-primary [&_button]:font-semibold [&_button]:text-primary-foreground",
          "[&_button]:[box-shadow:var(--shadow-control)]",
          "[&_button]:hover:bg-primary [&_button]:hover:text-primary-foreground",
          "[&_button]:focus:bg-primary [&_button]:focus:text-primary-foreground"
        ),
        today: cn(
          "[&_button]:border [&_button]:border-primary/50 [&_button]:text-primary"
        ),
        outside: "text-muted-foreground/40 opacity-50",
        disabled: "text-muted-foreground/40 opacity-30",
        range_middle:
          "aria-selected:bg-primary/10 aria-selected:text-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) => (
          <Icon
            icon={
              orientation === "left"
                ? "tabler:chevron-left"
                : orientation === "right"
                  ? "tabler:chevron-right"
                  : orientation === "up"
                    ? "tabler:chevron-up"
                    : "tabler:chevron-down"
            }
            className="size-4"
            {...chevronProps}
          />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
