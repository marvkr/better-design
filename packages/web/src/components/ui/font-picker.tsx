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

export interface FontOption {
  value: string;
  label: string;
  category: "sans-serif" | "serif" | "monospace" | "display";
}

const GOOGLE_FONTS: FontOption[] = [
  // Sans-serif
  { value: "Inter", label: "Inter", category: "sans-serif" },
  { value: "Geist", label: "Geist", category: "sans-serif" },
  { value: "Roboto", label: "Roboto", category: "sans-serif" },
  { value: "Open Sans", label: "Open Sans", category: "sans-serif" },
  { value: "Lato", label: "Lato", category: "sans-serif" },
  { value: "Poppins", label: "Poppins", category: "sans-serif" },
  { value: "Montserrat", label: "Montserrat", category: "sans-serif" },
  { value: "Nunito", label: "Nunito", category: "sans-serif" },
  { value: "Raleway", label: "Raleway", category: "sans-serif" },
  { value: "Work Sans", label: "Work Sans", category: "sans-serif" },
  { value: "DM Sans", label: "DM Sans", category: "sans-serif" },
  { value: "Plus Jakarta Sans", label: "Plus Jakarta Sans", category: "sans-serif" },
  { value: "Manrope", label: "Manrope", category: "sans-serif" },
  { value: "Space Grotesk", label: "Space Grotesk", category: "sans-serif" },
  { value: "Outfit", label: "Outfit", category: "sans-serif" },
  { value: "Albert Sans", label: "Albert Sans", category: "sans-serif" },
  { value: "Figtree", label: "Figtree", category: "sans-serif" },
  { value: "Sora", label: "Sora", category: "sans-serif" },
  { value: "Instrument Sans", label: "Instrument Sans", category: "sans-serif" },
  { value: "General Sans", label: "General Sans", category: "sans-serif" },

  // Serif
  { value: "Merriweather", label: "Merriweather", category: "serif" },
  { value: "Playfair Display", label: "Playfair Display", category: "serif" },
  { value: "Lora", label: "Lora", category: "serif" },
  { value: "Source Serif 4", label: "Source Serif 4", category: "serif" },
  { value: "Crimson Text", label: "Crimson Text", category: "serif" },
  { value: "Libre Baskerville", label: "Libre Baskerville", category: "serif" },
  { value: "DM Serif Display", label: "DM Serif Display", category: "serif" },
  { value: "Fraunces", label: "Fraunces", category: "serif" },
  { value: "Instrument Serif", label: "Instrument Serif", category: "serif" },
  { value: "Georgia", label: "Georgia", category: "serif" },

  // Monospace
  { value: "JetBrains Mono", label: "JetBrains Mono", category: "monospace" },
  { value: "Fira Code", label: "Fira Code", category: "monospace" },
  { value: "Source Code Pro", label: "Source Code Pro", category: "monospace" },
  { value: "IBM Plex Mono", label: "IBM Plex Mono", category: "monospace" },
  { value: "Roboto Mono", label: "Roboto Mono", category: "monospace" },
  { value: "Space Mono", label: "Space Mono", category: "monospace" },
  { value: "Geist Mono", label: "Geist Mono", category: "monospace" },

  // Display
  { value: "Clash Display", label: "Clash Display", category: "display" },
  { value: "Satoshi", label: "Satoshi", category: "display" },
  { value: "Cabinet Grotesk", label: "Cabinet Grotesk", category: "display" },
  { value: "Bricolage Grotesque", label: "Bricolage Grotesque", category: "display" },
  { value: "Unbounded", label: "Unbounded", category: "display" },
  { value: "Syne", label: "Syne", category: "display" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "sans-serif": "Sans Serif",
  serif: "Serif",
  monospace: "Monospace",
  display: "Display",
};

// Fonts that need Google Fonts loading (not system fonts)
const SYSTEM_FONTS = new Set(["Georgia", "Geist", "Geist Mono"]);

export function getGoogleFontUrl(fontName: string, weights = "400;500;600;700"): string | null {
  if (SYSTEM_FONTS.has(fontName)) return null;
  const encoded = fontName.replace(/\s+/g, "+");
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weights}&display=swap`;
}

interface FontPickerProps {
  value: string;
  onValueChange: (value: string) => void;
  category?: "sans-serif" | "serif" | "monospace" | "display";
  placeholder?: string;
  className?: string;
}

export function FontPicker({
  value,
  onValueChange,
  category,
  placeholder = "Select font...",
  className,
}: FontPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [loadedFonts, setLoadedFonts] = React.useState<Set<string>>(new Set());

  const fonts = category
    ? GOOGLE_FONTS.filter((f) => f.category === category)
    : GOOGLE_FONTS;

  const grouped = React.useMemo(() => {
    const groups: Record<string, FontOption[]> = {};
    for (const font of fonts) {
      const cat = font.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(font);
    }
    return groups;
  }, [fonts]);

  // Load font preview stylesheets
  React.useEffect(() => {
    if (!open) return;

    for (const font of fonts) {
      if (loadedFonts.has(font.value)) continue;
      const url = getGoogleFontUrl(font.value);
      if (!url) continue;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
      setLoadedFonts((prev) => new Set(prev).add(font.value));
    }
  }, [open, fonts, loadedFonts]);

  const selectedFont = GOOGLE_FONTS.find((f) => f.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("h-8 justify-between font-normal", className)}
        >
          <span
            className="truncate text-xs"
            style={selectedFont ? { fontFamily: `"${selectedFont.value}", sans-serif` } : undefined}
          >
            {selectedFont?.label ?? placeholder}
          </span>
          <Icon icon="tabler:selector" className="ml-1 size-3.5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search fonts..." className="h-8" />
          <CommandEmpty>No font found.</CommandEmpty>
          <div className="max-h-60 overflow-y-auto">
            {Object.entries(grouped).map(([cat, catFonts]) => (
              <CommandGroup key={cat} heading={CATEGORY_LABELS[cat] ?? cat}>
                {catFonts.map((font) => (
                  <CommandItem
                    key={font.value}
                    value={font.value}
                    onSelect={() => {
                      onValueChange(font.value);
                      setOpen(false);
                    }}
                  >
                    <Icon
                      icon="tabler:check"
                      className={cn(
                        "mr-2 size-3.5",
                        value === font.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span
                      className="text-sm"
                      style={{ fontFamily: `"${font.value}", sans-serif` }}
                    >
                      {font.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { GOOGLE_FONTS };
