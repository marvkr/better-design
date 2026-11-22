"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Resizable: panels split by a warm hairline, like the rule
 * between two columns of a page. The line darkens under the pointer and
 * while dragged, and its grab area is wider than it looks. With
 * `withHandle`, a small paper tab sits in the middle of the line.
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    data-slot="resizable-panel-group"
    className={cn(
      "flex size-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

/** The dividing line between two panels; drag it or move it with arrow keys. */
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
      "group/handle relative flex w-px shrink-0 items-center justify-center bg-border",
      "transition-colors duration-fast ease-out",
      "after:absolute after:inset-y-0 after:-inset-x-1",
      "data-[resize-handle-state=hover]:bg-(--line-strong) data-[resize-handle-state=drag]:bg-(--control)",
      "outline-none focus-visible:ring-3 focus-visible:ring-ring",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:-inset-y-1",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-6 w-3.5 items-center justify-center rounded-sm border border-(--line-strong) bg-(--field) group-data-[panel-group-direction=vertical]/handle:rotate-90">
        <Icon
          icon="ph:dots-three"
          aria-hidden="true"
          className="size-3 rotate-90 text-muted-foreground"
        />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
