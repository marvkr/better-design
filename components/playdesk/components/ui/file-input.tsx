"use client";

import * as React from "react";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Playdesk FileInput — a dashed drop well that lights up in sky blue when a
 * file is dragged over the desk.
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
          "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl px-6 py-8 text-center",
          "border-2 border-dashed border-border bg-card",
          "transition-colors duration-fast",
          "hover:border-foreground/25",
          dragging && "border-ring bg-accent",
          className,
        )}
      >
        <Upload className="size-5 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {fileName ?? label}
        </span>
        {!fileName ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
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
