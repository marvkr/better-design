"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Ops Sharp MultiSelect - a field-surface trigger holding removable chips, with
// a floating dropdown panel (bg-popover + --shadow-popover). Checked rows show
// the graphite tile so the check material matches the rest of the DS.

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  disabled,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !(e.target instanceof Node && ref.current.contains(e.target))) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange?.(value.filter((v) => v !== optionValue));
    } else {
      onChange?.([...value, optionValue]);
    }
  };

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          formFieldBase,
          "flex min-h-9 flex-wrap items-center gap-1.5 py-1.5 text-left",
          open && "border-ring ring-2 ring-ring/25"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-foreground"
              >
                {label}
                <X
                  className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    const opt = options.find((o) => o.label === label);
                    if (opt) toggle(opt.value);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover p-1.5 [box-shadow:var(--shadow-popover)]">
          {options.map((option) => {
            const checked = value.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggle(option.value)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-sm border transition-colors",
                    checked
                      ? "border-primary bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)]"
                      : "border-border bg-card [box-shadow:var(--shadow-inset)]"
                  )}
                >
                  {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                </div>
                <span className={checked ? "text-foreground" : "text-muted-foreground"}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { MultiSelect };
export type { MultiSelectProps, MultiSelectOption };
