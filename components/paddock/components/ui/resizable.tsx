"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { raisedSurface } from "./_shared";

/**
 * Paddock Resizable: panels split by the cool 1px border. While dragged or
 * focused the border darkens; the optional grip is a small raised white
 * tile with a 1px border.
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

/** One panel inside the group. */
const ResizablePanel = ResizablePrimitive.Panel;

/** The divider between two panels, with an optional grip tile. */
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
      "data-[resize-handle-state=drag]:bg-foreground focus-visible:bg-ring",
      "data-[panel-group-direction=vertical]:h-0.25 data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className={cn(raisedSurface, "z-10 flex h-6 w-3.5 items-center justify-center rounded-sm")}>
        <Icon icon="mingcute:dots-line" className="size-3 rotate-90 text-muted-foreground" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
