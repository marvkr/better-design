"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Burnished InlineEdit: plain text that becomes a graphite bevel field when
 * clicked. Enter or leaving the field saves; Escape cancels.
 */
export interface InlineEditProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  disabled?: boolean;
}

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
          className={cn(formFieldBase, formFieldSingleLine, className)}
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
          "group inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[0.9375rem]",
          "transition-colors duration-fast",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent",
          focusRing,
          "disabled:cursor-not-allowed disabled:opacity-50",
          displayClassName,
        )}
      >
        <span className={cn(!value && "text-muted-foreground")}>{value || placeholder}</span>
        <Icon
          icon="ph:pencil-simple"
          aria-hidden
          className="size-3.5 text-muted-foreground opacity-0 transition-opacity duration-fast group-focus-visible:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
        />
      </button>
    );
  },
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
