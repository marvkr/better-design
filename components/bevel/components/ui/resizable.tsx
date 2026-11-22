"use client"

import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Resizable.
 *
 * The seam between two panels is one pixel of the track token, the same rule
 * that separates a run of rows, so a split view reads as one card cut in two.
 * The optional grip is a small round chip on the card surface with the button
 * shadow, and the hit area stays wider than the line it draws.
 */

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-[var(--track)]",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2",
      "transition-colors duration-fast ease-out",
      "hover:bg-[var(--primary)] data-[resize-handle-state=drag]:bg-[var(--primary)]",
      "focus-visible:outline-none focus-visible:bg-[var(--primary)]",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "z-10 flex size-[1.375rem] items-center justify-center rounded-full",
          "bg-card text-muted-foreground [box-shadow:var(--shadow-button)]",
        )}
      >
        <Icon icon="solar:menu-dots-linear" className="size-3.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
