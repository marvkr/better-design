"use client";

import * as React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/** Props for DatePicker: the controlled date and the trigger's empty text. */
export interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Playful console DatePicker: a white field-shaped trigger with a duotone
 * calendar icon that opens the calendar on a floating white card. An empty
 * trigger reads in muted ink like a placeholder; picking a day fills it in
 * mono type and closes the card. While open, the trigger keeps its blue edge.
 */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    { value, onValueChange, placeholder = "Pick a date", className, disabled },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            data-slot="date-picker"
            className={cn(
              formFieldBase,
              formFieldSingleLine,
              "items-center gap-2 text-start data-[state=open]:border-ring",
              !value && "text-muted-foreground",
              className,
            )}
          >
            <Icon
              icon="ph:calendar-blank-duotone"
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground"
            />
            <span className={cn("truncate", value && "font-mono")}>
              {value ? format(value, "d MMMM yyyy") : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date: Date | undefined) => {
              onValueChange?.(date);
              setOpen(false);
            }}
            defaultMonth={value}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
