"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

interface InputCopyProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
> {
  value: string;
  label?: React.ReactNode;
  /** Milliseconds before the copied tick turns back into the copy icon. Default 1800. */
  copiedTimeoutMs?: number;
}

/**
 * Airy docs InputCopy: a read-only box holding an API key or an endpoint in
 * Geist Mono on the pale tray, with a small copy button in its end. A press
 * copies the value and swaps the icon for a green tick for a moment;
 * focusing the box selects the whole value for a manual copy.
 */
function InputCopy({
  value,
  label,
  copiedTimeoutMs = 1800,
  className,
  id: idProp,
  ...props
}: InputCopyProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // The clipboard can be blocked; the box stays selectable for a manual copy.
    }
  }, [value]);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), copiedTimeoutMs);
    return () => clearTimeout(timer);
  }, [copied, copiedTimeoutMs]);

  return (
    <div data-slot="input-copy" className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          value={value}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "border-border bg-secondary pe-10 font-mono text-[0.8125rem] tabular-nums",
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          disabled={props.disabled}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute end-1.5 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground",
            "transition-colors duration-fast ease-out",
            "hover:bg-background hover:text-foreground",
            "outline-none focus-visible:ring-3 focus-visible:ring-ring",
            "disabled:pointer-events-none disabled:text-(--foreground-disabled)",
          )}
        >
          <Icon
            icon={copied ? "feather:check" : "feather:copy"}
            aria-hidden="true"
            className={cn("size-3.5", copied && "text-(--primary-text)")}
          />
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </div>
    </div>
  );
}

export { InputCopy };
export type { InputCopyProps };
