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

const events = [
  { value: "pageview", label: "Page viewed" },
  { value: "signup", label: "Signed up" },
  { value: "checkout", label: "Checkout started" },
  { value: "invite", label: "Teammate invited" },
  { value: "export", label: "Report exported" },
];

/**
 * Playful console Combobox: a select you can type into.
 *
 * The trigger is the same white well as every field, with an up-down caret
 * at the end, and its edge turns blue while the list is open. The list is
 * the white menu card, as wide as the trigger, with a search strip at the top
 * and an orange tick at the end of the chosen row.
 */
export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const selected = events.find((event) => event.value === value);

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
            "w-56 cursor-pointer items-center justify-between gap-2 text-start font-medium",
            "data-[state=open]:border-ring",
          )}
        >
          <span className={cn("truncate", !selected && "font-normal text-muted-foreground")}>
            {selected ? selected.label : "Pick an event"}
          </span>
          <Icon
            icon="ph:caret-up-down-bold"
            className="size-3.5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-(--radix-popover-trigger-width) min-w-56 gap-0 overflow-hidden p-0"
      >
        <Command className="rounded-none border-0 bg-transparent shadow-none">
          <CommandInput placeholder="Search events" />
          <CommandList>
            <CommandEmpty>No event matches that search.</CommandEmpty>
            <CommandGroup>
              {events.map((event) => (
                <CommandItem
                  key={event.value}
                  value={event.value}
                  keywords={[event.label]}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="pe-8"
                >
                  {event.label}
                  <Icon
                    icon="ph:check-bold"
                    className={cn(
                      "absolute end-2 size-4 text-primary",
                      value === event.value ? "opacity-100" : "opacity-0",
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
