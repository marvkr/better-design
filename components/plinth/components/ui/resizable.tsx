"use client"

import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

/* A hairline divider; the grip is a small graphite keycap that turns
   ember while it is dragged or focused. */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "group/handle relative flex w-px items-center justify-center bg-border",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "data-[resize-handle-state=drag]:bg-primary",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full",
      "data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-5 w-3 items-center justify-center rounded-[0.3125rem] text-muted-foreground [background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)] group-data-[resize-handle-state=drag]/handle:text-primary">
        <MoreVerticalIcon className="size-3" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

// feather:more-vertical
function MoreVerticalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></g>
    </svg>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
