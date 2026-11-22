"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/*
 * Interior InlineEdit — reads as plain text until clicked, then becomes the
 * field: the same recessed well every input uses, which autofocus lifts to
 * the surface with an accent border. Enter commits, Escape reverts. Both
 * states share the field's footprint so the row never shifts.
 */

export interface InlineEditProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  ({ className, value, onChange, placeholder = "Empty", ...props }, ref) => {
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(value);

    React.useEffect(() => setDraft(value), [value]);

    const commit = () => {
      setEditing(false);
      onChange?.(draft);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commit}
            onKeyDown={(event) => {
              if (event.key === "Enter") commit();
              if (event.key === "Escape") {
                setDraft(value);
                setEditing(false);
              }
            }}
            className={cn(formFieldBase, formFieldSingleLine)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={cn(
              "flex h-10 w-full items-center rounded-[0.625rem] border-2 border-transparent px-3 text-left text-[0.8125rem] leading-[1.25rem]",
              "transition-[background-color,box-shadow] duration-fast",
              "hover:bg-secondary",
              "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
              !value && "text-muted-foreground",
            )}
          >
            {value || placeholder}
          </button>
        )}
      </div>
    );
  },
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
