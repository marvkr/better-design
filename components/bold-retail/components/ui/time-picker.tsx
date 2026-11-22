"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface TimePickerProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {}

/**
 * Bold retail TimePicker: the white checkout field holding a native time
 * input in tabular figures, for a pickup slot. The browser's own clock glyph
 * is hidden; a black clock sits at the start and opens the browser's list.
 */
const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, disabled, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // SAFETY: inputRef is attached to the input this component always renders,
    // so it is set by the time a parent can reach the handle.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const openPicker = () => {
      const input = inputRef.current;
      if (!input || disabled) return;
      input.focus();
      try {
        input.showPicker?.();
      } catch {
        // Some browsers refuse showPicker outside a direct press; typing still works.
      }
    };

    return (
      <div data-slot="time-picker" className="relative">
        <button
          type="button"
          onClick={openPicker}
          disabled={disabled}
          tabIndex={-1}
          aria-label="Choose a time"
          className="absolute start-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors duration-fast ease-out hover:bg-secondary disabled:pointer-events-none disabled:text-(--foreground-disabled)"
        >
          <Icon icon="mingcute:time-line" className="size-5" aria-hidden="true" />
        </button>
        <input
          ref={inputRef}
          type="time"
          disabled={disabled}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "ps-11 tabular-nums [&::-webkit-calendar-picker-indicator]:hidden",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
