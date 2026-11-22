"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk InlineEdit — reads as plain text until clicked, then becomes the
 * recessed field. Enter commits, Escape reverts.
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
            className={cn(
              "h-9 w-full rounded-lg border border-ring bg-input px-2.5 text-sm outline-none",
              "ring-[0.1875rem] ring-ring/25",
            )}
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={cn(
              "flex h-9 w-full items-center rounded-lg px-2.5 text-left text-sm",
              "transition-colors duration-fast hover:bg-foreground/[0.05]",
              "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
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
