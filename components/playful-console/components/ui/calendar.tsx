"use client";

import * as React from "react";
import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/** Props for Calendar: everything DayPicker accepts. */
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const navButton = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "text-(--foreground-secondary) aria-disabled:pointer-events-none aria-disabled:text-(--foreground-disabled)",
);

const chevronIcons = {
  left: "ph:caret-left-bold",
  right: "ph:caret-right-bold",
  up: "ph:caret-up-bold",
  down: "ph:caret-down-bold",
} as const;

/**
 * One day's square button. A single pick and the two ends of a range become
 * the orange key with its rim and slab; the days between sit flat on the
 * orange wash that the cells draw; today carries a firm olive edge and a
 * heavier weight until it is picked.
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
        modifiers.today && !modifiers.selected && "border-(--line-strong) bg-card font-bold",
        modifiers.range_middle && "hover:bg-transparent",
        picked &&
          "border-(--primary-rim) bg-primary font-bold text-primary-foreground shadow-(--shadow-control) hover:bg-primary",
        modifiers.disabled && "text-(--foreground-disabled)",
      )}
      {...props}
    />
  );
}

/**
 * Playful console Calendar: a month of square 2.25rem days with 0.25rem
 * corners. The picked day becomes the orange key, a range runs between its
 * two orange ends on the pale orange wash, and today wears a firm olive
 * edge. Month arrows are flat ghost buttons.
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
          "inline-flex items-center gap-1 text-sm font-extrabold tracking-tight text-foreground [&_svg]:size-3.5 [&_svg]:text-muted-foreground",
        dropdowns: "flex items-center gap-2",
        dropdown_root:
          "relative inline-flex items-center rounded-md px-1.5 hover:bg-secondary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        nav: "absolute inset-x-0 top-0 flex h-8 items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-xs font-bold uppercase text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center",
        day_button: cn(
          "inline-flex size-9 items-center justify-center rounded-md border-[0.09375rem] border-transparent font-mono text-sm tabular-nums text-foreground",
          "transition-[background-color,color,border-color] duration-fast ease-out",
          "hover:bg-secondary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "disabled:pointer-events-none",
        ),
        range_start: "rounded-s-md bg-(--primary-wash)",
        range_end: "rounded-e-md bg-(--primary-wash)",
        range_middle: "bg-(--primary-wash) first:rounded-s-md last:rounded-e-md",
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
