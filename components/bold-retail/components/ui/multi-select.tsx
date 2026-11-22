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
 * Bold retail MultiSelect: the filter field of a product listing. Picks
 * collect inside the white field as soft grey pills, and the list opens on
 * the white floating panel. Each row carries a small box that turns black
 * when picked, and a row at the foot clears every pick at once.
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
              "group flex h-auto min-h-12 items-center justify-between gap-2 py-2 text-start",
              "data-[state=open]:border-foreground",
              className,
            )}
          >
            <span className="flex min-w-0 flex-wrap items-center gap-1.5">
              {selected.length === 0 && (
                <span className="py-1 text-muted-foreground">{placeholder}</span>
              )}
              {selected.slice(0, maxVisibleBadges).map((option) => (
                <span
                  key={option.value}
                  data-slot="multi-select-chip"
                  className="inline-flex h-7 max-w-40 items-center rounded-full bg-secondary px-3 text-sm font-medium text-foreground group-disabled:text-(--foreground-disabled)"
                >
                  <span className="truncate">{option.label}</span>
                </span>
              ))}
              {hidden > 0 && (
                <span className="px-1 text-sm text-muted-foreground">
                  +{hidden} more
                </span>
              )}
            </span>
            <Icon
              icon="mingcute:down-line"
              aria-hidden="true"
              className="size-5 shrink-0 text-foreground transition-transform duration-fast ease-out group-data-[state=open]:rotate-180"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) min-w-64 p-0"
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
                          "flex size-4 shrink-0 items-center justify-center rounded-[0.25rem] border border-(--control) bg-background text-transparent",
                          "transition-colors duration-fast ease-out",
                          controlChecked,
                        )}
                      >
                        <Icon icon="mingcute:check-line" className="size-3" />
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
                      className="justify-center font-medium underline underline-offset-4"
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
