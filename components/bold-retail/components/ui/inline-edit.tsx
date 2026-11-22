"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface InlineEditProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  disabled?: boolean;
}

/**
 * Bold retail InlineEdit: text that reads as text until you press it. At
 * rest a soft grey fill sits under the pointer and a pencil fades in;
 * pressed, it becomes a compact checkout field. Enter or leaving the field
 * saves, and Escape puts the old text back.
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
          className={cn(formFieldBase, formFieldSingleLine, "h-9 px-3 py-1.5", className)}
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
          "group -mx-3 inline-flex max-w-full items-center gap-2 rounded-md px-3 py-1.5 text-start text-base text-foreground",
          "transition-colors duration-fast ease-out",
          "hover:bg-secondary active:bg-(--secondary-hover)",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-(--foreground-disabled)",
          displayClassName,
        )}
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <Icon
          icon="mingcute:edit-line"
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100 group-disabled:hidden"
        />
      </button>
    );
  },
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
