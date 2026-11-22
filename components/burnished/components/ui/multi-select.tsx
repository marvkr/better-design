"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { copperRim, formFieldBase, raisedBevel, wellInset } from "./_shared";
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

/**
 * Burnished MultiSelect: a graphite bevel field that shows the picks as
 * small bevelled pills. The list opens in the shared umber panel, and each
 * row's box fills with the primary's cream bevel when picked.
 */
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

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select options...",
      searchPlaceholder = "Search...",
      emptyMessage = "No results found.",
      className,
      disabled,
      maxVisibleBadges = 3,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const toggle = (v: string) => {
      if (value.includes(v)) onValueChange(value.filter((x) => x !== v));
      else onValueChange([...value, v]);
    };

    const selectedLabels = value.flatMap((v) => {
      const label = options.find((o) => o.value === v)?.label;
      return label === undefined ? [] : [label];
    });

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
              "flex min-h-12 cursor-pointer items-center justify-between gap-2 py-2 pl-2.5 pr-4 text-left",
              className,
            )}
          >
            <span className="flex flex-wrap items-center gap-1.5">
              {selectedLabels.length === 0 && (
                <span className="pl-1.5 text-muted-foreground">{placeholder}</span>
              )}
              {selectedLabels.slice(0, maxVisibleBadges).map((label) => (
                <span
                  key={label}
                  className={cn("inline-flex h-7 items-center rounded-full px-3 text-[0.8125rem] font-medium", raisedBevel)}
                >
                  {label}
                </span>
              ))}
              {selectedLabels.length > maxVisibleBadges && (
                <span className="px-1 text-[0.8125rem] text-muted-foreground">
                  +{selectedLabels.length - maxVisibleBadges} more
                </span>
              )}
            </span>
            <Icon icon="ph:caret-up-down" className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem key={option.value} onSelect={() => toggle(option.value)}>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-[0.375rem]",
                          isSelected
                            ? cn(copperRim, "text-primary-foreground shadow-(--bevel-primary)")
                            : wellInset,
                        )}
                      >
                        {isSelected && <Icon icon="ph:check-bold" className="size-2.5" />}
                      </span>
                      {option.label}
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
                      className="justify-center text-center text-muted-foreground"
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
