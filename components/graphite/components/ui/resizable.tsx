"use client"

import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
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
      "relative flex w-px items-center justify-center bg-border",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      "transition-colors duration-fast",
      "hover:bg-ring focus-visible:bg-ring focus-visible:outline-none",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "z-10 flex h-5 w-3.5 items-center justify-center rounded-full",
          "bg-[image:var(--pill-gradient)] hover:bg-[image:var(--pill-gradient-hover)]",
          "border border-border [box-shadow:var(--shadow-pill)] hover:[box-shadow:var(--shadow-pill-hover)]",
          "transition-[box-shadow,background] duration-fast"
        )}
      >
        <Icon
          icon="tabler:grip-vertical"
          className="h-2.5 w-2.5 text-primary-foreground"
        />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
