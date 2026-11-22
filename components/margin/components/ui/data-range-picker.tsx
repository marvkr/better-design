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
  if (!value.to) return format(value.from, "LLL d, y");
  return `${format(value.from, "LLL d, y")} to ${format(value.to, "LLL d, y")}`;
}

/**
 * Margin DateRangePicker: the grey filled field that opens two months in
 * the shared paper panel. Both ends of the range are solid oxblood and the
 * days between sit on the pale oxblood mark.
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
            "items-center gap-2 text-left",
            !value?.from && "text-muted-foreground",
            className,
          )}
        >
          <Icon icon="solar:calendar-linear" className="size-4 shrink-0 text-muted-foreground" aria-hidden />
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
