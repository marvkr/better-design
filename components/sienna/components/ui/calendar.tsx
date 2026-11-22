"use client"

import * as React from "react"
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * The look both month arrows share. react-day-picker 9 draws the arrows beside
 * the months, not inside the caption, so the nav sits on the caption's centre
 * line (its 0.25rem top padding plus half the 1.25rem text line) and each
 * arrow centres on the month name as before.
 */
const navButton = cn(
  buttonVariants({ variant: "outline", size: "icon" }),
  "h-7 w-7 bg-transparent p-0"
)

/**
 * The look of a day in each state. react-day-picker 9 puts its own state
 * classes on the table cell; these style the button, so CalendarDayButton
 * sets them there.
 */
const dayState = {
  range_start: "day-range-start",
  range_end: "day-range-end",
  selected:
    "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)] hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  today: "bg-accent text-accent-foreground",
  outside: "day-outside text-muted-foreground opacity-40",
  disabled: "text-muted-foreground opacity-50",
  range_middle: "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
}

/**
 * One day's button, with the classes of every state the day is in. A later
 * state wins a clash, so a picked day keeps its fill when it is also today.
 * The button carries `data-selected` because the cell, not the button, now
 * holds `aria-selected`.
 */
function CalendarDayButton({ className, modifiers, ...props }: DayButtonProps) {
  return (
    <DayButton
      modifiers={modifiers}
      data-selected={modifiers.selected || undefined}
      className={cn(
        className,
        modifiers.today && dayState.today,
        modifiers.outside && dayState.outside,
        modifiers.disabled && dayState.disabled,
        modifiers.selected && dayState.selected,
        modifiers.range_start && dayState.range_start,
        modifiers.range_end && dayState.range_end,
        modifiers.range_middle && dayState.range_middle,
      )}
      {...props}
    />
  )
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 items-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "absolute left-0 top-3.5 w-full space-x-1 flex items-center",
        button_previous: cn(navButton, "absolute left-1"),
        button_next: cn(navButton, "absolute right-1"),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-lg w-8 font-normal text-xs uppercase tracking-wider",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([data-selected=true])]:bg-accent/40 [&:has([data-selected=true].day-outside)]:bg-accent/20",
          "first:[&:has([data-selected=true])]:rounded-l-lg last:[&:has([data-selected=true])]:rounded-r-lg"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal data-[selected=true]:opacity-100"
        ),
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) => (
          <Icon
            icon={orientation === "left" ? "ph:caret-left" : "ph:caret-right"}
            className={cn("h-4 w-4", chevronProps.className)}
          />
        ),
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
