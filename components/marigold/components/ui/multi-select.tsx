"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { formFieldBase } from "./_shared";

// Talentboard MultiSelect: recessed trigger holding raised chips; menu on the
// shared pop surface.

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
  disabled,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string[]>(value ?? []);
  const selected = value ?? internalValue;

  const toggle = (next: string) => {
    const merged = selected.includes(next)
      ? selected.filter((v) => v !== next)
      : [...selected, next];
    setInternalValue(merged);
    onChange?.(merged);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            formFieldBase,
            "flex min-h-9 w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-sm",
            className
          )}
        >
          <span className="flex flex-1 flex-wrap items-center gap-1 text-left">
            {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
            {selected.map((v) => {
              const option = options.find((o) => o.value === v);
              if (!option) return null;
              return (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {option.label}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${option.label}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(v);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle(v);
                      }
                    }}
                    className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </span>
                </span>
              );
            })}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => toggle(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      selected.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
export type { MultiSelectProps, MultiSelectOption };
