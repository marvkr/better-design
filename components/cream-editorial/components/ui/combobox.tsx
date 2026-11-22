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

const cities = [
  { value: "lisbon", label: "Lisbon" },
  { value: "nairobi", label: "Nairobi" },
  { value: "osaka", label: "Osaka" },
  { value: "toronto", label: "Toronto" },
  { value: "valparaiso", label: "Valparaíso" },
];

/**
 * Cream editorial Combobox: a select you can type into.
 *
 * The trigger is the same pale paper field as every input, with an up-down
 * caret at the end; its edge turns terracotta while the list is open. The
 * list is the lightest paper panel, as wide as the trigger, with a search
 * field at the top and a tick at the end of the chosen row.
 */
export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const selected = cities.find((city) => city.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          data-slot="combobox-trigger"
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "w-56 cursor-pointer items-center justify-between gap-2 text-start",
            "data-[state=open]:border-primary",
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? selected.label : "Choose a city"}
          </span>
          <Icon
            icon="ph:caret-up-down"
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-(--radix-popover-trigger-width) min-w-56 gap-0 p-0"
      >
        <Command className="bg-transparent shadow-none">
          <CommandInput placeholder="Search cities" />
          <CommandList>
            <CommandEmpty>No city matches that search.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  keywords={[city.label]}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="pe-8"
                >
                  {city.label}
                  <Icon
                    icon="ph:check"
                    className={cn(
                      "absolute end-2.5 size-4 text-foreground",
                      value === city.value ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
