"use client";

import * as React from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/** Props for `DateRangePicker`: a controlled date range. */
export interface DateRangePickerProps {
  value?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function rangeLabel(value: DateRange | undefined, placeholder: string) {
  if (!value?.from) return <span>{placeholder}</span>;
  if (!value.to) return format(value.from, "d LLL y");
  return `${format(value.from, "d LLL y")} to ${format(value.to, "d LLL y")}`;
}

/**
 * Mallow DateRangePicker: a white field that opens two months on the floating
 * panel. Both ends of the range carry the violet primary finish and the days
 * between sit on a lilac band.
 */
const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ value, onValueChange, placeholder = "Pick a date range", className, disabled }, ref) => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          data-slot="date-range-picker-trigger"
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "items-center gap-2.5 text-start tabular-nums",
            !value?.from && "text-muted-foreground",
            className,
          )}
        >
          <Icon icon="iconoir:calendar" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          {rangeLabel(value, placeholder)}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onValueChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  ),
);
DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
