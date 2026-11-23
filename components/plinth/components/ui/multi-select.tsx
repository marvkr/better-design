"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
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
import { formFieldBase } from "./_shared"

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

/*
 * Plinth Multi Select: a recessed well that holds the picked values as mono
 * readout chips, and opens a searchable floating list.
 */
const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select options",
      searchPlaceholder = "Search",
      emptyMessage = "No results found.",
      className,
      disabled,
      maxVisibleBadges = 3,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const toggle = (v: string) => {
      onValueChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
    }

    const picked = value.flatMap((v) => {
      const option = options.find((o) => o.value === v)
      return option ? [option] : []
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
              "flex min-h-9 cursor-pointer items-center justify-between gap-2 rounded-lg py-1 pl-1.5 pr-2.5 text-left",
              open && "border-ring/70 ring-2 ring-ring/30",
              className
            )}
          >
            <span className="flex flex-wrap items-center gap-1">
              {picked.length === 0 && <span className="pl-2 text-muted-foreground">{placeholder}</span>}
              {picked.slice(0, maxVisibleBadges).map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.6875rem] uppercase text-secondary-foreground [box-shadow:var(--shadow-button)]"
                >
                  {option.label}
                </span>
              ))}
              {picked.length > maxVisibleBadges && (
                <span className="px-1 font-mono text-[0.6875rem] text-muted-foreground">
                  +{picked.length - maxVisibleBadges}
                </span>
              )}
            </span>
            <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const selected = value.includes(option.value)
                  return (
                    <CommandItem key={option.value} value={option.label} onSelect={() => toggle(option.value)}>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-[0.3125rem] border",
                          selected
                            ? "border-[oklch(0.5_0.16_39)] [background:var(--ember-gradient)] text-primary-foreground"
                            : "border-[oklch(1_0_0/0.1)] bg-input [box-shadow:var(--shadow-inset)]"
                        )}
                      >
                        {selected && <CheckIcon className="size-3" />}
                      </span>
                      {option.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {value.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem onSelect={() => onValueChange([])} className="justify-center text-muted-foreground">
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

// feather:chevron-down
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
    </svg>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export { MultiSelect }
