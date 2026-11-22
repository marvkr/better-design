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
        "p-4 backdrop-blur-xl bg-foreground/[0.06] rounded-2xl border border-border shadow-[inset_0_0_0.5rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
        className
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground/90",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "absolute left-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-full",
          "backdrop-blur-md bg-foreground/[0.08] border border-border",
          "text-foreground/60 transition-all duration-base",
          "hover:bg-foreground/[0.14] hover:text-foreground hover:shadow-[0_0_0.75rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
        ),
        button_next: cn(
          "absolute right-1 inline-flex items-center justify-center",
          "h-7 w-7 rounded-full",
          "backdrop-blur-md bg-foreground/[0.08] border border-border",
          "text-foreground/60 transition-all duration-base",
          "hover:bg-foreground/[0.14] hover:text-foreground hover:shadow-[0_0_0.75rem_color-mix(in_oklch,var(--halo)_8%,transparent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-foreground/40 rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected])]:bg-primary/15 [&:has([aria-selected])]:backdrop-blur-sm",
          "first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 p-0 rounded-full font-normal text-foreground/80",
          "transition-all duration-base",
          "hover:bg-foreground/[0.08] hover:text-foreground hover:shadow-[0_0_0.75rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40",
          "aria-selected:opacity-100"
        ),
        selected: cn(
          "[&_button]:bg-primary [&_button]:text-primary-foreground [&_button]:font-medium",
          "[&_button]:shadow-[0_0_1rem_color-mix(in_oklch,var(--primary)_40%,transparent)]",
          "[&_button]:hover:brightness-110 [&_button]:hover:text-primary-foreground",
          "[&_button]:focus:bg-primary [&_button]:focus:text-primary-foreground"
        ),
        today: cn(
          "[&_button]:bg-foreground/[0.08] [&_button]:text-foreground [&_button]:border [&_button]:border-border"
        ),
        outside: "text-foreground/20 opacity-50",
        disabled: "text-foreground/20 opacity-30",
        range_middle:
          "aria-selected:bg-primary/15 aria-selected:text-foreground/90",
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
