"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DataRangePicker() {
  const [range, setRange] = React.useState<DateRange | undefined>();

  const label = range?.from
    ? range.to
      ? `${format(range.from, "d MMM")} to ${format(range.to, "d MMM yyyy")}`
      : format(range.from, "d MMM yyyy")
    : "Pick a range";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-72 justify-start gap-2 font-normal",
            !range?.from && "text-muted-foreground",
          )}
        >
          <CalendarDays />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
        />
      </PopoverContent>
    </Popover>
  );
}
