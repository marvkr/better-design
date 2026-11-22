"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { primaryFace, focusRing, raisedSurface } from "./_shared";

/** Props for `Calendar`: everything react-day-picker's DayPicker accepts. */
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  raisedSurface,
  "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
  focusRing,
  "aria-disabled:pointer-events-none aria-disabled:opacity-40",
);

const chevronIcons = {
  left: "mingcute:left-line",
  right: "mingcute:right-line",
  up: "mingcute:up-line",
  down: "mingcute:down-line",
} as const;

/**
 * One day. A single pick and both ends of a range take the teal fill of the
 * primary Button; days between sit on the grey band the cells draw. Today,
 * until picked, is set in semibold primary teal text.
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
        modifiers.range_middle && "rounded-none hover:bg-transparent",
        filled && cn(primaryFace, "font-medium hover:bg-primary/88"),
        modifiers.disabled && "opacity-40",
      )}
      {...props}
    />
  );
}

/**
 * Paddock Calendar: a month of 2.25rem round days in tabular figures. Month
 * arrows are small rounded buttons, a hovered day turns light grey and the
 * picked day takes the teal fill.
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
        month_caption: "flex h-7 items-center justify-center",
        caption_label: "inline-flex items-center gap-1 text-sm font-semibold text-foreground [&_svg]:size-3.5",
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative inline-flex items-center rounded-md px-2 has-focus-visible:ring-2 has-focus-visible:ring-ring",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        nav: "absolute inset-x-0 top-0 flex h-7 items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-xs font-medium text-muted-foreground",
        week: "mt-0.5 flex w-full",
        day: "relative size-9 p-0 text-center",
        day_button: cn(
          "inline-flex size-9 items-center justify-center rounded-md text-sm tabular-nums text-foreground",
          "transition-colors duration-fast ease-out hover:bg-accent",
          focusRing,
          "disabled:pointer-events-none",
        ),
        range_start: "rounded-s-full bg-accent",
        range_end: "rounded-e-full bg-accent",
        range_middle: "bg-accent",
        outside: "text-muted-foreground",
        disabled: "opacity-40",
        hidden: "invisible",
        week_number: "w-9 text-xs text-muted-foreground",
        footer: "pt-3 text-[0.8125rem] text-muted-foreground",
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
          <Icon icon={chevronIcons[orientation]} aria-hidden="true" className={cn("size-4", chevronClassName)} />
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
