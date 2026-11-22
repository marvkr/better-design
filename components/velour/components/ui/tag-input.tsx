"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/* A recessed velvet well holding raised velour tag chips. */

interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
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
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !value.includes(trimmed) && (!maxTags || value.length < maxTags)) {
      onChange?.([...value, trimmed])
      setInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter((t) => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div
      className={cn(
        formFieldBase,
        "flex min-h-9 flex-wrap gap-1.5 rounded-lg py-1.5",
        "focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/25",
        "cursor-text",
        disabled && "cursor-not-allowed opacity-70",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-secondary-foreground [background-image:var(--velour-raised)] [box-shadow:var(--shadow-s)]"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
              className="text-muted-foreground transition-colors duration-fast hover:text-foreground"
            >
              <Icon icon="tabler:x" className="h-3 w-3" />
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
        className="min-w-[7.5rem] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  )
}

export { TagInput }
export type { TagInputProps }
