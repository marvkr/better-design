"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { formFieldBase } from "./_shared";

// Talentboard TimePicker: recessed-well trigger (the form-field material,
// matching Input and Select) with a scrollable time list on the shared pop
// surface.

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const TIMES = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${String(hours).padStart(2, "0")}:${minutes}`;
});

function TimePicker({ value, onChange, disabled, className }: TimePickerProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(value);
  const [open, setOpen] = React.useState(false);
  const selected = value ?? internalValue;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            formFieldBase,
            "flex h-9 w-[8.75rem] items-center justify-start rounded-lg px-3 py-2 text-left text-sm font-normal tabular-nums",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          {selected ?? "Pick a time"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[8.75rem] p-1">
        <div className="max-h-60 overflow-y-auto">
          {TIMES.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                setInternalValue(time);
                onChange?.(time);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center rounded-md px-2 py-1.5 text-sm tabular-nums transition-colors",
                time === selected
                  ? "bg-[image:var(--tb-primary-gradient)] text-primary-foreground shadow-[var(--tb-shadow-primary-sm)]"
                  : "text-foreground hover:bg-accent"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { TimePicker };
export type { TimePickerProps };
