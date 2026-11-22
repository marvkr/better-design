"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { creamBevel, focusRing, raisedBevel } from "./_shared";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  raisedBevel,
  "inline-flex size-8 items-center justify-center rounded-full",
  focusRing,
  "aria-disabled:pointer-events-none aria-disabled:opacity-40",
);

const chevronIcons = {
  left: "ph:caret-left",
  right: "ph:caret-right",
  up: "ph:caret-up",
  down: "ph:caret-down",
} as const;

/**
 * One day. A single pick and both ends of a range wear the cream bevel, the
 * primary's own face; days between sit on the accent band the cells draw.
 * Today, until picked, carries a ring of the glow.
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
        modifiers.today && !filled && "font-semibold ring-2 ring-glow ring-inset",
        modifiers.range_middle && "rounded-none [@media(hover:hover)_and_(pointer:fine)]:hover:bg-transparent",
        filled && cn(creamBevel, "font-semibold [@media(hover:hover)_and_(pointer:fine)]:hover:bg-(image:--fill-primary-hover)"),
        modifiers.disabled && "opacity-40",
      )}
      {...props}
    />
  );
}

/**
 * Burnished Calendar: a month of 2.25rem round days set in tabular figures.
 * Month arrows are small graphite bevels. Rows light to the accent under a
 * fine pointer, the picked day takes the cream bevel and today is ringed in
 * the glow.
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
        caption_label: "inline-flex items-center gap-1 text-sm font-semibold text-foreground [&_svg]:size-3.5",
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative inline-flex items-center rounded-full px-2 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        nav: "absolute inset-x-0 top-0 flex h-8 items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-xs font-semibold text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center",
        day_button: cn(
          "inline-flex size-9 items-center justify-center rounded-full text-sm tabular-nums text-foreground",
          "transition-colors duration-fast ease-(--ease-out)",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent",
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
