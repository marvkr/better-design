"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
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
          className={cn(
            "w-[200px] justify-between",
            "rounded-full border border-white/10 backdrop-blur-xl bg-white/[0.06]",
            "shadow-[inset_0_0_6px_rgba(255,255,255,0.06)]",
            "text-white/90 placeholder:text-white/40",
            "transition duration-200",
            "hover:bg-white/[0.08] hover:border-white/[0.15]",
            "focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.06),0_0_0_3px_oklch(0.65_0.19_250/0.2)] focus-visible:border-primary/50"
          )}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <Icon
            icon="tabler:chevrons-up-down"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[200px] p-0 rounded-xl",
          "border border-white/10 backdrop-blur-2xl bg-white/[0.08]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_6px_rgba(255,255,255,0.06)]"
        )}
      >
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search framework..."
            className="text-white/90 placeholder:text-white/40"
          />
          <CommandEmpty className="text-white/50">
            No framework found.
          </CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className="text-white/80 hover:bg-white/[0.08] aria-selected:bg-white/[0.1]"
              >
                <Icon
                  icon="tabler:check"
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
