"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for text that turns into a field when clicked. */
export interface InlineEditProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  disabled?: boolean;
}

/**
 * Paddock InlineEdit: plain text, like a patient name on a visit row, that
 * becomes the white field when clicked. Enter or leaving the field saves; Escape
 * cancels.
 */
const InlineEdit = React.forwardRef<HTMLInputElement, InlineEditProps>(
  (
    { value, onValueChange, placeholder = "Click to edit", className, displayClassName, disabled },
    ref,
  ) => {
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(value);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // SAFETY: the handle is read only after mount, when the element this
    // component renders is attached, so the ref is non-null.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (editing) inputRef.current?.select();
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
        <input
          ref={inputRef}
          data-slot="inline-edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            else if (e.key === "Escape") cancel();
          }}
          placeholder={placeholder}
          className={cn(formFieldBase, formFieldSingleLine, "h-9 px-3 text-[0.9375rem]", className)}
        />
      );
    }

    return (
      <button
        type="button"
        data-slot="inline-edit"
        onClick={start}
        disabled={disabled}
        className={cn(
          "group inline-flex h-9 items-center gap-2 rounded-md px-3 text-left text-[0.9375rem] font-medium text-foreground",
          "transition-colors duration-fast ease-out hover:bg-accent",
          focusRing,
          "disabled:cursor-not-allowed disabled:opacity-50",
          displayClassName,
        )}
      >
        <span className={cn(!value && "font-normal text-muted-foreground")}>{value || placeholder}</span>
        <Icon
          icon="mingcute:edit-2-line"
          aria-hidden="true"
          className="size-3.5 text-muted-foreground opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </button>
    );
  },
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
