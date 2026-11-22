"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";
import { Input } from "./input";

/** Props for a read-only field with a copy button at its end. */
interface InputCopyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string;
  label?: React.ReactNode;
  /** Milliseconds before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number;
}

/**
 * Margin InputCopy: a read-only paper field in monospace with a small white
 * pill inside its end that copies the value. After a copy the icon turns to
 * an oxblood tick for a moment.
 */
function InputCopy({ value, label, copiedTimeoutMs = 1800, className, id: idProp, ...props }: InputCopyProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // The clipboard can be unavailable; the field stays selectable for a manual copy.
    }
  }, [value]);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), copiedTimeoutMs);
    return () => clearTimeout(t);
  }, [copied, copiedTimeoutMs]);

  return (
    <div data-slot="input-copy" className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <Input
          id={id}
          type="text"
          value={value}
          readOnly
          onFocus={(e) => e.currentTarget.select()}
          className="pe-10 font-mono text-xs"
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute end-1 flex size-5.5 items-center justify-center rounded-md bg-card text-muted-foreground shadow-sm",
            "transition duration-fast ease-(--ease-out) hover:text-foreground active:scale-95 motion-reduce:active:scale-100",
            focusRing,
          )}
        >
          <Icon
            key={copied ? "check" : "copy"}
            icon={copied ? "solar:check-circle-linear" : "solar:copy-linear"}
            className={cn("size-3.5 animate-in fade-in zoom-in-75 duration-fast", copied && "text-(--primary-text)")}
            aria-hidden
          />
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </div>
    </div>
  );
}

export { InputCopy };
export type { InputCopyProps };
