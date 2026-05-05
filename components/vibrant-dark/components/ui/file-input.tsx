"use client"

import * as React from "react"
import { Upload, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileInputProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onFilesChange?: (files: File[]) => void
  disabled?: boolean
  className?: string
}

function FileInput({ accept, multiple, maxSize, onFilesChange, disabled, className }: FileInputProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [dragging, setDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const arr = Array.from(newFiles).filter((f) => !maxSize || f.size <= maxSize)
    const merged = multiple ? [...files, ...arr] : arr
    setFiles(merged)
    onFilesChange?.(merged)
  }

  const removeFile = (name: string) => {
    const updated = files.filter((f) => f.name !== name)
    setFiles(updated)
    onFilesChange?.(updated)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center",
          "transition-colors duration-150",
          dragging ? "border-primary bg-primary/10" : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Click or drag files here</p>
          {maxSize && (
            <p className="text-xs text-muted-foreground mt-0.5">Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB</p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
          className="sr-only"
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((file) => (
            <div key={file.name} className="flex items-center gap-2 rounded-xl bg-card px-3 py-2">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button type="button" onClick={() => removeFile(file.name)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { FileInput }
export type { FileInputProps }
