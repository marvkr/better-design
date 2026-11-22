"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";
import { Input } from "./input";

/** Props for text that turns into a field when pressed. */
export interface InlineEditProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  disabled?: boolean;
}

/**
 * Margin InlineEdit: plain text that becomes the grey filled field when
 * pressed, the way a note title is renamed. Enter or leaving the field saves;
 * Escape cancels.
 */
const InlineEdit = React.forwardRef<HTMLInputElement, InlineEditProps>(
  ({ value, onValueChange, placeholder = "Untitled", className, displayClassName, disabled }, ref) => {
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(value);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const returnFocus = React.useRef(false);

    // SAFETY: callers read the handle after mount, when the field exists.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (editing) inputRef.current?.select();
      else if (returnFocus.current) {
        returnFocus.current = false;
        buttonRef.current?.focus();
      }
    }, [editing]);

    const start = () => {
      if (disabled) return;
      setDraft(value);
      setEditing(true);
    };

    const commit = () => {
      onValueChange(draft);
      setEditing(false);
    };

    const cancel = () => {
      setDraft(value);
      setEditing(false);
    };

    if (editing) {
      return (
        <Input
          ref={inputRef}
          data-slot="inline-edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              returnFocus.current = true;
              commit();
            } else if (e.key === "Escape") {
              returnFocus.current = true;
              cancel();
            }
          }}
          placeholder={placeholder}
          className={className}
        />
      );
    }

    return (
      <button
        ref={buttonRef}
        type="button"
        data-slot="inline-edit"
        onClick={start}
        disabled={disabled}
        className={cn(
          "group inline-flex h-7.5 items-center gap-1.5 rounded-lg px-2.5 text-left text-sm",
          "transition-colors duration-fast pointer-fine:hover:bg-accent",
          focusRing,
          "disabled:cursor-not-allowed disabled:opacity-50",
          displayClassName,
        )}
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>{value || placeholder}</span>
        <Icon
          icon="solar:pen-linear"
          aria-hidden
          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast group-focus-visible:opacity-100 pointer-fine:group-hover:opacity-100"
        />
      </button>
    );
  },
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
