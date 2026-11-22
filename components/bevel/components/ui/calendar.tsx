"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Calendar.
 *
 * A month grid at iOS density: 36px day cells, weekday labels on the 12.5px
 * step, and no grid lines at all. Every day is a circle, so the selected day
 * can take the primary Button's own surface, the gradient between
 * --primary-from and --primary-to over the primary shadow, and still read as a
 * dot rather than a block. A range paints its middle days in the blue tint at
 * a square radius, so the run joins up between the two round ends. The month
 * arrows are the system's circular icon buttons.
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
      className={cn("p-[1.125rem]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-5",
        month: "flex flex-col gap-3.5",
        month_caption: "relative flex h-[2.125rem] items-center justify-center",
        caption_label:
          "text-[1rem] leading-[1.375rem] font-semibold tracking-[-0.025rem] text-foreground",
        nav: "flex items-center",
        button_previous: cn(
          "absolute left-0 top-0 z-10 inline-flex size-[2.125rem] items-center justify-center",
          "rounded-full bg-card text-[var(--strong)]",
          "[box-shadow:var(--shadow-button)]",
          "transition-[box-shadow,transform] duration-fast ease-out",
          "hover:[box-shadow:var(--shadow-button-hover)] active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-40",
        ),
        button_next: cn(
          "absolute right-0 top-0 z-10 inline-flex size-[2.125rem] items-center justify-center",
          "rounded-full bg-card text-[var(--strong)]",
          "[box-shadow:var(--shadow-button)]",
          "transition-[box-shadow,transform] duration-fast ease-out",
          "hover:[box-shadow:var(--shadow-button-hover)] active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-40",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 text-[0.7813rem] leading-4 font-medium tracking-[0.0188rem] text-muted-foreground",
        week: "mt-1 flex w-full",
        day: cn(
          "relative size-9 p-0 text-center",
          "focus-within:relative focus-within:z-20",
        ),
        day_button: cn(
          "inline-flex size-9 items-center justify-center rounded-full",
          "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-foreground",
          "transition-[background-color,box-shadow,color] duration-fast ease-out",
          "hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ),
        /* The selected day takes the primary Button's surface, at a circle. */
        selected: cn(
          "[&_button]:font-semibold [&_button]:text-primary-foreground",
          /* The solid fill sits under the gradient, so the circle keeps a
             real background-color if the gradient never paints. */
          "[&_button]:bg-primary",
          "[&_button]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
          "[&_button]:[box-shadow:var(--shadow-primary)]",
          "[&_button]:hover:bg-[linear-gradient(180deg,var(--primary-hover-from)_0%,var(--primary-hover-to)_100%)]",
        ),
        /* Today reads in the accent until it is the day you picked. */
        today: cn(
          "[&_button:not([aria-selected])]:bg-[var(--inner)]",
          "[&_button:not([aria-selected])]:font-semibold",
          "[&_button:not([aria-selected])]:text-primary",
        ),
        outside: cn(
          "[&_button:not([aria-selected])]:text-muted-foreground",
          "[&_button:not([aria-selected])]:opacity-45",
        ),
        disabled: "[&_button]:text-muted-foreground [&_button]:opacity-40",
        /* The middle of a range squares off, so the run joins its round ends. */
        range_middle: cn(
          "[&_button]:aria-selected:rounded-none [&_button]:aria-selected:bg-none",
          "[&_button]:aria-selected:bg-[var(--pop-blue)]",
          "[&_button]:aria-selected:font-medium [&_button]:aria-selected:text-[var(--pop-blue-foreground)]",
          "[&_button]:aria-selected:[box-shadow:none]",
          "[&_button]:aria-selected:hover:bg-none [&_button]:aria-selected:hover:bg-[var(--pop-blue)]",
        ),
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) => (
          <Icon
            icon={
              orientation === "left" ? "solar:alt-arrow-left-linear"
              : orientation === "right" ? "solar:alt-arrow-right-linear"
              : orientation === "up" ? "solar:alt-arrow-up-linear"
              : "solar:alt-arrow-down-linear"
            }
            className={cn("size-[1.0625rem]", chevronClassName)}
          />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
