"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

// Amber Glass Calendar: glass month grid; the selected day carries the
// amber primary material.

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * The look both month arrows share. react-day-picker 9 draws the arrows beside
 * the months, not inside the caption, so the nav sits on the caption's centre
 * line (its 0.25rem top padding plus half the 1.25rem text line) and each
 * arrow centres on the month name as before.
 */
const navButton = cn(
  buttonVariants({ variant: "ghost" }),
  "h-7 w-7 p-0 border border-[color:var(--ag-border)] text-muted-foreground hover:text-foreground"
)

/**
 * The look of a day in each state. react-day-picker 9 puts its own state
 * classes on the table cell; these style the button, so CalendarDayButton
 * sets them there.
 */
const dayState = {
  selected:
    "bg-[image:var(--ag-primary-grad)] text-primary-foreground shadow-[var(--shadow-primary)] hover:brightness-105 focus:brightness-105",
  today: "border border-[color:oklch(0.69_0.195_42/0.45)] text-primary",
  outside: "text-muted-foreground opacity-40",
  disabled: "text-muted-foreground opacity-40",
  range_middle:
    "data-[selected=true]:bg-[var(--ag-fill-hover)] data-[selected=true]:text-foreground data-[selected=true]:shadow-none",
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
        modifiers.range_middle && dayState.range_middle,
      )}
      {...props}
    />
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 items-center",
        caption_label: "text-sm font-bold tracking-[-0.01em]",
        nav: "absolute left-0 top-3.5 w-full space-x-1 flex items-center",
        button_previous: cn(navButton, "absolute left-1"),
        button_next: cn(navButton, "absolute right-1"),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-semibold text-[0.7rem] uppercase tracking-wide",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([data-selected=true])]:bg-[var(--ag-fill)] first:[&:has([data-selected=true])]:rounded-l-md last:[&:has([data-selected=true])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          "h-9 w-9 p-0 font-medium rounded-md transition-colors",
          "hover:bg-[var(--ag-fill-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          "data-[selected=true]:opacity-100"
        ),
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <Icon icon="tabler:chevron-left" className="h-4 w-4" />
          ) : (
            <Icon icon="tabler:chevron-right" className="h-4 w-4" />
          ),
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
