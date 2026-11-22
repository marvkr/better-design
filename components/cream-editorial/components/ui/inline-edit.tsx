"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

export interface InlineEditProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  disabled?: boolean;
}

/**
 * Cream editorial InlineEdit: text that reads as text until you press it.
 * At rest it sits on the page; under the pointer it takes an oat wash and a
 * pencil fades in. Pressed, it becomes a compact paper field. Enter or
 * leaving the field saves, and Escape puts the old text back.
 */
const InlineEdit = React.forwardRef<HTMLInputElement, InlineEditProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Select to edit",
      className,
      displayClassName,
      disabled,
    },
    ref,
  ) => {
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(value);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const cancelled = React.useRef(false);

    // SAFETY: inputRef is attached to the input while editing; a parent only
    // reaches the handle to focus or read it during that time.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (editing) inputRef.current?.select();
    }, [editing]);

    const startEditing = () => {
      if (disabled) return;
      cancelled.current = false;
      setDraft(value);
      setEditing(true);
    };

    const commit = () => {
      if (cancelled.current) return;
      if (draft !== value) onValueChange(draft);
      setEditing(false);
    };

    const cancel = () => {
      cancelled.current = true;
      setDraft(value);
      setEditing(false);
    };

    if (editing) {
      return (
        <input
          ref={inputRef}
          data-slot="inline-edit-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit();
            else if (event.key === "Escape") cancel();
          }}
          placeholder={placeholder}
          className={cn(formFieldBase, formFieldSingleLine, "h-8 px-2.5 py-1", className)}
        />
      );
    }

    return (
      <button
        type="button"
        data-slot="inline-edit"
        onClick={startEditing}
        disabled={disabled}
        className={cn(
          "group -mx-2.5 inline-flex max-w-full items-center gap-2 rounded-md px-2.5 py-1 text-start text-sm text-foreground",
          "transition-colors duration-fast ease-out",
          "hover:bg-secondary active:bg-muted",
          focusRing,
          "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-(--foreground-disabled)",
          displayClassName,
        )}
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <Icon
          icon="ph:pencil-simple"
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100 group-disabled:hidden"
        />
      </button>
    );
  },
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
