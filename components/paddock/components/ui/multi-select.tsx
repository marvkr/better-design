"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { primaryEdge, formFieldBase } from "./_shared";
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

/** One choice in the multi-select list. */
export interface MultiSelectOption {
  value: string;
  label: string;
}

/** Props for `MultiSelect`: the options, the controlled picks and how many chips to show. */
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
 * Paddock MultiSelect: the white search field showing each pick as a quiet
 * grey tag chip. The list opens in the shared white floating panel, and each
 * row's box fills with the primary's teal when picked.
 */
const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Choose options",
      searchPlaceholder = "Search",
      emptyMessage = "Nothing matches that search.",
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
              "flex min-h-10 cursor-pointer items-center justify-between gap-2 py-1.5 pl-2 pr-3.5 text-left",
              className,
            )}
          >
            <span className="flex flex-wrap items-center gap-1">
              {selectedLabels.length === 0 && (
                <span className="pl-1.5 text-muted-foreground">{placeholder}</span>
              )}
              {selectedLabels.slice(0, maxVisibleBadges).map((label) => (
                <span
                  key={label}
                  className="inline-flex h-6 items-center rounded-sm bg-secondary px-2.5 text-xs font-medium text-secondary-foreground"
                >
                  {label}
                </span>
              ))}
              {selectedLabels.length > maxVisibleBadges && (
                <span className="px-1 text-xs text-muted-foreground">
                  +{selectedLabels.length - maxVisibleBadges} more
                </span>
              )}
            </span>
            <Icon icon="mingcute:down-line" className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) min-w-56 p-0">
          <Command className="rounded-none bg-transparent shadow-none">
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
                          "flex size-4 shrink-0 items-center justify-center rounded-xs",
                          isSelected
                            ? cn(primaryEdge, "text-primary-foreground")
                            : "border border-transparent bg-(--field) shadow-(--control-ring)",
                        )}
                      >
                        {isSelected && (
                          <Icon icon="mingcute:check-line" className="size-3! text-primary-foreground!" />
                        )}
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
