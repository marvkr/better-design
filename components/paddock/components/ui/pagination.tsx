import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Paddock Pagination: ghost buttons for the pages and the solid teal
 * primary for the current one, so the reader's place is the one filled
 * object in the row.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

/** The list that holds the page links. */
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  ),
);
PaginationContent.displayName = "PaginationContent";

/** One slot in the page list. */
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-slot="pagination-item" className={cn("", className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<VariantProps<typeof buttonVariants>, "size"> &
  React.ComponentProps<"a">;

/** A link to one page; the active page takes the teal primary fill. */
const PaginationLink = ({ className, isActive, size = "icon-sm", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    data-slot="pagination-link"
    data-active={isActive ? "" : undefined}
    className={cn(
      buttonVariants({ variant: isActive ? "default" : "ghost", size }),
      "cursor-pointer tabular-nums",
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

/** The link back one page. */
const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="sm"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <Icon icon="mingcute:left-line" className="size-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/** The link forward one page. */
const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="sm"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <Icon icon="mingcute:right-line" className="size-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/** A stand-in for pages left out of the list. */
const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn("flex size-8 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <Icon icon="mingcute:more-1-line" className="size-4" />
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
