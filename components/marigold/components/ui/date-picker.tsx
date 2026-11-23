"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// DatePicker: recessed-well trigger (the form-field material,
// matching Input and Select) opening the calendar pop surface.

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  className,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(value);
  const date = value ?? internalDate;

  React.useEffect(() => {
    setInternalDate(value);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            formFieldBase,
            "flex h-9 w-[15rem] items-center justify-start rounded-lg px-3 py-2 text-left text-sm font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(next) => {
            setInternalDate(next);
            onChange?.(next);
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
export type { DatePickerProps };
