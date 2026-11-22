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

const regions = [
  { value: "us-east-1", label: "North Virginia (us-east-1)" },
  { value: "eu-west-1", label: "Ireland (eu-west-1)" },
  { value: "sa-east-1", label: "São Paulo (sa-east-1)" },
  { value: "ap-northeast-1", label: "Tokyo (ap-northeast-1)" },
  { value: "ap-south-1", label: "Mumbai (ap-south-1)" },
];

/**
 * Ink mail Combobox: a select you can type into, shown here choosing the
 * sending region for a domain.
 *
 * The trigger is the same dark well as every field, with an up-down caret
 * at the end, and its edge brightens to full ink while the list is open.
 * The list is the elevated menu panel, as wide as the trigger, with a
 * search well at the top and a check at the end of the chosen row.
 */
export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const selected = regions.find((region) => region.value === value);

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
            "w-64 cursor-pointer items-center justify-between gap-2 text-start",
            "data-[state=open]:border-foreground",
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? selected.label : "Choose a region"}
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
        className="w-(--radix-popover-trigger-width) min-w-64 gap-0 p-0"
      >
        <Command className="bg-transparent shadow-none">
          <CommandInput placeholder="Search regions" />
          <CommandList>
            <CommandEmpty>No region matches that search.</CommandEmpty>
            <CommandGroup>
              {regions.map((region) => (
                <CommandItem
                  key={region.value}
                  value={region.value}
                  keywords={[region.label]}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="pe-8"
                >
                  {region.label}
                  <Icon
                    icon="ph:check"
                    className={cn(
                      "absolute end-2.5 size-4 text-foreground",
                      value === region.value ? "opacity-100" : "opacity-0",
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
