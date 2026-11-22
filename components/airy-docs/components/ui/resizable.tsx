"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Resizable: panels split by a hairline, the way a docs page
 * splits prose from a live code panel. The line turns green while you drag
 * it, and its grab area is wider than the line. `withHandle` adds a small
 * white grip in the middle.
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

/** The line between two panels; drag it, or focus it and use the arrow keys. */
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
      "group/handle relative flex w-px shrink-0 items-center justify-center bg-border outline-none",
      "transition-colors duration-fast",
      "after:absolute after:inset-y-0 after:-inset-x-1.5",
      "data-[resize-handle-state=hover]:bg-(--line-strong) data-[resize-handle-state=drag]:bg-primary",
      "focus-visible:bg-primary",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:-inset-y-1.5",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-5 w-3.5 items-center justify-center rounded-sm border border-border bg-background group-data-[panel-group-direction=vertical]/handle:rotate-90">
        <Icon
          icon="feather:more-vertical"
          aria-hidden="true"
          className="size-3 text-muted-foreground"
        />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
