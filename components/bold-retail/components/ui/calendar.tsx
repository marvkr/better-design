"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  buttonVariants({ variant: "secondary", size: "icon-sm" }),
  "aria-disabled:pointer-events-none aria-disabled:text-(--foreground-disabled)",
);

const chevronIcons = {
  left: "mingcute:left-line",
  right: "mingcute:right-line",
  up: "mingcute:up-line",
  down: "mingcute:down-line",
} as const;

/**
 * One day's round button. A single pick and the two ends of a range are a
 * black circle with white figures; the days between sit on the soft grey
 * band the cells draw; today carries a hairline ring until it is picked.
 */
function CalendarDayButton({ className, modifiers, ...props }: DayButtonProps) {
  const picked = modifiers.selected && !modifiers.range_middle;
  return (
    <DayButton
      modifiers={modifiers}
      data-slot="calendar-day"
      className={cn(
        className,
        modifiers.outside && "text-muted-foreground",
        modifiers.today && !modifiers.selected && "font-semibold ring-1 ring-inset ring-foreground",
        modifiers.range_middle && "hover:bg-(--secondary-hover)",
        picked && "bg-primary font-medium text-primary-foreground hover:bg-(--primary-hover)",
        modifiers.disabled && "text-(--foreground-disabled)",
      )}
      {...props}
    />
  );
}

/**
 * Bold retail Calendar: a month of round 2.5rem days on white. The picked day
 * is a black circle, a range runs between its two black ends on a soft grey
 * band, and today carries a hairline ring. Month arrows are grey circle buttons.
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
      className={cn("p-4", className)}
      classNames={{
        months: "relative flex flex-col gap-6 sm:flex-row",
        month: "flex flex-col gap-3",
        month_caption: "flex h-8 items-center justify-center",
        caption_label:
          "inline-flex items-center gap-1 text-base font-medium text-foreground [&_svg]:size-4 [&_svg]:text-foreground",
        dropdowns: "flex items-center gap-2",
        dropdown_root:
          "relative inline-flex items-center rounded-full px-2 hover:bg-secondary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        nav: "absolute inset-x-0 top-0 flex h-8 items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-10 text-xs font-medium text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-10 p-0 text-center",
        day_button: cn(
          "inline-flex size-10 items-center justify-center rounded-full text-sm tabular-nums text-foreground",
          "transition-colors duration-fast ease-out",
          "hover:bg-secondary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "disabled:pointer-events-none",
        ),
        range_start: "rounded-s-full bg-secondary",
        range_end: "rounded-e-full bg-secondary",
        range_middle: "bg-secondary first:rounded-s-full last:rounded-e-full",
        outside: "text-muted-foreground",
        disabled: "text-(--foreground-disabled)",
        hidden: "invisible",
        week_number: "w-10 text-xs text-muted-foreground",
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
