"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior TagInput — the field owns the border. The wrapper is the recessed
 * well, lifted to a white fill with an accent border when anything inside it
 * has focus; the inner input owns nothing. Committed tags are filled 6px
 * chips picked out of the well with the row shadow, never outlined.
 */

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  ({ className, value, onChange, placeholder = "Add a tag", ...props }, ref) => {
    const [internal, setInternal] = React.useState<string[]>(value ?? []);
    const [draft, setDraft] = React.useState("");
    const tags = value ?? internal;

    const commit = (next: string[]) => {
      setInternal(next);
      onChange?.(next);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && draft.trim()) {
        event.preventDefault();
        commit([...tags, draft.trim()]);
        setDraft("");
      }
      if (event.key === "Backspace" && !draft && tags.length) {
        commit(tags.slice(0, -1));
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-[0.625rem] px-2 py-1.5",
          "border-2 border-border bg-input",
          "shadow-[var(--shadow-well)]",
          "transition-[background-color,border-color,box-shadow] duration-fast",
          "focus-within:border-ring focus-within:bg-card focus-within:shadow-none",
          className,
        )}
        {...props}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-[0.375rem] bg-secondary px-2 py-0.5 text-[0.7188rem] font-medium text-secondary-foreground shadow-[var(--shadow-row)]"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => commit(tags.filter((item) => item !== tag))}
              className="text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
            >
              <X className="size-3" strokeWidth={1.5} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length ? undefined : placeholder}
          className="min-w-24 flex-1 bg-transparent px-1 text-[0.8125rem] text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
    );
  },
);
TagInput.displayName = "TagInput";

export { TagInput };
