"use client";

import * as React from "react";
import { File as FileIcon, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";

// Talentboard FileInput: dashed recessed drop well; hover lifts the border to orange.

interface FileInputProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string;
  multiple?: boolean;
  onFileChange?: (files: File[]) => void;
  disabled?: boolean;
  maxSize?: number; // in bytes
}

function FileInput({
  className,
  accept,
  multiple,
  onFileChange,
  disabled,
  maxSize,
  ...props
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    let next = Array.from(incoming);
    if (maxSize) next = next.filter((f) => f.size <= maxSize);
    const merged = multiple ? [...files, ...next] : next.slice(0, 1);
    setFiles(merged);
    onFileChange?.(merged);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFileChange?.(next);
  };

  return (
    <div className={cn("w-full space-y-2", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-8",
          "border border-dashed border-border bg-input/50 shadow-[var(--tb-shadow-inset)]",
          "text-center transition-colors duration-fast",
          "hover:border-ring/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          dragging && "border-ring/70 bg-accent/40",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground shadow-[var(--tb-shadow-raise)]">
          <Upload className="h-4 w-4" />
        </span>
        <div className="text-sm text-foreground">
          Drop files here or <span className="font-medium text-primary">browse</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {accept ? `Accepts ${accept}` : "Any file type"}
          {maxSize ? `, up to ${Math.round(maxSize / 1024 / 1024)}MB` : ""}
        </div>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 text-sm shadow-[var(--tb-shadow-sm)]"
            >
              <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-foreground">{file.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { FileInput };
export type { FileInputProps };
