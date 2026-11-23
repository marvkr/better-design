"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const options = [
  { value: "finder", label: "Finder" },
  { value: "notes", label: "Notes" },
  { value: "mail", label: "Mail" },
  { value: "calendar", label: "Calendar" },
  { value: "terminal", label: "Terminal" },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-56 justify-between font-normal"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Pick an app"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command>
          <CommandInput placeholder="Search apps" />
          <CommandList>
            <CommandEmpty>No app found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[option.label]}
                  onSelect={(current) => {
                    setValue(current === value ? "" : current);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto text-primary",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                    strokeWidth={3}
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
