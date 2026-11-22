"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for `TimePicker`: every native input prop except `type`. */
export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

/**
 * Paddock TimePicker: the native time input on the white field, with a
 * clock icon at its leading edge and tabular figures.
 */
const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Icon
        icon="mingcute:time-line"
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        type="time"
        data-slot="time-picker"
        className={cn(formFieldBase, formFieldSingleLine, "pl-10 tabular-nums", className)}
        {...props}
      />
    </div>
  ),
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
