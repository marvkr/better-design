"use client";

import * as React from "react";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior FileInput — a drop target is a well: a recessed slot at the field
 * radius with a dashed edge saying "something goes here". Accent marks the
 * drag, per the color rules; a chosen file is news the label carries, not a
 * color change.
 */

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  hint?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    { className, label = "Drop a file here", hint = "or click to browse", ...props },
    ref,
  ) => {
    const [dragging, setDragging] = React.useState(false);
    const [fileName, setFileName] = React.useState<string | null>(null);

    return (
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[0.625rem] px-6 py-8 text-center",
          "border-2 border-dashed border-border bg-input",
          "shadow-[var(--shadow-well)]",
          "transition-[background-color,border-color,box-shadow] duration-fast",
          "hover:border-foreground/30",
          "focus-within:border-ring focus-within:bg-card focus-within:shadow-none",
          dragging && "border-ring bg-accent shadow-none",
          className,
        )}
      >
        <Upload className="size-5 text-muted-foreground" strokeWidth={1.5} />
        <span className="text-[0.8125rem] font-medium text-foreground">
          {fileName ?? label}
        </span>
        {!fileName ? (
          <span className="text-[0.7188rem] text-muted-foreground">{hint}</span>
        ) : null}
        <input
          ref={ref}
          type="file"
          className="sr-only"
          onChange={(event) =>
            setFileName(event.target.files?.[0]?.name ?? null)
          }
          {...props}
        />
      </label>
    );
  },
);
FileInput.displayName = "FileInput";

export { FileInput };
