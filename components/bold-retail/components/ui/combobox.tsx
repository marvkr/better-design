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

const stores = [
  { value: "downtown", label: "Downtown flagship" },
  { value: "harbour", label: "Harbour market" },
  { value: "north-mall", label: "North mall" },
  { value: "riverside", label: "Riverside outlet" },
  { value: "station", label: "Station square" },
];

/**
 * Bold retail Combobox: the store finder you can type into.
 *
 * The trigger is the white checkout field; its edge turns black while the
 * list is open. The list is the white floating panel, as wide as the
 * trigger, with the search field on top and a black tick on the chosen row.
 */
export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const selected = stores.find((store) => store.value === value);

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
            "group w-64 cursor-pointer items-center justify-between gap-2 text-start",
            "data-[state=open]:border-foreground",
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? selected.label : "Choose a store"}
          </span>
          <Icon
            icon="mingcute:down-line"
            className="size-5 shrink-0 text-foreground transition-transform duration-fast ease-out group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-(--radix-popover-trigger-width) min-w-64 gap-0 p-0"
      >
        <Command className="bg-transparent shadow-none">
          <CommandInput placeholder="Search stores" />
          <CommandList>
            <CommandEmpty>No store matches that search.</CommandEmpty>
            <CommandGroup>
              {stores.map((store) => (
                <CommandItem
                  key={store.value}
                  value={store.value}
                  keywords={[store.label]}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="pe-9"
                >
                  {store.label}
                  <Icon
                    icon="mingcute:check-line"
                    className={cn(
                      "absolute end-3 size-4 text-foreground",
                      value === store.value ? "opacity-100" : "opacity-0",
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
