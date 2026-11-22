"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

/** Props for TagInput: a controlled list of tags with an optional cap. */
export interface TagInputProps {
  value: string[];
  onValueChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxTags?: number;
}

/**
 * Playful console TagInput: a white well that grows as tags are added, like
 * filter chips on an analytics query. Each tag is a pill in the orange wash
 * with the orange rim and a small remove button. Enter or a comma adds the
 * typed text, and Backspace in an empty field removes the last tag.
 */
const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Add a tag",
      className,
      disabled,
      maxTags,
    },
    ref,
  ) => {
    const [input, setInput] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const full = maxTags !== undefined && value.length >= maxTags;

    // SAFETY: inputRef is attached to the input this component always renders,
    // so it is set by the time a parent can reach the handle.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const addTag = (tag: string) => {
      const trimmed = tag.trim();
      if (!trimmed || value.includes(trimmed) || full) return;
      onValueChange([...value, trimmed]);
      setInput("");
    };

    const removeTag = (tag: string) => {
      onValueChange(value.filter((t) => t !== tag));
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault();
        addTag(input);
      } else if (event.key === "Backspace" && !input && value.length > 0) {
        removeTag(value[value.length - 1]);
      }
    };

    return (
      <div
        data-slot="tag-input"
        data-disabled={disabled || undefined}
        onClick={() => inputRef.current?.focus()}
        className={cn(
          formFieldBase,
          "flex min-h-9 cursor-text flex-wrap items-center gap-1.5 px-1.5 py-1",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-(--highlight-blue)",
          "data-[disabled]:cursor-not-allowed data-[disabled]:bg-secondary data-[disabled]:text-(--foreground-disabled) data-[disabled]:hover:border-(--line-strong)",
          className,
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            data-slot="tag-input-chip"
            className={cn(
              "inline-flex h-6 max-w-48 items-center gap-1 rounded-full border border-(--primary-rim) bg-(--primary-wash) ps-2.5 pe-1 text-xs font-bold text-foreground",
              disabled && "border-(--line-strong) bg-transparent pe-2.5 text-(--foreground-disabled)",
            )}
          >
            <span className="truncate">{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeTag(tag);
                }}
                aria-label={`Remove ${tag}`}
                className={cn(
                  "inline-flex size-4 shrink-0 items-center justify-center rounded-full text-(--foreground-secondary)",
                  "transition-colors duration-fast ease-out",
                  "hover:bg-primary hover:text-primary-foreground",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
                )}
              >
                <Icon icon="ph:x-bold" className="size-2.5" aria-hidden="true" />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(input)}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled}
          aria-label={placeholder}
          className="h-6 min-w-20 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
    );
  },
);
TagInput.displayName = "TagInput";

export { TagInput };
