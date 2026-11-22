"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior Calendar — a grid of 5px-radius cells, never circles. The selected
 * day takes the primary Button's flat ink fill and thumb shadow, so picking a
 * date reads as the same material as pressing the main key. Today is not a
 * fill: it carries a small accent dot under the number — accent marks state,
 * ink marks selection. Range middles are the well tint picked out with the
 * row shadow.
 */

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-4",
        month_caption: "flex h-8 items-center justify-center",
        caption_label: "text-[0.8125rem] font-medium tracking-[-0.02em] text-foreground",
        nav: "absolute inset-x-0 top-0 flex h-8 items-center justify-between",
        button_previous: [
          "inline-flex size-7 items-center justify-center rounded-[0.375rem] text-muted-foreground",
          "transition-[background-color,color,box-shadow] duration-fast",
          "hover:bg-secondary hover:text-foreground active:translate-y-px",
          "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
        ].join(" "),
        button_next: [
          "inline-flex size-7 items-center justify-center rounded-[0.375rem] text-muted-foreground",
          "transition-[background-color,color,box-shadow] duration-fast",
          "hover:bg-secondary hover:text-foreground active:translate-y-px",
          "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
        ].join(" "),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center text-[0.8125rem]",
        day_button: [
          "relative inline-flex size-9 items-center justify-center rounded-[0.3125rem] font-normal",
          "transition-[background-color,color,box-shadow] duration-fast",
          "hover:bg-secondary",
          "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
        ].join(" "),
        selected: [
          "[&_button]:bg-primary [&_button]:text-primary-foreground",
          "[&_button]:shadow-[var(--shadow-thumb)]",
          "[&_button]:hover:bg-primary",
          "[&_button]:focus-visible:bg-primary",
          "[&_button]:focus-visible:shadow-[var(--shadow-thumb),0_0_0_0.0938rem_var(--ring-inverted)]",
          "[&_button]:after:bg-primary-foreground",
        ].join(" "),
        today: [
          "[&_button]:after:absolute [&_button]:after:bottom-[0.3125rem] [&_button]:after:left-1/2",
          "[&_button]:after:size-1 [&_button]:after:-translate-x-1/2",
          "[&_button]:after:rounded-[0.0938rem] [&_button]:after:bg-accent-foreground",
          "[&_button]:after:content-['']",
        ].join(" "),
        outside: "text-muted-foreground opacity-40",
        disabled: "text-muted-foreground opacity-40",
        range_middle: [
          "[&_button]:bg-secondary [&_button]:text-foreground",
          "[&_button]:shadow-[var(--shadow-row)]",
          "[&_button]:hover:bg-secondary",
        ].join(" "),
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" strokeWidth={1.5} {...rest} />
          ) : (
            <ChevronRight className="size-4" strokeWidth={1.5} {...rest} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
