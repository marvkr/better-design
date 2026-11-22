"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

/**
 * Margin TagInput: the grey filled field collecting soft oxblood tag chips, the
 * same chips as the tag bar above a note. Enter or a comma adds a tag;
 * Backspace on an empty input removes the last one.
 */
export interface TagInputProps {
  value: string[];
  onValueChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** The most tags the field accepts; further entries are ignored. */
  maxTags?: number;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onValueChange, placeholder = "Add tag...", className, disabled, maxTags }, ref) => {
    const [input, setInput] = React.useState("");

    const addTag = (tag: string) => {
      const trimmed = tag.trim();
      if (!trimmed || value.includes(trimmed)) return;
      if (maxTags && value.length >= maxTags) return;
      onValueChange([...value, trimmed]);
      setInput("");
    };

    const removeTag = (tag: string) => {
      onValueChange(value.filter((t) => t !== tag));
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(input);
      } else if (e.key === "Backspace" && !input && value.length > 0) {
        removeTag(value[value.length - 1]);
      }
    };

    return (
      <div
        data-slot="tag-input"
        className={cn(
          formFieldBase,
          "flex min-h-7.5 flex-wrap items-center gap-1 px-1 py-0.5",
          "focus-within:border-primary/45 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-6 items-center gap-0.5 rounded-md bg-(--mark) pl-2 pr-0.5 text-xs font-medium text-(--mark-foreground)"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className={cn(
                "flex size-5 items-center justify-center rounded-sm text-current opacity-55",
                "transition duration-fast ease-(--ease-out) hover:bg-primary/12 hover:opacity-100",
                "outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label={`Remove ${tag}`}
              disabled={disabled}
            >
              <Icon icon="solar:close-circle-linear" className="size-3.5" aria-hidden />
            </button>
          </span>
        ))}
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled}
          className="h-6 min-w-20 flex-1 bg-transparent px-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
    );
  },
);
TagInput.displayName = "TagInput";

export { TagInput };
