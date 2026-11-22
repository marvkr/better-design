"use client"

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

// Leather Luxe Calendar: raised charcoal nav coins; the selected day is a
// cognac leather disc with the Button's sheen and rim.

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
        "p-4 rounded-xl border border-highlight bg-card [box-shadow:var(--shadow-card)]",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "absolute left-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-full",
          "[background-image:var(--gradient-raised)] border border-highlight",
          "[box-shadow:var(--shadow-raised-sm)]",
          "text-muted-foreground transition-[filter,color] duration-base",
          "hover:brightness-125 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        ),
        button_next: cn(
          "absolute right-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-full",
          "[background-image:var(--gradient-raised)] border border-highlight",
          "[box-shadow:var(--shadow-raised-sm)]",
          "text-muted-foreground transition-[filter,color] duration-base",
          "hover:brightness-125 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground/70 rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected])]:bg-primary/15",
          "first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 p-0 rounded-full font-normal text-foreground/85",
          "transition-[background,box-shadow,color] duration-base",
          "hover:bg-accent hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          "aria-selected:opacity-100"
        ),
        selected: cn(
          "[&_button]:[background-image:var(--gradient-leather)]",
          "[&_button]:text-primary-foreground [&_button]:font-medium",
          "[&_button]:border [&_button]:border-[oklch(0.68_0.115_58/0.55)]",
          "[&_button]:[box-shadow:var(--shadow-leather-sm)]",
          "[&_button]:hover:brightness-110"
        ),
        today: cn(
          "[&_button]:[background-image:var(--gradient-raised)]",
          "[&_button]:border [&_button]:border-highlight",
          "[&_button]:[box-shadow:var(--shadow-raised-sm)]",
          "[&_button]:text-foreground"
        ),
        outside: "text-muted-foreground/40 opacity-50",
        disabled: "text-muted-foreground/40 opacity-30",
        range_middle: "aria-selected:bg-primary/15 aria-selected:text-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) => {
          const Comp =
            orientation === "left"
              ? ChevronLeft
              : orientation === "right"
                ? ChevronRight
                : orientation === "up"
                  ? ChevronUp
                  : ChevronDown
          return <Comp className="h-4 w-4" {...chevronProps} />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
