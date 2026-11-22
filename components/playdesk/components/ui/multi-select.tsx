"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

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
            "flex min-h-10 w-full items-center gap-1.5 rounded-lg px-2 py-1.5",
            "border border-border bg-input text-left text-sm",
            "[box-shadow:var(--shadow-inset)]",
            "transition-[box-shadow,border-color] duration-fast ease-out",
            "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-[0.1875rem] focus-visible:ring-ring/25",
            className,
          )}
        >
          <span className="flex flex-1 flex-wrap items-center gap-1.5">
            {selected.length === 0 ? (
              <span className="px-1.5 text-muted-foreground">{placeholder}</span>
            ) : (
              selected.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {options.find((option) => option.value === item)?.label ?? item}
                  <X
                    className="size-3 text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggle(item);
                    }}
                  />
                </span>
              ))
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Check
              className={cn(
                "size-3.5 text-primary",
                selected.includes(option.value) ? "opacity-100" : "opacity-0",
              )}
              strokeWidth={3}
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
