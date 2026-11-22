"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * Margin Combobox: the grey filled field that opens a searchable list in
 * the shared paper panel. The chosen row carries an oxblood check.
 */
export interface ComboboxOption {
  value: string;
  label: string;
}

/** Props for Combobox: the options, the chosen value and the empty and search copy. */
export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

/** A field that opens a filterable list and picks one option from it. */
const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select option...",
      searchPlaceholder = "Search...",
      emptyMessage = "No results found.",
      className,
      disabled,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const selected = options.find((option) => option.value === value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            data-slot="combobox"
            className={cn(
              formFieldBase,
              formFieldSingleLine,
              "cursor-pointer items-center justify-between gap-2 text-left",
              className,
            )}
          >
            <span className={cn("truncate", !selected && "text-muted-foreground")}>
              {selected ? selected.label : placeholder}
            </span>
            <Icon icon="solar:sort-vertical-linear" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          <Command className="shadow-none">
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onValueChange?.(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    <Icon
                      icon="solar:unread-linear"
                      aria-hidden
                      className={cn(
                        "size-3.5 shrink-0 text-(--primary-text)",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
Combobox.displayName = "Combobox";

export { Combobox };
