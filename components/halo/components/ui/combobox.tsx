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
            "w-[12.5rem] justify-between",
            "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
            "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
            "text-foreground/90 placeholder:text-foreground/40",
            "transition duration-base",
            "hover:bg-foreground/[0.08] hover:border-foreground/[0.15]",
            "focus-visible:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus-visible:border-primary/50"
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
          "w-[12.5rem] p-0 rounded-xl",
          "border border-border backdrop-blur-3xl backdrop-saturate-200 bg-popover supports-[backdrop-filter]:bg-popover/50",
          "shadow-[0_0.5rem_2rem_color-mix(in_oklch,var(--shade)_40%,transparent),inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]"
        )}
      >
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search framework..."
            className="text-foreground/90 placeholder:text-foreground/40"
          />
          <CommandEmpty className="text-foreground/50">
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
                className="text-foreground/80 hover:bg-foreground/[0.08] aria-selected:bg-foreground/[0.1]"
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
