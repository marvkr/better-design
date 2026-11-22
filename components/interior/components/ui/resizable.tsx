"use client";

import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

/*
 * Interior Resizable — the handle is a hairline compartment edge until you
 * take hold of it: accent blue marks the drag, because accent is for
 * interaction and state, never decoration. The optional grip is a small cap.
 */

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex size-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "group relative flex w-px items-center justify-center bg-border",
      "transition-colors duration-fast",
      "hover:bg-ring/40",
      "data-[resize-handle-state=drag]:bg-ring",
      "focus-visible:outline-none focus-visible:bg-ring",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      className,
    )}
    {...props}
  >
    {withHandle ? (
      <div className="z-10 flex h-5 w-3 items-center justify-center rounded-[0.3125rem] bg-card shadow-[var(--shadow-cap)]">
        <GripVertical
          strokeWidth={1.5}
          className="size-2.5 text-muted-foreground transition-colors duration-fast group-data-[resize-handle-state=drag]:text-accent-foreground"
        />
      </div>
    ) : null}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
