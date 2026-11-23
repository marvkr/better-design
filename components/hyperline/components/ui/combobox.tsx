"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { formFieldBase } from "./_shared";

// Combobox: recessed field trigger with the command palette surface.

const plans = [
  { value: "b2c-plan", label: "B2C Plan" },
  { value: "b2b-plan", label: "B2B Plan" },
  { value: "usage-based", label: "Usage based" },
  { value: "enterprise", label: "Enterprise" },
  { value: "legacy", label: "Legacy" },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            formFieldBase,
            "flex h-9 w-[13.75rem] items-center justify-between rounded-lg px-3 py-1 text-sm font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? plans.find((plan) => plan.value === value)?.label : "Select plan"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[13.75rem] p-0">
        <Command>
          <CommandInput placeholder="Search plans" />
          <CommandList>
            <CommandEmpty>No plan found.</CommandEmpty>
            <CommandGroup>
              {plans.map((plan) => (
                <CommandItem
                  key={plan.value}
                  value={plan.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      value === plan.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {plan.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
