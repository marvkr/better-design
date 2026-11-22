"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

export interface TagInputProps {
  value: string[];
  onValueChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxTags?: number;
}

/**
 * Cream editorial TagInput: a pale paper field that grows as tags are
 * added. Each tag is a flat oat pill with a small remove button. Enter or
 * a comma adds the typed text, and Backspace in an empty field removes the
 * last tag. Focus edges the whole field in terracotta, like any input.
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
          "flex min-h-10 cursor-text flex-wrap items-center gap-1.5 px-2 py-1.5",
          "focus-within:border-primary focus-within:ring-3 focus-within:ring-ring",
          "data-[disabled]:cursor-not-allowed data-[disabled]:bg-secondary data-[disabled]:text-(--foreground-disabled) data-[disabled]:hover:border-(--line-strong)",
          className,
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            data-slot="tag-input-chip"
            className={cn(
              "inline-flex h-6 max-w-48 items-center gap-1 rounded-full bg-muted ps-2.5 pe-1 text-xs font-medium text-foreground",
              disabled && "bg-transparent pe-2.5 text-(--foreground-disabled)",
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
                  "inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground",
                  "transition-colors duration-fast ease-out",
                  "hover:bg-(--line-strong) hover:text-foreground",
                  "outline-none focus-visible:ring-3 focus-visible:ring-ring",
                )}
              >
                <Icon icon="ph:x" className="size-3" aria-hidden="true" />
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
          className="h-7 min-w-20 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
    );
  },
);
TagInput.displayName = "TagInput";

export { TagInput };
