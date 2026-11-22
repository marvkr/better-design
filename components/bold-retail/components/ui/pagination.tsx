import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Bold retail Pagination: the page row under a product grid. Page numbers
 * are round ghost buttons; the page you are on flips to the black pill.
 * Previous and Next carry their labels beside the arrows, and the numbers
 * keep even figures so the row holds still as you move through it.
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
    className={cn("flex flex-row items-center gap-1", className)}
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

/** A page link: the black pill when it is the current page, ghost otherwise. */
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    data-slot="pagination-link"
    data-active={isActive || undefined}
    className={cn(
      buttonVariants({ variant: isActive ? "default" : "ghost", size }),
      "cursor-pointer tabular-nums",
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
    size="default"
    className={cn("gap-1.5 ps-3", className)}
    {...props}
  >
    <Icon icon="mingcute:left-line" aria-hidden="true" className="size-4" />
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
    size="default"
    className={cn("gap-1.5 pe-3", className)}
    {...props}
  >
    <span>Next</span>
    <Icon icon="mingcute:right-line" aria-hidden="true" className="size-4" />
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
      "flex size-10 items-center justify-center text-muted-foreground",
      className,
    )}
    {...props}
  >
    <Icon icon="mingcute:more-1-line" className="size-4" aria-hidden="true" />
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
