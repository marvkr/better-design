"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Resizable: panels split by the grey hairline. The line turns
 * darker grey under the pointer and black while you drag it, and its grab
 * area is wider than the line. With `withHandle`, a small white pill on the
 * thumb shadow sits in the middle of the line.
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
      "data-[resize-handle-state=hover]:bg-(--control) data-[resize-handle-state=drag]:bg-primary",
      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:-inset-y-1",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-6 w-3.5 items-center justify-center rounded-full bg-(--thumb) shadow-(--shadow-thumb) group-data-[panel-group-direction=vertical]/handle:rotate-90">
        <Icon
          icon="mingcute:dots-vertical-line"
          aria-hidden="true"
          className="size-3 text-foreground"
        />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
