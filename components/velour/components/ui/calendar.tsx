"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

/*
 * A velvet panel calendar: opaque gradient surface, raised velour nav
 * buttons, selected days wear the champagne primary material.
 */

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
        "p-4 rounded-xl [background-image:var(--velour)] [box-shadow:var(--shadow-s)]",
        className
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "absolute left-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-md",
          "[background-image:var(--velour-raised)] [box-shadow:var(--shadow-button)]",
          "text-muted-foreground transition-[background-image,box-shadow,color] duration-fast",
          "hover:[background-image:var(--velour-hover)] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        ),
        button_next: cn(
          "absolute right-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-md",
          "[background-image:var(--velour-raised)] [box-shadow:var(--shadow-button)]",
          "text-muted-foreground transition-[background-image,box-shadow,color] duration-fast",
          "hover:[background-image:var(--velour-hover)] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected])]:bg-primary/10",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 p-0 rounded-md font-normal text-foreground/85",
          "transition-colors duration-fast",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          "aria-selected:opacity-100"
        ),
        selected: cn(
          "[&_button]:[background-image:var(--champagne)] [&_button]:text-primary-foreground [&_button]:font-medium",
          "[&_button]:[box-shadow:var(--shadow-primary)]",
          "[&_button]:hover:[background-image:var(--champagne-hover)] [&_button]:hover:text-primary-foreground",
          "[&_button]:focus:[background-image:var(--champagne)] [&_button]:focus:text-primary-foreground"
        ),
        today: cn(
          "[&_button]:[background-image:var(--velour-raised)] [&_button]:[box-shadow:var(--shadow-s)] [&_button]:text-foreground"
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
            className="h-4 w-4"
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
