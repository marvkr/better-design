"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Ops Sharp TagInput - a field-surface well that holds removable tag chips plus
// a free-text input. Enter or comma commits a tag; Backspace on an empty input
// pops the last one. The well takes the field border + inset + focus-within
// ring so it tracks the rest of the form set.

interface TagInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

function TagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  maxTags,
  className,
  disabled,
  ...props
}: TagInputProps) {
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed) && (!maxTags || value.length < maxTags)) {
      onChange?.([...value, trimmed]);
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5",
        "[box-shadow:var(--shadow-inset)]",
        "transition-[border-color,box-shadow] duration-fast hover:border-ring/30",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25",
        "cursor-text",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-foreground"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={value.length === 0 ? placeholder : undefined}
        disabled={disabled || (maxTags !== undefined && value.length >= maxTags)}
        className="flex-1 min-w-[7.5rem] bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}

export { TagInput };
export type { TagInputProps };
