import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { buttonVariants } from "./button"

/*
 * Plinth Pagination: the pages sit in one recessed track, like the editor's
 * segmented switch. The current page is the raised segment; the others are
 * quiet keys in the well.
 */

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(
        "flex flex-row items-center gap-0.5 rounded-xl bg-input p-1 [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    />
  )
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("flex", className)} {...props} />
)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<VariantProps<typeof buttonVariants>, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "inline-flex h-8 cursor-pointer select-none items-center justify-center gap-1 rounded-[0.625rem] font-mono text-xs tabular-nums",
      "transition-[background,box-shadow,color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      size === "icon" || size === "icon-sm" ? "min-w-8 px-2" : "px-2.5",
      isActive
        ? "text-foreground [background:var(--segment-gradient)] [box-shadow:var(--shadow-segment)]"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("pl-1.5 font-sans", className)} {...props}>
    <ChevronLeftIcon className="size-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("pr-1.5 font-sans", className)} {...props}>
    <span>Next</span>
    <ChevronRightIcon className="size-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-8 min-w-8 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <MoreHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

// feather:chevron-left
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18l-6-6l6-6" />
    </svg>
  )
}

// feather:chevron-right
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 18l6-6l-6-6" />
    </svg>
  )
}

// feather:more-horizontal
function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></g>
    </svg>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
