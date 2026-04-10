import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

// Dynamic Pagination: pill-shaped, solid primary for active page

interface PaginationProps {
  page: number
  total: number
  onChange?: (page: number) => void
  siblings?: number
  className?: string
}

function getPages(page: number, total: number, siblings: number) {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const totalShown = siblings * 2 + 5
  if (total <= totalShown) return range(1, total)

  const leftStart = Math.max(2, page - siblings)
  const rightEnd = Math.min(total - 1, page + siblings)
  const showLeft = leftStart > 2
  const showRight = rightEnd < total - 1

  const pages: (number | "...")[] = [1]
  if (showLeft) pages.push("...")
  pages.push(...range(leftStart, rightEnd))
  if (showRight) pages.push("...")
  pages.push(total)
  return pages
}

function Pagination({ page, total, onChange, siblings = 1, className }: PaginationProps) {
  const pages = getPages(page, total, siblings)

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Pagination">
      <button
        onClick={() => onChange?.(page - 1)}
        disabled={page <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-foreground transition-all hover:bg-secondary/80 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onChange?.(p)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium",
              "transition-all duration-150 active:scale-[0.97]",
              p === page
                ? "bg-primary text-primary-foreground shadow-[0_4px_14px_0_hsl(212_100%_47%/0.4)]"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange?.(page + 1)}
        disabled={page >= total}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-foreground transition-all hover:bg-secondary/80 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export { Pagination }
export type { PaginationProps }
