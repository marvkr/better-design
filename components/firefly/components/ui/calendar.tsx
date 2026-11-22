"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "text-(--foreground-secondary) aria-disabled:pointer-events-none aria-disabled:text-(--foreground-disabled)",
);

const chevronIcons = {
  left: "carbon:chevron-left",
  right: "carbon:chevron-right",
  up: "carbon:chevron-up",
  down: "carbon:chevron-down",
} as const;

/**
 * One day's round button. A single pick and the two ends of a range wear the
 * lit primary material; the days between sit flat on the pale accent band
 * that the cells draw; today carries the wash and a heavier weight until it
 * is picked.
 */
function CalendarDayButton({ className, modifiers, ...props }: DayButtonProps) {
  const lit = modifiers.selected && !modifiers.range_middle;
  return (
    <DayButton
      modifiers={modifiers}
      data-slot="calendar-day"
      className={cn(
        className,
        modifiers.outside && "text-muted-foreground",
        modifiers.today && !modifiers.selected && "bg-(--accent-wash) font-semibold",
        modifiers.range_middle && "hover:bg-transparent",
        lit &&
          "bg-primary bg-(image:--gradient-primary) font-medium text-primary-foreground shadow-(--shadow-control) hover:bg-primary",
        modifiers.disabled && "text-(--foreground-disabled)",
      )}
      {...props}
    />
  );
}

/**
 * Firefly Calendar: a month of round 2.25rem days on the page colour. The
 * picked day glows in the primary button's material, a range runs between
 * its two lit ends on a pale yellow-green band, and today is marked with
 * the same wash. Month arrows are round ghost buttons.
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
          "relative inline-flex items-center rounded-md px-1.5 hover:bg-secondary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
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
          "inline-flex size-9 items-center justify-center rounded-full text-sm tabular-nums text-foreground",
          "transition-[background-color,color] duration-fast ease-out",
          "hover:bg-secondary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "disabled:pointer-events-none",
        ),
        range_start: "rounded-s-full bg-(--accent-wash)",
        range_end: "rounded-e-full bg-(--accent-wash)",
        range_middle: "bg-(--accent-wash) first:rounded-s-full last:rounded-e-full",
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
