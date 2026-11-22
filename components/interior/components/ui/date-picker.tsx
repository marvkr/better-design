"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/*
 * Interior DatePicker — an outline trigger that opens the calendar in a
 * popover. The trigger is a field-shaped button; the value it holds is a
 * date, so an empty one reads muted like a placeholder.
 */

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) => {
  const [internal, setInternal] = React.useState<Date | undefined>(value);
  const selected = value ?? internal;

  const handleSelect = (date: Date | undefined) => {
    setInternal(date);
    onChange?.(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-56 justify-start gap-2 font-normal",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <CalendarDays strokeWidth={1.5} />
          {selected ? format(selected, "d MMMM yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selected} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
};
DatePicker.displayName = "DatePicker";

export { DatePicker };
