"use client"

import { useRouter } from "next/navigation"

export function BackButton({ fallbackHref = "/" }: { fallbackHref?: string }) {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back()
        } else {
          router.push(fallbackHref)
        }
      }}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
    >
      ← Back
    </button>
  )
}
