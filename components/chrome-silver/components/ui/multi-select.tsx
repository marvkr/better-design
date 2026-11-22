"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
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

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
  maxVisibleBadges?: number
}

const SelectorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="m8 9 4-4 4 4" />
    <path d="m16 15-4 4-4-4" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

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
    ref
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
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn("w-full justify-between font-normal h-auto min-h-9 py-1.5", className)}
          >
            <div className="flex flex-wrap gap-1 items-center">
              {selectedLabels.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              {selectedLabels.slice(0, maxVisibleBadges).map((label) => (
                <span
                  key={label}
                  className={cn(
                    "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs",
                    "[background:var(--surface-silver)] text-foreground border border-white/10",
                    "[box-shadow:var(--shadow-sm)]"
                  )}
                >
                  {label}
                </span>
              ))}
              {selectedLabels.length > maxVisibleBadges && (
                <span className="text-xs text-muted-foreground">
                  +{selectedLabels.length - maxVisibleBadges} more
                </span>
              )}
            </div>
            <SelectorIcon className="ml-2 h-4 w-4 shrink-0 text-muted-foreground opacity-70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
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
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-md border",
                          isSelected
                            ? "[background:var(--surface-on)] border-white/10 text-primary-foreground [box-shadow:var(--shadow-primary)]"
                            : "border-white/10 bg-input [box-shadow:var(--shadow-inset)]"
                        )}
                      >
                        {isSelected && <CheckIcon className="h-3 w-3" />}
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
  }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
