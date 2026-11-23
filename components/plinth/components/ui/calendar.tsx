"use client"

import * as React from "react"
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/*
 * Plinth Calendar: a month set on the panel. Weekday heads are mono caps
 * readouts; days are quiet tool buttons. A picked day takes the ember
 * Button material, a range runs through a recessed well between its ends,
 * and today wears a graphite chip.
 */

const navButton = cn(
  buttonVariants({ variant: "secondary", size: "icon-sm" }),
  "size-7 rounded-md p-0 text-muted-foreground hover:text-foreground"
)

const dayState = {
  today: "bg-secondary text-foreground [box-shadow:var(--shadow-button)]",
  outside: "text-muted-foreground/60",
  disabled: "text-muted-foreground/40 line-through",
  selected:
    "[background:var(--ember-gradient)] text-primary-foreground [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.4),0_0_0_0.0625rem_var(--ember-rim)] hover:bg-transparent hover:text-primary-foreground",
  range_start: "rounded-r-sm",
  range_end: "rounded-l-sm",
  range_middle:
    "rounded-none bg-transparent [background:none] [box-shadow:none] text-foreground hover:text-foreground",
}

function CalendarDayButton({ className, modifiers, ...props }: DayButtonProps) {
  return (
    <DayButton
      modifiers={modifiers}
      data-selected={modifiers.selected || undefined}
      data-range-middle={modifiers.range_middle || undefined}
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
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-3",
        month_caption: "flex h-7 items-center justify-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 pb-1 font-mono text-[0.6875rem] font-normal uppercase text-muted-foreground",
        week: "mt-1 flex w-full",
        day: cn(
          "relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([data-range-middle])]:bg-input [&:has([data-range-middle])]:[box-shadow:var(--shadow-inset)]"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-9 rounded-md p-0 text-sm font-normal text-foreground"
        ),
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }: { orientation?: string }) =>
          orientation === "left" ? <ChevronLeftIcon className="size-4" /> : <ChevronRightIcon className="size-4" />,
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

// feather:chevron-left
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" />
    </svg>
  )
}

// feather:chevron-right
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 18l6-6l-6-6" />
    </svg>
  )
}

export { Calendar }
