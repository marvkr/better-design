"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/*
 * Bevel Combobox.
 *
 * A searchable select. The trigger is the shared field well, so it lines up
 * with every other row in a form. The list rides the popover surface at the
 * 14px step and matches the trigger width, which is what keeps a narrow
 * phone layout tidy.
 */

/** One choice in a `Combobox`. */
export interface ComboboxOption {
  value: string
  label: string
}

/** Props for `Combobox`, a single-choice field with a search box. */
export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

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
    const [open, setOpen] = React.useState(false)
    const selected = options.find((option) => option.value === value)

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
              formFieldSingleLine,
              "items-center justify-between gap-2 font-normal",
              "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
              className,
            )}
          >
            <span
              className={cn("truncate", !selected && "text-muted-foreground")}
            >
              {selected ? selected.label : placeholder}
            </span>
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
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onValueChange?.(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Icon
                      icon="solar:check-read-linear"
                      className={cn(
                        "mr-2 size-4 shrink-0 text-primary",
                        value === option.value ? "opacity-100" : "opacity-0",
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
    )
  },
)
Combobox.displayName = "Combobox"

export { Combobox }
