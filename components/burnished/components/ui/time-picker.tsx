"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for `TimePicker`: every native input prop except `type`. */
export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

/**
 * Burnished TimePicker: the native time input on a graphite bevel field,
 * with a clock glyph set into its leading edge.
 */
const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Icon
        icon="ph:clock"
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        type="time"
        data-slot="time-picker"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "pl-10 tabular-nums [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
