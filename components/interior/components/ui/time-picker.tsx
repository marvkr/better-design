"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/*
 * Interior TimePicker — the shared field recipe with a clock seated at the
 * left edge. Rest is a recessed well; focus lifts it to the surface with an
 * accent border, per _shared.ts.
 */

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Clock
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={ref}
        type="time"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "pl-9 tabular-nums [&::-webkit-calendar-picker-indicator]:opacity-60",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
