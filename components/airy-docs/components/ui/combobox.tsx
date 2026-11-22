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

const versions = [
  { value: "v4", label: "v4 (latest)" },
  { value: "v3", label: "v3" },
  { value: "v2", label: "v2" },
  { value: "beta", label: "Beta" },
  { value: "legacy", label: "Legacy" },
];

/**
 * Airy docs Combobox: a select you can type into, shown as a docs version
 * picker.
 *
 * The trigger is the same white field as every input, with a sort mark at the
 * end; its edge turns green while the list is open. The list is the white
 * menu panel at the trigger's width, with a search field on top and a green
 * tick beside the chosen row.
 */
export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const selected = versions.find((version) => version.value === value);

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
            {selected ? selected.label : "Choose a version"}
          </span>
          <Icon
            icon="feather:chevron-down"
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
          <CommandInput placeholder="Search versions" />
          <CommandList>
            <CommandEmpty>No version matches that search.</CommandEmpty>
            <CommandGroup>
              {versions.map((version) => (
                <CommandItem
                  key={version.value}
                  value={version.value}
                  keywords={[version.label]}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="pe-8"
                >
                  {version.label}
                  <Icon
                    icon="feather:check"
                    className={cn(
                      "absolute end-2 size-4 text-(--primary-text)",
                      value === version.value ? "opacity-100" : "opacity-0",
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
