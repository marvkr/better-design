"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for InlineEdit: a controlled text value that edits in place. */
export interface InlineEditProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  disabled?: boolean;
}

/**
 * Playful console InlineEdit: text that reads as text until you press it,
 * like renaming an insight in place. At rest it takes a cream wash under the
 * pointer and a pencil fades in; pressed, it becomes a compact white well.
 * Enter or leaving the field saves, and Escape puts the old text back.
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
          className={cn(formFieldBase, formFieldSingleLine, "h-8 px-2 py-1 font-semibold", className)}
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
          "group -mx-2 inline-flex max-w-full items-center gap-2 rounded-md px-2 py-1 text-start text-sm font-semibold text-foreground",
          "transition-colors duration-fast ease-out",
          "hover:bg-secondary active:bg-(--surface-3)",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-(--foreground-disabled)",
          displayClassName,
        )}
      >
        <span className={cn("truncate", !value && "font-normal text-muted-foreground")}>
          {value || placeholder}
        </span>
        <Icon
          icon="ph:pencil-simple-duotone"
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100 group-disabled:hidden"
        />
      </button>
    );
  },
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
