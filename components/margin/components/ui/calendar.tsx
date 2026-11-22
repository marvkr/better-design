"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { oxFace, focusRing } from "./_shared";

/** Props for Calendar: everything the day picker accepts. */
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  "inline-flex size-7 items-center justify-center rounded-lg bg-card text-foreground shadow-sm",
  "transition duration-fast ease-(--ease-out) hover:bg-muted",
  focusRing,
  "aria-disabled:pointer-events-none aria-disabled:opacity-40",
);

const chevronIcons = {
  left: "solar:alt-arrow-left-linear",
  right: "solar:alt-arrow-right-linear",
  up: "solar:alt-arrow-up-linear",
  down: "solar:alt-arrow-down-linear",
} as const;

/**
 * One day. A single pick and both ends of a range take the solid oxblood; days
 * between sit on the soft oxblood band the cells draw. Today, until picked, is
 * set in oxblood text.
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
        modifiers.today && !filled && "font-semibold text-(--primary-text)",
        modifiers.range_middle && "rounded-none text-(--mark-foreground) hover:bg-transparent",
        filled && cn(oxFace, "font-medium"),
        modifiers.disabled && "opacity-40",
      )}
      {...props}
    />
  );
}

/**
 * Margin Calendar: a compact month of 2rem days in tabular figures. Month
 * arrows are small paper tabs; the picked day is solid oxblood and a range
 * runs on the pale oxblood mark.
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
        month: "flex flex-col gap-2.5",
        month_caption: "flex h-7 items-center justify-center",
        caption_label: "inline-flex items-center gap-1 text-sm font-medium text-foreground [&_svg]:size-3.5",
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative inline-flex items-center rounded-md px-1.5 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        nav: "absolute inset-x-0 top-0 flex h-7 items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-8 text-xs font-medium text-muted-foreground",
        week: "mt-0.5 flex w-full",
        day: "relative size-8 p-0 text-center",
        day_button: cn(
          "inline-flex size-8 items-center justify-center rounded-md text-sm tabular-nums text-foreground",
          "transition-colors duration-fast ease-(--ease-out) hover:bg-(--field)",
          focusRing,
          "disabled:pointer-events-none",
        ),
        range_start: "rounded-s-md bg-(--mark)",
        range_end: "rounded-e-md bg-(--mark)",
        range_middle: "bg-(--mark)",
        outside: "text-muted-foreground",
        disabled: "opacity-40",
        hidden: "invisible",
        week_number: "w-8 text-xs text-muted-foreground",
        footer: "pt-2.5 text-xs text-muted-foreground",
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
          <Icon icon={chevronIcons[orientation]} aria-hidden="true" className={cn("size-3.5", chevronClassName)} />
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
