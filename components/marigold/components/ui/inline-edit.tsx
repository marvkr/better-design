"use client";

import * as React from "react";
import { Check, Pencil, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard InlineEdit: click-to-edit value with confirm and cancel actions.

interface InlineEditProps {
  value: string;
  onConfirm: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  renderValue?: (value: string) => React.ReactNode;
}

function InlineEdit({
  value,
  onConfirm,
  onCancel,
  placeholder = "Enter value",
  disabled,
  className,
  inputClassName,
  renderValue,
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const confirm = () => {
    onConfirm(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    onCancel?.();
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setDraft(value);
          setEditing(true);
        }}
        className={cn(
          "group inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-foreground",
          "transition-colors hover:bg-accent/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        {renderValue ? renderValue(value) : value || <span className="text-muted-foreground">{placeholder}</span>}
        <Pencil className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <input
        ref={inputRef}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") confirm();
          if (e.key === "Escape") cancel();
        }}
        className={cn(formFieldBase, "h-8 rounded-md px-2 text-sm", inputClassName)}
      />
      <button
        type="button"
        onClick={confirm}
        aria-label="Confirm"
        className="flex h-7 w-7 items-center justify-center rounded-md bg-[image:var(--tb-primary-gradient)] text-primary-foreground shadow-[var(--tb-shadow-primary-sm)] transition-all hover:brightness-105"
      >
        <Check className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={cancel}
        aria-label="Cancel"
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border/70 bg-secondary text-muted-foreground shadow-[var(--tb-shadow-raise)] transition-colors hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export { InlineEdit };
export type { InlineEditProps };
