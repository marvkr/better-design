"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, raisedBevel } from "./_shared";

/**
 * Burnished TagInput: a graphite bevel field that collects small bevelled
 * pills. Enter or a comma adds a tag; Backspace on an empty input removes
 * the last one.
 */
export interface TagInputProps {
  value: string[];
  onValueChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
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
          "flex min-h-12 flex-wrap items-center gap-1.5 px-2 py-2",
          "focus-within:shadow-(--bevel-raised-focus) focus-within:ring-3 focus-within:ring-ring",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className={cn("inline-flex h-7 items-center gap-1 rounded-full pl-3 pr-1 text-[0.8125rem] font-medium", raisedBevel)}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className={cn(
                "flex size-5 items-center justify-center rounded-full text-muted-foreground",
                "transition-colors duration-fast",
                "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label={`Remove ${tag}`}
              disabled={disabled}
            >
              <Icon icon="ph:x" className="size-3" />
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
          className="min-w-20 flex-1 bg-transparent px-2 text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
    );
  },
);
TagInput.displayName = "TagInput";

export { TagInput };
