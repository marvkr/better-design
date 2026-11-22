"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { softPanel } from "./_shared";

/**
 * Mallow Resizable: panels split by a hairline that turns to the violet focus
 * colour while dragged or focused. The optional grip is a small violet-tinted pill.
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    data-slot="resizable-panel-group"
    className={cn("flex size-full data-[panel-group-direction=vertical]:flex-col", className)}
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
    data-slot="resizable-handle"
    className={cn(
      "relative flex w-0.25 items-center justify-center bg-border outline-none",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2",
      "transition-colors duration-fast",
      "data-[resize-handle-state=drag]:bg-ring focus-visible:bg-ring",
      "data-[panel-group-direction=vertical]:h-0.25 data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className={cn(softPanel, "z-10 flex h-6 w-3.5 items-center justify-center rounded-full")}>
        <Icon icon="iconoir:more-vert" aria-hidden="true" className="size-3 text-muted-foreground" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
