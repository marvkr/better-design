"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, label = "Choose file or drop here", helperText, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // SAFETY: the handle is read only after mount, when the element this
    // component renders is attached, so the ref is non-null.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    return (
      <div className="w-full">
        <label
          className={cn(
            "group flex flex-col items-center justify-center gap-2 w-full py-6 px-4",
            "rounded-xl border border-dashed border-border",
            "bg-input text-foreground cursor-pointer",
            "transition-[background-color,box-shadow,border-color] duration-fast",
            "[box-shadow:var(--shadow-inset)]",
            "hover:border-ring hover:[box-shadow:var(--shadow-inset-deep)]",
            className
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground bg-[image:var(--pill-gradient)] [box-shadow:var(--shadow-pill)] transition-[background-image,box-shadow] duration-fast group-hover:bg-[image:var(--pill-gradient-hover)] group-hover:[box-shadow:var(--shadow-pill-hover)]">
            <Icon icon="tabler:upload" className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-foreground">
            {fileName ?? label}
          </span>
          {helperText && (
            <span className="text-xs text-muted-foreground">{helperText}</span>
          )}
          <input
            ref={inputRef}
            {...props}
            type="file"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              setFileName(file?.name ?? null)
              props.onChange?.(e)
            }}
          />
        </label>
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
