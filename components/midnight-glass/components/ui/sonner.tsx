"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const SonnerToaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:backdrop-blur-2xl group-[.toaster]:bg-white/[0.07] group-[.toaster]:text-foreground group-[.toaster]:border-white/[0.08] group-[.toaster]:shadow-[0_0.5rem_2rem_oklch(0_0_0/0.6),inset_0_0_0.5rem_oklch(1_0_0/0.05)] group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-full",
          cancelButton:
            "group-[.toast]:bg-white/[0.05] group-[.toast]:text-muted-foreground group-[.toast]:rounded-full",
        },
      }}
      {...props}
    />
  )
}

export { SonnerToaster }
