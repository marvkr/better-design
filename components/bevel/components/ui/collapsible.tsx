"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/*
 * Bevel Collapsible.
 *
 * A structural primitive with no surface of its own. It stays unstyled on
 * purpose, so the card, row or accordion that wraps it keeps ownership of the
 * shadow and the divider. Anything visible belongs to the caller.
 */

const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
