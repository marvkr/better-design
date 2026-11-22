"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard TagInput: recessed shell holding raised chip tags.

interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ className, value, onChange, placeholder = "Add tag", maxTags, disabled, ...props }, ref) => {
    const [internalTags, setInternalTags] = React.useState<string[]>(value ?? []);
    const [draft, setDraft] = React.useState("");
    const tags = value ?? internalTags;

    const commit = (next: string[]) => {
      setInternalTags(next);
      onChange?.(next);
    };

    const addTag = () => {
      const tag = draft.trim();
      if (!tag || tags.includes(tag)) return;
      if (maxTags !== undefined && tags.length >= maxTags) return;
      commit([...tags, tag]);
      setDraft("");
    };

    const removeTag = (index: number) => {
      commit(tags.filter((_, i) => i !== index));
    };

    return (
      <div
        className={cn(
          formFieldBase,
          "flex min-h-9 flex-wrap items-center gap-1.5 rounded-lg px-2 py-1.5",
          "focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/35",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {tags.map((tag, index) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {tag}
            <button
              type="button"
              disabled={disabled}
              onClick={() => removeTag(index)}
              aria-label={`Remove ${tag}`}
              className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={ref}
          value={draft}
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ""}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag();
            } else if (e.key === "Backspace" && !draft && tags.length > 0) {
              removeTag(tags.length - 1);
            }
          }}
          onBlur={addTag}
          className="h-6 min-w-[5rem] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          {...props}
        />
      </div>
    );
  }
);
TagInput.displayName = "TagInput";

export { TagInput };
export type { TagInputProps };
