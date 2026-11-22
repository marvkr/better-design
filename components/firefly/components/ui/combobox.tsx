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
 * Firefly Combobox: a select you can type into.
 *
 * The trigger is the same warm paper well as every field, with a sort caret
 * at the end, and its line turns olive while the list is open. The list is
 * the raised white menu panel, as wide as the trigger, with a search well at
 * the top and the tick for the chosen row at the end of that row.
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
            "data-[state=open]:border-(--accent-line)",
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? selected.label : "Choose a city"}
          </span>
          <Icon
            icon="carbon:caret-sort"
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
                    icon="carbon:checkmark"
                    className={cn(
                      "absolute end-2 size-4 text-foreground",
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
