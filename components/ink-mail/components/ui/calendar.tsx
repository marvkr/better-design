"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "rounded-md aria-disabled:pointer-events-none aria-disabled:text-(--foreground-disabled)",
);

const chevronIcons = {
  left: "ph:caret-left",
  right: "ph:caret-right",
  up: "ph:caret-up",
  down: "ph:caret-down",
} as const;

/**
 * One day's button. A single pick and the two ends of a range take the
 * off-white primary fill with black ink; the days between sit on the white
 * wash band the cells draw; today carries a hairline ring until it is picked.
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
        modifiers.today && !modifiers.selected && "border border-(--line-strong) font-medium",
        modifiers.range_middle && "hover:bg-transparent",
        filled &&
          "bg-primary font-medium text-primary-foreground hover:bg-(--primary-hover)",
        modifiers.disabled && "text-(--foreground-disabled)",
      )}
      {...props}
    />
  );
}

/**
 * Ink mail Calendar: a month of 2.25rem days with a 0.5rem corner on the
 * black page. The picked day is the off-white fill, a range runs between its
 * two filled ends on the white wash, and today wears a hairline ring. Month
 * arrows are ghost icon buttons.
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
          "inline-flex items-center gap-1 text-sm font-medium text-foreground [&_svg]:size-3.5 [&_svg]:text-muted-foreground",
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
          "inline-flex size-9 items-center justify-center rounded-md text-sm tabular-nums text-(--foreground-secondary)",
          "transition-colors duration-fast ease-out",
          "hover:bg-secondary hover:text-foreground",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring",
          "disabled:pointer-events-none",
        ),
        range_start: "rounded-s-md bg-(--wash)",
        range_end: "rounded-e-md bg-(--wash)",
        range_middle: "bg-(--wash) text-foreground first:rounded-s-md last:rounded-e-md",
        outside: "text-muted-foreground",
        disabled: "text-(--foreground-disabled)",
        hidden: "invisible",
        week_number: "w-9 font-mono text-xs text-muted-foreground",
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
