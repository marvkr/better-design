"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for `TimePicker`: every native input prop except `type`. */
export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

/**
 * Margin TimePicker: the native time input on the grey filled field, with a
 * small clock at its start and figures set in tabular numerals.
 */
const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Icon
        icon="solar:clock-circle-linear"
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        type="time"
        data-slot="time-picker"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "pl-8 tabular-nums [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
