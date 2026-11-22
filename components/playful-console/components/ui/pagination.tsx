import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Playful console Pagination: a row of small square keys. The page you are
 * on is the white key on its orange slab; the others stay flat and take a
 * cream wash under the pointer. Page numbers use mono figures so the row
 * does not shift as you move through it.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="Pagination"
    data-slot="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

/** The list of page links. */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-slot="pagination-content"
    className={cn("flex flex-row items-center gap-1.5", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

/** One slot in the row. */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} data-slot="pagination-item" className={className} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<VariantProps<typeof buttonVariants>, "size"> &
  React.ComponentProps<"a">;

/** A page link: the white key when it is the current page, flat otherwise. */
const PaginationLink = ({
  className,
  isActive,
  size = "icon-sm",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    data-slot="pagination-link"
    data-active={isActive || undefined}
    className={cn(
      buttonVariants({ variant: isActive ? "secondary" : "ghost", size }),
      "cursor-pointer font-mono tabular-nums",
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

/** Steps back one page. */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="sm"
    className={cn("gap-1 ps-2 font-sans", className)}
    {...props}
  >
    <Icon icon="ph:caret-left-bold" aria-hidden="true" className="size-3.5" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/** Steps forward one page. */
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="sm"
    className={cn("gap-1 pe-2 font-sans", className)}
    {...props}
  >
    <span>Next</span>
    <Icon icon="ph:caret-right-bold" aria-hidden="true" className="size-3.5" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/** Stands in for the pages skipped between two links. */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    className={cn(
      "flex size-8 items-center justify-center text-muted-foreground",
      className,
    )}
    {...props}
  >
    <Icon icon="ph:dots-three-duotone" className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
