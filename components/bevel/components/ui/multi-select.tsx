"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * Bevel MultiSelect.
 *
 * The field well grows to hold its chips instead of scrolling them, because
 * a phone has the height and not the width. Each chip is the system's inner
 * surface at the 8px step. The box in the list is the Checkbox surface, so a
 * checked row and a checked box read the same.
 */

/** One choice in a `MultiSelect`. */
export interface MultiSelectOption {
  value: string
  label: string
}

/** Props for `MultiSelect`, a field that holds several choices as chips. */
export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
  /** How many chips show before the rest collapse into a count. */
  maxVisibleBadges?: number
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
    const [open, setOpen] = React.useState(false)

    const toggle = (v: string) => {
      if (value.includes(v)) onValueChange(value.filter((x) => x !== v))
      else onValueChange([...value, v])
    }

    const selectedLabels = value.flatMap((v) => {
      const label = options.find((o) => o.value === v)?.label
      return label === undefined ? [] : [label]
    })

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              formFieldBase,
              "flex h-auto min-h-10 items-center justify-between gap-2 py-1.5 font-normal",
              "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
              className,
            )}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedLabels.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              {selectedLabels.slice(0, maxVisibleBadges).map((label) => (
                <span
                  key={label}
                  className={cn(
                    "inline-flex items-center rounded-[0.5rem] px-2 py-0.5",
                    "text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem]",
                    "bg-[var(--inner)] text-[var(--strong)] [box-shadow:var(--shadow-ring)]",
                  )}
                >
                  {label}
                </span>
              ))}
              {selectedLabels.length > maxVisibleBadges && (
                <span className="text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground">
                  +{selectedLabels.length - maxVisibleBadges} more
                </span>
              )}
            </div>
            <Icon
              icon="solar:alt-arrow-down-linear"
              className="size-4 shrink-0 text-muted-foreground"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggle(option.value)}
                    >
                      <div
                        className={cn(
                          "mr-2.5 flex size-[1.125rem] shrink-0 items-center justify-center rounded-[0.375rem]",
                          isSelected ?
                            "text-primary-foreground bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] [box-shadow:var(--shadow-primary)]"
                          : "bg-input [box-shadow:var(--shadow-inset)]",
                        )}
                      >
                        {isSelected && (
                          <Icon
                            icon="solar:check-read-linear"
                            className="size-3"
                          />
                        )}
                      </div>
                      {option.label}
                    </CommandItem>
                  )
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
    )
  },
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
