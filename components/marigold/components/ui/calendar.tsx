"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

// Talentboard Calendar: quiet grid; selected day wears the raised orange material.

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4 relative",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-0 z-10 flex items-center justify-between px-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "w-9 rounded-md text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground",
        week: "flex w-full mt-2",
        day: cn(
          "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-transparent"
        ),
        day_button: cn(
          "h-9 w-9 rounded-lg p-0 font-normal text-foreground",
          "transition-colors duration-fast hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          "aria-selected:opacity-100"
        ),
        selected:
          "[&>button]:bg-[image:var(--tb-primary-gradient)] [&>button]:text-primary-foreground [&>button]:shadow-[var(--tb-shadow-primary-sm)] [&>button]:hover:bg-[image:var(--tb-primary-gradient)]",
        today: "[&>button]:border [&>button]:border-ring/40 [&>button]:font-medium",
        outside: "[&>button]:text-muted-foreground/50",
        disabled: "[&>button]:text-muted-foreground/40 [&>button]:pointer-events-none",
        range_middle: "[&>button]:bg-accent [&>button]:text-foreground [&>button]:shadow-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...chevronProps} />
          ) : (
            <ChevronRight className="h-4 w-4" {...chevronProps} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
