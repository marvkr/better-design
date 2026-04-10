"use client"

import * as React from "react"
import { Paperclip, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FileInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSizeMB?: number
  value?: File[]
  onChange?: (files: File[]) => void
  disabled?: boolean
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const FileInput = React.forwardRef<HTMLDivElement, FileInputProps>(
  (
    {
      accept,
      multiple = false,
      maxFiles = 10,
      maxSizeMB,
      value: controlledFiles,
      onChange,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalFiles, setInternalFiles] = React.useState<File[]>([])
    const [dragging, setDragging] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const files = controlledFiles ?? internalFiles

    const addFiles = (incoming: FileList | null) => {
      if (!incoming) return
      const arr = Array.from(incoming).filter((f) => {
        if (maxSizeMB && f.size > maxSizeMB * 1024 * 1024) return false
        return true
      })
      const next = multiple
        ? [...files, ...arr].slice(0, maxFiles)
        : arr.slice(0, 1)
      setInternalFiles(next)
      onChange?.(next)
    }

    const removeFile = (index: number) => {
      const next = files.filter((_, i) => i !== index)
      setInternalFiles(next)
      onChange?.(next)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(false)
      if (!disabled) addFiles(e.dataTransfer.files)
    }

    return (
      <div ref={ref} className={cn("w-full space-y-3", className)} {...props}>
        {/* Drop zone */}
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            if (!disabled) setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onKeyDown={(e) =>
            e.key === "Enter" && !disabled && inputRef.current?.click()
          }
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-2xl",
            "border-2 border-dashed border-border bg-secondary/30",
            "px-6 py-10 text-center cursor-pointer transition-colors",
            dragging && "border-foreground bg-secondary/50",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "hover:border-foreground/50 hover:bg-secondary/50",
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary border border-border text-muted-foreground">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Drop files here or click to upload
            </p>
            {maxSizeMB && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Max {maxSizeMB} MB per file
              </p>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-3 py-2.5"
              >
                <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(file.size)}
                  </p>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${file.name}`}
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
