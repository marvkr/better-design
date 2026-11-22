"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard PhoneInput: country selector fused to the recessed field.

interface Country {
  code: string;
  dial: string;
  name: string;
}

const COUNTRIES: Country[] = [
  { code: "FR", dial: "+33", name: "France" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "ES", dial: "+34", name: "Spain" },
  { code: "IT", dial: "+39", name: "Italy" },
  { code: "NL", dial: "+31", name: "Netherlands" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "JP", dial: "+81", name: "Japan" },
];

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function PhoneInput({
  value,
  onChange,
  defaultCountry = "FR",
  placeholder = "6 12 34 56 78",
  disabled,
  className,
}: PhoneInputProps) {
  const [country, setCountry] = React.useState(
    COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0]
  );
  const [number, setNumber] = React.useState(value ?? "");

  // Sync internal state when the parent drives the value prop (controlled
  // usage). onChange emits "<dial> <number>", so parse the dial back out.
  React.useEffect(() => {
    if (value === undefined) return;
    const match = COUNTRIES.find((c) => value.startsWith(`${c.dial} `));
    if (match) {
      setCountry(match);
      setNumber(value.slice(match.dial.length + 1));
    } else {
      setNumber(value);
    }
  }, [value]);

  const handleNumberChange = (next: string) => {
    setNumber(next);
    onChange?.(`${country.dial} ${next}`);
  };

  const handleCountryChange = (code: string) => {
    const next = COUNTRIES.find((c) => c.code === code);
    if (!next) return;
    setCountry(next);
    onChange?.(`${next.dial} ${number}`);
  };

  return (
    <div
      className={cn(
        formFieldBase,
        "flex h-9 items-stretch overflow-hidden rounded-lg p-0",
        "focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/35",
        className
      )}
    >
      <div className="relative flex items-center border-r border-border/70">
        <select
          aria-label="Country code"
          value={country.code}
          disabled={disabled}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="h-full appearance-none bg-transparent py-1 pl-3 pr-7 text-sm text-foreground outline-none disabled:cursor-not-allowed"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code} className="bg-popover text-popover-foreground">
              {c.code} {c.dial}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <input
        type="tel"
        value={number}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => handleNumberChange(e.target.value)}
        className="h-full w-full bg-transparent px-3 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
    </div>
  );
}

export { PhoneInput };
export type { PhoneInputProps };
