"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value: controlledTags,
      onChange,
      placeholder = "Add tag…",
      disabled = false,
      maxTags,
      className,
      ...props
    },
    ref
  ) => {
    const [internalTags, setInternalTags] = React.useState<string[]>([])
    const [inputValue, setInputValue] = React.useState("")
    const tags = controlledTags ?? internalTags

    const setTags = (next: string[]) => {
      setInternalTags(next)
      onChange?.(next)
    }

    const addTag = (raw: string) => {
      const tag = raw.trim()
      if (!tag || tags.includes(tag)) return
      if (maxTags !== undefined && tags.length >= maxTags) return
      setTags([...tags, tag])
      setInputValue("")
    }

    const removeTag = (index: number) => {
      setTags(tags.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
        removeTag(tags.length - 1)
      }
    }

    const isAtMax = maxTags !== undefined && tags.length >= maxTags

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[44px] w-full flex-wrap items-center gap-1.5",
          "rounded-xl border border-border bg-background px-3 py-2",
          "focus-within:border-ring transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 rounded-lg bg-foreground px-2 py-0.5 text-xs font-medium text-background"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                aria-label={`Remove ${tag}`}
                className="ml-0.5 opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
        {!isAtMax && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addTag(inputValue)}
            disabled={disabled}
            placeholder={tags.length === 0 ? placeholder : ""}
            className={cn(
              "min-w-[80px] flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none",
            )}
          />
        )}
      </div>
    )
  }
)
TagInput.displayName = "TagInput"

export { TagInput }
