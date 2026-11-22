"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { controlChecked, formFieldBase } from "./_shared";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  maxVisibleBadges?: number;
}

/**
 * Ink mail MultiSelect: a dark field that collects its picks as hairline
 * pills and opens a searchable list on the elevated panel. Each row carries
 * a small box that fills off-white with a black check when picked, and a row
 * at the foot clears every pick at once.
 */
const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select options",
      searchPlaceholder = "Search options",
      emptyMessage = "No matching options",
      className,
      disabled,
      maxVisibleBadges = 3,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const toggle = (optionValue: string) => {
      onValueChange(
        value.includes(optionValue)
          ? value.filter((v) => v !== optionValue)
          : [...value, optionValue],
      );
    };

    const selected = options.filter((option) => value.includes(option.value));
    const hidden = selected.length - maxVisibleBadges;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            data-slot="multi-select"
            className={cn(
              formFieldBase,
              "group flex h-auto min-h-10 items-center justify-between gap-2 py-1.5 text-start",
              "data-[state=open]:border-foreground",
              className,
            )}
          >
            <span className="flex min-w-0 flex-wrap items-center gap-1">
              {selected.length === 0 && (
                <span className="py-0.5 text-muted-foreground">{placeholder}</span>
              )}
              {selected.slice(0, maxVisibleBadges).map((option) => (
                <span
                  key={option.value}
                  data-slot="multi-select-chip"
                  className="inline-flex h-6 max-w-40 items-center rounded-full border border-(--line-strong) bg-secondary px-2.5 text-xs font-medium text-(--foreground-secondary) group-disabled:border-border group-disabled:bg-transparent group-disabled:text-(--foreground-disabled)"
                >
                  <span className="truncate">{option.label}</span>
                </span>
              ))}
              {hidden > 0 && (
                <span className="px-1 text-xs tabular-nums text-muted-foreground">
                  +{hidden} more
                </span>
              )}
            </span>
            <Icon
              icon="ph:caret-down"
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-out group-data-[state=open]:rotate-180"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) min-w-56 p-0"
        >
          <Command className="bg-transparent shadow-none">
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggle(option.value)}
                    >
                      <span
                        aria-hidden="true"
                        data-state={isSelected ? "checked" : "unchecked"}
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-sm border border-(--control) bg-transparent text-transparent",
                          "transition-[background-color,border-color,color] duration-fast ease-out",
                          controlChecked,
                        )}
                      >
                        <Icon icon="ph:check" className="size-3" />
                      </span>
                      <span className="truncate">{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {value.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => onValueChange([])}
                      className="justify-center text-muted-foreground"
                    >
                      Clear selection
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
