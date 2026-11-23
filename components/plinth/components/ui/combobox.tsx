"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/* Plinth Combobox: a well-style trigger that opens a searchable list, as
   the editor picks a device frame. */

const devices = [
  { value: "phone-pro", label: "Phone Pro" },
  { value: "phone-mini", label: "Phone Mini" },
  { value: "tablet", label: "Tablet" },
  { value: "laptop", label: "Laptop" },
  { value: "desktop", label: "Desktop display" },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label="Device frame"
          className={cn(formFieldBase, formFieldSingleLine, "w-[13.5rem] cursor-pointer items-center justify-between text-left")}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ? devices.find((device) => device.value === value)?.label : "Choose a device"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[13.5rem] p-0">
        <Command>
          <CommandInput placeholder="Search devices" />
          <CommandList>
            <CommandEmpty>No device found.</CommandEmpty>
            <CommandGroup>
              {devices.map((device) => (
                <CommandItem
                  key={device.value}
                  value={device.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn("mr-2 size-4 text-primary", value === device.value ? "opacity-100" : "opacity-0")}
                  />
                  {device.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

// feather:chevron-down
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
    </svg>
  )
}
