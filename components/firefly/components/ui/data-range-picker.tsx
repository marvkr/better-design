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
 * Firefly DataRangePicker: a warm field-shaped trigger that opens two months
 * side by side on a floating white panel. The first and last days glow in
 * the primary material and the days between sit on a pale yellow-green band.
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
            "w-72 items-center gap-2 text-start data-[state=open]:border-(--accent-line)",
            !label && "text-muted-foreground",
          )}
        >
          <Icon
            icon="carbon:calendar"
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground"
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
