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

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    return (
      <div className="w-full">
        <label
          className={cn(
            "group flex flex-col items-center justify-center gap-2 w-full py-6 px-4",
            "rounded-lg border border-dashed border-border",
            "bg-card text-card-foreground cursor-pointer",
            "transition-[background-color,box-shadow,border-color] duration-150",
            "[box-shadow:var(--shadow-s)]",
            "hover:border-ring/60 hover:bg-accent hover:[box-shadow:var(--shadow-m)]",
            className
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary [box-shadow:var(--shadow-s)]">
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
            type="file"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              setFileName(file?.name ?? null)
              props.onChange?.(e)
            }}
            {...props}
          />
        </label>
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
