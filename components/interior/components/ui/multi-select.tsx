"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/*
 * Interior MultiSelect — the trigger is a recessed well and every committed
 * value is a filled 6px chip picked out of it with the row shadow; a chip on
 * a light field is filled, never outlined. Option rows highlight with the
 * secondary surface and mark selection with an ink tick — accent is for
 * focus, not "selected".
 */

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
  className,
}: MultiSelectProps) => {
  const [internal, setInternal] = React.useState<string[]>(value ?? []);
  const selected = value ?? internal;

  const toggle = (next: string) => {
    const updated = selected.includes(next)
      ? selected.filter((item) => item !== next)
      : [...selected, next];
    setInternal(updated);
    onChange?.(updated);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-10 w-full items-center gap-1.5 rounded-[0.625rem] px-2 py-1.5",
            "border-2 border-border bg-input text-left text-[0.8125rem]",
            "shadow-[var(--shadow-well)]",
            "transition-[background-color,border-color,box-shadow] duration-fast",
            "focus-visible:outline-none focus-visible:border-ring focus-visible:bg-card focus-visible:shadow-none",
            className,
          )}
        >
          <span className="flex flex-1 flex-wrap items-center gap-1.5">
            {selected.length === 0 ? (
              <span className="px-1 text-muted-foreground">{placeholder}</span>
            ) : (
              selected.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-[0.375rem] bg-secondary px-2 py-0.5 text-[0.7188rem] font-medium text-secondary-foreground shadow-[var(--shadow-row)]"
                >
                  {options.find((option) => option.value === item)?.label ?? item}
                  <X
                    className="size-3 text-muted-foreground transition-colors duration-fast hover:text-foreground"
                    strokeWidth={1.5}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggle(item);
                    }}
                  />
                </span>
              ))
            )}
          </span>
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              "flex w-full items-center gap-2 rounded-[0.5rem] px-2.5 py-1.5 text-left text-[0.8125rem]",
              "transition-[background-color,box-shadow] duration-fast",
              "hover:bg-secondary",
              "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
            )}
          >
            <Check
              className={cn(
                "size-3.5 text-foreground",
                selected.includes(option.value) ? "opacity-100" : "opacity-0",
              )}
              strokeWidth={2.5}
            />
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
