"use client";

import * as React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Midnight Glass Date Range Picker: glass pill trigger with range display, glass calendar panel

interface DataRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DataRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  disabled,
  className,
}: DataRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    onChange?.(range);
  };

  const displayText = React.useMemo(() => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`;
      }
      return format(date.from, "LLL dd, y");
    }
    return null;
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            "rounded-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05]",
            "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
            "text-white/90 transition duration-300",
            "hover:bg-white/[0.07] hover:border-white/[0.13]",
            "focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)] focus-visible:border-primary/50",
            !date && "text-white/40",
            className
          )}
        >
          <Icon icon="tabler:calendar" className="mr-2 h-4 w-4" />
          {displayText ?? <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto p-0 rounded-xl",
          "border border-white/[0.08] backdrop-blur-2xl bg-white/[0.07]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_6px_rgba(255,255,255,0.05)]"
        )}
      >
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
