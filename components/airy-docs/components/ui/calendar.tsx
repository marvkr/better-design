"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "aria-disabled:pointer-events-none aria-disabled:text-(--foreground-disabled)",
);

const chevronIcons = {
  left: "feather:chevron-left",
  right: "feather:chevron-right",
  up: "feather:chevron-up",
  down: "feather:chevron-down",
} as const;

/**
 * One day's button. A single pick and the two ends of a range fill with the
 * flat green; the days between sit on the faint green band the cells draw;
 * today shows green ink until it is picked.
 */
function CalendarDayButton({ className, modifiers, ...props }: DayButtonProps) {
  const filled = modifiers.selected && !modifiers.range_middle;
  return (
    <DayButton
      modifiers={modifiers}
      data-slot="calendar-day"
      className={cn(
        className,
        modifiers.outside && "text-muted-foreground",
        modifiers.today && !modifiers.selected && "font-semibold text-(--primary-text)",
        modifiers.range_middle && "text-(--primary-text) hover:bg-transparent",
        filled &&
          "bg-primary font-medium text-primary-foreground hover:bg-(--primary-hover)",
        modifiers.disabled && "text-(--foreground-disabled)",
      )}
      {...props}
    />
  );
}

/**
 * Airy docs Calendar: a month of 2.25rem days with 0.5rem corners on the
 * page colour, captioned in semibold Inter. The picked day takes the flat
 * green, a range runs between its two green ends on a faint green band, and
 * today is set in green ink. Month arrows are ghost pills.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-3",
        month_caption: "flex h-8 items-center justify-center",
        caption_label:
          "inline-flex items-center gap-1 text-sm font-semibold text-foreground [&_svg]:size-3.5 [&_svg]:text-muted-foreground",
        dropdowns: "flex items-center gap-2",
        dropdown_root:
          "relative inline-flex items-center rounded-md px-1.5 hover:bg-secondary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        nav: "absolute inset-x-0 top-0 flex h-8 items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-xs font-medium text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center",
        day_button: cn(
          "inline-flex size-9 items-center justify-center rounded-md text-sm tabular-nums text-foreground",
          "transition-[background-color,color] duration-fast ease-out",
          "hover:bg-secondary",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring",
          "disabled:pointer-events-none",
        ),
        range_start: "rounded-s-md bg-(--primary-wash)",
        range_end: "rounded-e-md bg-(--primary-wash)",
        range_middle: "bg-(--primary-wash) first:rounded-s-md last:rounded-e-md",
        outside: "text-muted-foreground",
        disabled: "text-(--foreground-disabled)",
        hidden: "invisible",
        week_number: "w-9 text-xs text-muted-foreground",
        footer: "pt-3 text-sm text-muted-foreground",
        ...classNames,
      }}
      components={{
        Chevron: ({
          orientation = "left",
          className: chevronClassName,
        }: {
          orientation?: keyof typeof chevronIcons;
          className?: string;
        }) => (
          <Icon
            icon={chevronIcons[orientation]}
            aria-hidden="true"
            className={cn("size-4", chevronClassName)}
          />
        ),
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
