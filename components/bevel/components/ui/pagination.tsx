import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { type ButtonProps, buttonVariants } from "./button"

/*
 * Bevel Pagination.
 *
 * Every page target is a Button, so the row inherits the system's control
 * surface instead of inventing one. The current page takes the primary
 * variant, which means the same vertical gradient, rim and drop shadow the
 * primary Button carries. The rest stay ghost, so only one page is lit.
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

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1.5", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  ),
)
PaginationItem.displayName = "PaginationItem"

/** Props for `PaginationLink`; `isActive` marks the page the reader is on. */
type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({ variant: isActive ? "default" : "ghost", size }),
      "cursor-pointer",
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  size: _size,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1.5 pl-3.5", className)}
    {...props}
  >
    <Icon icon="solar:alt-arrow-left-linear" className="size-[1.125rem]" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  size: _size,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1.5 pr-3.5", className)}
    {...props}
  >
    <span>Next</span>
    <Icon icon="solar:alt-arrow-right-linear" className="size-[1.125rem]" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex size-[2.625rem] items-center justify-center text-muted-foreground",
      className,
    )}
    {...props}
  >
    <Icon icon="solar:menu-dots-linear" className="size-[1.125rem]" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
