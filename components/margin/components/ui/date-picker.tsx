"use client";

import * as React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/** Props for `DatePicker`: a controlled single date. */
export interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Margin DatePicker: the grey filled field that opens the calendar in the
 * shared paper panel. The picked day is solid oxblood.
 */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onValueChange, placeholder = "Pick a date", className, disabled }, ref) => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          data-slot="date-picker-trigger"
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "items-center gap-2 text-left",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <Icon icon="solar:calendar-linear" className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onValueChange} autoFocus />
      </PopoverContent>
    </Popover>
  ),
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
