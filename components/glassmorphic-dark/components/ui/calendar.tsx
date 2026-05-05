"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

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
        "p-4 backdrop-blur-xl bg-white/[0.06] rounded-2xl border border-white/10 shadow-[inset_0_0_8px_rgba(255,255,255,0.08)]",
        className
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-white/90",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "inline-flex items-center justify-center",
          "h-7 w-7 rounded-full",
          "backdrop-blur-md bg-white/[0.08] border border-white/10",
          "text-white/60 transition-all duration-200",
          "hover:bg-white/[0.14] hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.19_250)]/40"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-white/40 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected])]:bg-[oklch(0.65_0.19_250)]/15 [&:has([aria-selected])]:backdrop-blur-sm",
          "first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 p-0 rounded-full font-normal text-white/80",
          "transition-all duration-200",
          "hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.06)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.19_250)]/40",
          "aria-selected:opacity-100"
        ),
        day_selected: cn(
          "bg-[oklch(0.65_0.19_250)] text-white font-medium",
          "shadow-[0_0_16px_color-mix(in_oklch,var(--primary)_40%,transparent)]",
          "hover:bg-[oklch(0.70_0.17_250)] hover:text-white",
          "focus:bg-[oklch(0.65_0.19_250)] focus:text-white"
        ),
        day_today: cn(
          "bg-white/[0.08] text-white border border-white/10"
        ),
        day_outside: "text-white/20 opacity-50",
        day_disabled: "text-white/20 opacity-30",
        day_range_middle:
          "aria-selected:bg-[oklch(0.65_0.19_250)]/15 aria-selected:text-white/90",
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
