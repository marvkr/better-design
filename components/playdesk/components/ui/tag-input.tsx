"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Playdesk TagInput — committed values become small pills inside the recessed
 * field, matching the Badge shape.
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
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg px-2 py-1.5",
          "border border-border bg-input",
          "[box-shadow:var(--shadow-inset)]",
          "transition-[box-shadow,border-color] duration-fast ease-out",
          "focus-within:border-ring focus-within:ring-[0.1875rem] focus-within:ring-ring/25",
          className,
        )}
        {...props}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => commit(tags.filter((item) => item !== tag))}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length ? undefined : placeholder}
          className="min-w-24 flex-1 bg-transparent px-1.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    );
  },
);
TagInput.displayName = "TagInput";

export { TagInput };
