"use client"

import { Icon } from "@iconify/react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

// Glassmorphic Dark Resizable panels

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
      "relative flex w-px items-center justify-center",
      "bg-white/[0.08]",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      "hover:bg-[oklch(0.65_0.19_250)]/30 transition-colors duration-base",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[oklch(0.65_0.19_250)]/50 focus-visible:ring-offset-1",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1",
      "data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2",
      "data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "z-10 flex h-5 w-4 items-center justify-center rounded-full",
          "backdrop-blur-xl bg-white/[0.10] border border-white/10",
          "shadow-[0_0_0.5rem_color-mix(in_oklch,var(--primary)_20%,transparent),inset_0_0_0.25rem_oklch(1_0_0/0.06)]",
          "transition-all duration-base",
          "hover:bg-white/[0.16] hover:shadow-[0_0_0.75rem_color-mix(in_oklch,var(--primary)_35%,transparent)]"
        )}
      >
        <Icon icon="tabler:grip-vertical" className="h-2.5 w-2.5 text-white/50" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
