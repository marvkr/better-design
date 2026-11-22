"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * The look both month arrows share. react-day-picker 9 draws the arrows beside
 * the months, not inside the caption, so the nav sits on the caption's centre
 * line (its 0.25rem top padding plus half the 1.25rem text line) and each
 * arrow centres on the month name as before.
 */
const navButton = cn(
  "inline-flex items-center justify-center",
  "h-7 w-7 rounded-full",
  "backdrop-blur-md bg-white/[0.08] border border-white/10",
  "text-white/60 transition-all duration-base",
  "hover:bg-white/[0.14] hover:text-white hover:shadow-[0_0_0.75rem_oklch(1_0_0/0.08)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.19_250)]/40"
)

/**
 * The look of a day in each state. react-day-picker 9 puts its own state
 * classes on the table cell; these style the button, so CalendarDayButton
 * sets them there.
 */
const dayState = {
  selected: cn(
    "bg-[oklch(0.65_0.19_250)] text-white font-medium",
    "shadow-[0_0_1rem_color-mix(in_oklch,var(--primary)_40%,transparent)]",
    "hover:bg-[oklch(0.70_0.17_250)] hover:text-white",
    "focus:bg-[oklch(0.65_0.19_250)] focus:text-white"
  ),
  today: cn(
    "bg-white/[0.08] text-white border border-white/10"
  ),
  outside: "text-white/20 opacity-50",
  disabled: "text-white/20 opacity-30",
  range_middle:
    "data-[selected=true]:bg-[oklch(0.65_0.19_250)]/15 data-[selected=true]:text-white/90",
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
      className={cn(
        "p-4 backdrop-blur-xl bg-white/[0.06] rounded-2xl border border-white/10 shadow-[inset_0_0_0.5rem_oklch(1_0_0/0.08)]",
        className
      )}
      classNames={{
        months:
          "relative flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 items-center",
        caption_label: "text-sm font-medium text-white/90",
        nav: "absolute left-0 top-3.5 w-full space-x-1 flex items-center",
        button_previous: cn(navButton, "absolute left-1"),
        button_next: cn(navButton, "absolute right-1"),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-white/40 rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([data-selected=true])]:bg-[oklch(0.65_0.19_250)]/15 [&:has([data-selected=true])]:backdrop-blur-sm",
          "first:[&:has([data-selected=true])]:rounded-l-full last:[&:has([data-selected=true])]:rounded-r-full",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 p-0 rounded-full font-normal text-white/80",
          "transition-all duration-base",
          "hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_0.75rem_oklch(1_0_0/0.06)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.19_250)]/40",
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
