"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine, pressScale, quietChip } from "./_shared";

/**
 * Props for a read-only field with a copy button inside its right edge.
 *
 * Usage:
 *   <InputCopy value="pk_desk_7f3a9c" />
 *   <InputCopy label="Invite link" value={inviteUrl} />
 */
interface InputCopyProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly"> {
  value: string;
  label?: React.ReactNode;
  /** Milliseconds before the copied state resets. Default 1800. */
  copiedTimeoutMs?: number;
}

/**
 * Paddock InputCopy: the white rounded field, read only, with a small
 * grey copy chip inside its right edge that turns to a green check on copy.
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
      // The clipboard can be unavailable. The field stays selectable, so the
      // value can still be copied by hand.
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
        <label htmlFor={id} className="text-[0.8125rem] font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          value={value}
          readOnly
          onFocus={(e) => e.currentTarget.select()}
          className={cn(formFieldBase, formFieldSingleLine, "pr-12 font-mono text-[0.8125rem]")}
          {...props}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={cn(
            "absolute right-1.5 flex size-7 items-center justify-center rounded-md",
            quietChip,
            pressScale,
            focusRing,
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              className="flex"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15, ease: [0.165, 0.84, 0.44, 1] }}
            >
              <Icon
                icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"}
                aria-hidden="true"
                className={cn("size-3.5", copied && "text-success-text")}
              />
            </motion.span>
          </AnimatePresence>
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
