import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Cream editorial Pagination: a row of quiet ghost buttons with a 0.5rem
 * corner. The page you are on sits on an oat tab in ink, the others take an
 * oat wash under the pointer, and Previous and Next carry their labels
 * beside the carets. Page numbers keep even figures so the row holds still.
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

/** A page link: an oat tab in ink when it is the current page, ghost otherwise. */
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
      buttonVariants({ variant: "ghost", size }),
      "cursor-pointer text-sm tabular-nums",
      isActive && "bg-muted text-foreground hover:bg-muted",
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
    className={cn("gap-1.5 ps-2.5", className)}
    {...props}
  >
    <Icon icon="ph:caret-left" aria-hidden="true" className="size-4 rtl:rotate-180" />
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
    className={cn("gap-1.5 pe-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <Icon icon="ph:caret-right" aria-hidden="true" className="size-4 rtl:rotate-180" />
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
      "flex size-9 items-center justify-center text-muted-foreground",
      className,
    )}
    {...props}
  >
    <Icon icon="ph:dots-three" className="size-4" />
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
