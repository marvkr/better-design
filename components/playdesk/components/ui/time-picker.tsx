"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Clock
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        type="time"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "pl-10 [&::-webkit-calendar-picker-indicator]:opacity-60",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
