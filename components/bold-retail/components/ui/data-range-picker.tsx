"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/** Writes a range as "4 Oct to 12 Oct 2026", or one date while only the start is set. */
function describeRange(range: DateRange | undefined): string | null {
  if (!range?.from) return null;
  if (!range.to) return format(range.from, "d MMM yyyy");
  return `${format(range.from, "d MMM")} to ${format(range.to, "d MMM yyyy")}`;
}

/**
 * Bold retail DataRangePicker: the white checkout field that opens two months
 * side by side on the white floating panel. The first and last days are black
 * circles and the days between sit on a soft grey band.
 */
export function DataRangePicker() {
  const [range, setRange] = React.useState<DateRange | undefined>();
  const label = describeRange(range);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="data-range-picker"
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "w-72 items-center gap-3 text-start data-[state=open]:border-foreground",
            !label && "text-muted-foreground",
          )}
        >
          <Icon
            icon="mingcute:calendar-line"
            aria-hidden="true"
            className="size-5 shrink-0 text-foreground"
          />
          <span className="truncate">{label ?? "Pick a date range"}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
          defaultMonth={range?.from}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
