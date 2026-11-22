"use client";

import * as React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Bold retail DatePicker: the white checkout field with a calendar icon, the
 * way a delivery or pickup date is chosen. It opens the calendar on the white
 * floating panel; picking a day fills the field and closes the panel.
 */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onValueChange, placeholder = "Pick a date", className, disabled }, ref) => {
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
              "items-center gap-3 text-start data-[state=open]:border-foreground",
              !value && "text-muted-foreground",
              className,
            )}
          >
            <Icon
              icon="mingcute:calendar-line"
              aria-hidden="true"
              className="size-5 shrink-0 text-foreground"
            />
            <span className="truncate">{value ? format(value, "d MMMM yyyy") : placeholder}</span>
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
