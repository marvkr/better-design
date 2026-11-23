"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine, menuItemBase, popoverSurface } from "./_shared";

/**
 * Paddock Select: the trigger is the white bordered field; the list opens
 * in the white panel every menu shares, and the chosen row carries a slate
 * check.
 */
const Select = SelectPrimitive.Root;

/** Groups related options under a label. */
const SelectGroup = SelectPrimitive.Group;

/** Shows the chosen option, or the placeholder, inside the trigger. */
const SelectValue = SelectPrimitive.Value;

/** The white field that opens the list, with a chevron at its end. */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn(
      formFieldBase,
      formFieldSingleLine,
      "cursor-pointer items-center justify-between gap-2 text-left data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/** The arrow that scrolls a long list up. */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className)}
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/** The arrow that scrolls a long list down. */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className)}
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/** The white list panel, as wide as its trigger in popper mode. */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", sideOffset = 6, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(
        popoverSurface,
        "relative z-50 max-h-96 min-w-32 overflow-hidden p-0",
        "origin-(--radix-select-content-transform-origin) duration-fast ease-out",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        className,
      )}
      position={position}
      sideOffset={position === "popper" ? sideOffset : undefined}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1.5",
          position === "popper" &&
            "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/** A small muted heading over a group of options. */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2.5 pb-1 pt-1.5 text-xs font-medium text-muted-foreground", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/** One option row; the chosen one shows a slate check. */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(menuItemBase, "w-full pl-8", className)}
    {...props}
  >
    <span className="absolute left-2.5 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4 text-foreground" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/** A 1px cool line between groups of options. */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1.5 my-1.5 border-t border-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

// MingCute, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "mingcute:check-line" "mingcute:down-line" "mingcute:up-line"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.171 16.072L19.778 5.465c.409-.359 1.01-.404 1.414 0c.404.405.359 1.005 0 1.415L9.878 18.193c-.204.179-.429.293-.707.293s-.503-.114-.707-.293l-5.657-5.657c-.297-.339-.393-.8-.159-1.207c.34-.588 1.092-.629 1.574-.207Z"/>
    </svg>
  );
}
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m12 13.586l4.95-4.95c.481-.422 1.233-.381 1.573.207c.235.407.139.868-.159 1.207l-5.657 5.657c-.204.179-.429.293-.707.293s-.503-.114-.707-.293L5.636 10.05c-.179-.204-.293-.429-.293-.707c0-.927 1.053-1.281 1.707-.707Z"/>
    </svg>
  );
}
function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m12 10.414l-4.95 4.95c-.654.574-1.707.22-1.707-.707c0-.278.114-.503.293-.707l5.657-5.657C11.497 8.114 11.722 8 12 8s.503.114.707.293l5.657 5.657c.298.339.394.8.159 1.207c-.34.588-1.092.629-1.573.207Z"/>
    </svg>
  );
}
