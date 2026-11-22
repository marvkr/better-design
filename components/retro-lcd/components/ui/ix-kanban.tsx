/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Copyright (c) 2025 Keenthemes Inc. MIT License, from https://github.com/keenthemes/reui
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Kanban: drag-and-drop board with sortable columns and cards, mouse, touch and
// keyboard sensors, and a drag overlay, ported from the MIT-licensed source above.
// Its classes are layout-only, so each design system's tokens theme it.
"use client"

import * as React from "react"
import type { CSSProperties, ReactNode } from "react"
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import type {
  CollisionDetection,
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  Modifiers,
  UniqueIdentifier,
} from "@dnd-kit/core"
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from "@dnd-kit/core"
import {
  arrayMove,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  type AnimateLayoutChanges,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

interface KanbanContextProps<T> {
  columns: Record<string, T[]>
  setColumns: (columns: Record<string, T[]>) => void
  getItemId: (item: T) => string
  columnIds: string[]
  activeId: UniqueIdentifier | null
  setActiveId: (id: UniqueIdentifier | null) => void
  findContainer: (id: UniqueIdentifier) => string | undefined
  isColumn: (id: UniqueIdentifier) => boolean
  modifiers?: Modifiers
}

const KanbanContext = createContext<KanbanContextProps<any>>({
  columns: {},
  setColumns: () => {},
  getItemId: () => "",
  columnIds: [],
  activeId: null,
  setActiveId: () => {},
  findContainer: () => undefined,
  isColumn: () => false,
  modifiers: undefined,
})

// SAFETY: the empty object spreads no attributes. It stands in where no sortable
// exists (the context default and the drag overlay), so the handle gets none.
const NO_ATTRIBUTES = {} as DraggableAttributes

const ColumnContext = createContext<{
  attributes: DraggableAttributes
  listeners: DraggableSyntheticListeners | undefined
  isDragging?: boolean
  disabled?: boolean
}>({
  attributes: NO_ATTRIBUTES,
  listeners: undefined,
  isDragging: false,
  disabled: false,
})

const ItemContext = createContext<{
  listeners: DraggableSyntheticListeners | undefined
  isDragging?: boolean
  disabled?: boolean
}>({
  listeners: undefined,
  isDragging: false,
  disabled: false,
})

const IsOverlayContext = createContext(false)

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
}

// Client-mount gate for KanbanOverlay's portal: false on the server and during
// hydration, true once mounted. Module-scoped so the identities stay stable.
const subscribeToNothing = () => () => {}
const getIsMounted = () => true
const getIsMountedOnServer = () => false

const MOUSE_SENSOR_OPTIONS = { activationConstraint: { distance: 10 } }
const TOUCH_SENSOR_OPTIONS = {
  activationConstraint: { delay: 250, tolerance: 5 },
}
const KEYBOARD_SENSOR_OPTIONS = {
  coordinateGetter: sortableKeyboardCoordinates,
}
const MEASURING_CONFIG = {
  droppable: { strategy: MeasuringStrategy.Always },
}

/** What an `onMove` handler receives when a card drops; the handler applies the move itself. */
export interface KanbanMoveEvent {
  event: DragEndEvent
  activeContainer: string
  activeIndex: number
  overContainer: string
  overIndex: number
}

/** Describes a finished drag for `onValueCommit`: what moved, from where, to where, and the value before. */
export interface KanbanCommitMeta<T> {
  kind: "item" | "column"
  event: DragEndEvent
  activeContainer: string
  activeIndex: number
  overContainer: string
  overIndex: number
  previousValue: Record<string, T[]>
}

/** Props for the board root. `value` maps column ids to items; `onValueChange` gets every live reorder. */
export interface KanbanRootProps<T> extends Omit<
  useRender.ComponentProps<"div">,
  "children" | "onDragStart" | "onDragEnd"
> {
  value: Record<string, T[]>
  onValueChange: (value: Record<string, T[]>) => void
  getItemValue: (item: T) => string
  children: ReactNode
  onMove?: (event: KanbanMoveEvent) => void
  onValueCommit?: (
    value: Record<string, T[]>,
    meta: KanbanCommitMeta<T>
  ) => void
  restoreOnCancel?: boolean
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  onDragCancel?: (event: DragCancelEvent) => void
  accessibility?: React.ComponentProps<typeof DndContext>["accessibility"]
  modifiers?: Modifiers
}

function Kanban<T>({
  value,
  onValueChange,
  getItemValue,
  children,
  className,
  render,
  onMove,
  onValueCommit,
  restoreOnCancel = false,
  onDragStart,
  onDragEnd,
  onDragCancel,
  accessibility,
  modifiers,
  ...props
}: KanbanRootProps<T>) {
  const columns = value
  const setColumns = onValueChange
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  // Always-current mirrors, so the drag handlers read fresh values and keep a
  // stable identity. Synced in an effect: a ref write during render is unsafe.
  const valueRef = useRef(value)
  const getItemValueRef = useRef(getItemValue)
  useLayoutEffect(() => {
    valueRef.current = value
    getItemValueRef.current = getItemValue
  })
  const dragOriginRef = useRef<{
    value: Record<string, T[]>
    container: string | undefined
    index: number
  } | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, MOUSE_SENSOR_OPTIONS),
    useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS),
    useSensor(KeyboardSensor, KEYBOARD_SENSOR_OPTIONS)
  )

  // Item ids must be unique across all columns, or drag and drop misbehaves.
  const columnIds = useMemo(() => Object.keys(columns), [columns])

  const isColumn = useCallback(
    (id: UniqueIdentifier) => columnIds.includes(String(id)),
    [columnIds]
  )

  const findContainer = useCallback(
    (id: UniqueIdentifier) => {
      if (isColumn(id)) return String(id)
      return columnIds.find((key) =>
        columns[key].some((item) => getItemValue(item) === id)
      )
    },
    [columns, columnIds, getItemValue, isColumn]
  )

  // The droppable under the pointer, not the one the dragged rect overlaps
  // most: in the gap between columns that overlap flips with every live-preview
  // move, and each flip re-runs dragOver until React bails out.
  const lastOverIdRef = useRef<UniqueIdentifier | null>(null)
  const collisionDetection = useCallback<CollisionDetection>(
    (args) => {
      if (isColumn(args.active.id)) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) =>
            isColumn(container.id)
          ),
        })
      }

      // Keyboard drags carry no pointer.
      if (!args.pointerCoordinates) return rectIntersection(args)

      let overId = getFirstCollision(pointerWithin(args), "id")
      if (overId != null) {
        // Over a column's empty space: resolve to its closest item, if any.
        if (isColumn(overId)) {
          const itemIds = new Set(columns[String(overId)].map(getItemValue))
          overId =
            closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => itemIds.has(String(container.id))
              ),
            })[0]?.id ?? overId
        }
        lastOverIdRef.current = overId
        return [{ id: overId }]
      }

      // Between droppables: hold the last target so the preview stays put.
      return lastOverIdRef.current != null
        ? [{ id: lastOverIdRef.current }]
        : rectIntersection(args)
    },
    [columns, getItemValue, isColumn]
  )

  const commitChange = useCallback(
    (
      finalValue: Record<string, T[]>,
      event: DragEndEvent,
      kind: "item" | "column"
    ) => {
      if (!onValueCommit) return
      const origin = dragOriginRef.current
      if (!origin) return

      const id = event.active.id

      if (kind === "column") {
        const keys = Object.keys(finalValue)
        const overIndex = keys.indexOf(String(id))
        if (overIndex === -1 || overIndex === origin.index) return
        onValueCommit(finalValue, {
          kind: "column",
          event,
          activeContainer: String(id),
          activeIndex: origin.index,
          overContainer: String(event.over?.id ?? id),
          overIndex,
          previousValue: origin.value,
        })
        return
      }

      const getId = getItemValueRef.current
      let overContainer: string | undefined
      let overIndex = -1
      for (const key of Object.keys(finalValue)) {
        const found = finalValue[key].findIndex((item) => getId(item) === id)
        if (found !== -1) {
          overContainer = key
          overIndex = found
          break
        }
      }
      if (overContainer === undefined) return
      if (overContainer === origin.container && overIndex === origin.index) {
        return
      }
      onValueCommit(finalValue, {
        kind: "item",
        event,
        activeContainer: origin.container ?? overContainer,
        activeIndex: origin.index,
        overContainer,
        overIndex,
        previousValue: origin.value,
      })
    },
    [onValueCommit]
  )

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      lastOverIdRef.current = null
      setActiveId(event.active.id)
      onDragStart?.(event)

      if (onValueCommit || restoreOnCancel) {
        const snapshot = valueRef.current
        const id = event.active.id
        const keys = Object.keys(snapshot)
        if (keys.includes(String(id))) {
          dragOriginRef.current = {
            value: snapshot,
            container: String(id),
            index: keys.indexOf(String(id)),
          }
        } else {
          const getId = getItemValueRef.current
          let container: string | undefined
          let index = -1
          for (const key of keys) {
            const found = snapshot[key].findIndex((item) => getId(item) === id)
            if (found !== -1) {
              container = key
              index = found
              break
            }
          }
          dragOriginRef.current = { value: snapshot, container, index }
        }
      }
    },
    [onDragStart, onValueCommit, restoreOnCancel]
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      if (onMove) {
        return
      }

      const { active, over } = event
      if (!over) return

      if (isColumn(active.id)) return

      const activeContainer = findContainer(active.id)
      const overContainer = findContainer(over.id)

      if (!activeContainer || !overContainer) {
        return
      }

      if (activeContainer !== overContainer) {
        const activeItems = columns[activeContainer]
        const overItems = columns[overContainer]

        const activeIndex = activeItems.findIndex(
          (item: T) => getItemValue(item) === active.id
        )
        let overIndex = overItems.findIndex(
          (item: T) => getItemValue(item) === over.id
        )

        // If dropping on the column itself, not an item
        if (isColumn(over.id)) {
          overIndex = overItems.length
        }

        const newActiveItems = [...activeItems]
        const newOverItems = [...overItems]
        const [movedItem] = newActiveItems.splice(activeIndex, 1)
        newOverItems.splice(overIndex, 0, movedItem)

        setColumns({
          ...columns,
          [activeContainer]: newActiveItems,
          [overContainer]: newOverItems,
        })
      } else {
        const container = activeContainer
        const activeIndex = columns[container].findIndex(
          (item: T) => getItemValue(item) === active.id
        )
        const overIndex = columns[container].findIndex(
          (item: T) => getItemValue(item) === over.id
        )

        if (activeIndex !== overIndex) {
          setColumns({
            ...columns,
            [container]: arrayMove(columns[container], activeIndex, overIndex),
          })
        }
      }
    },
    [findContainer, getItemValue, isColumn, setColumns, columns, onMove]
  )

  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      const origin = dragOriginRef.current

      if (restoreOnCancel && origin && !onMove) {
        // Escape/cancel: undo the live-preview reshuffle applied during dragOver.
        setColumns(origin.value)
      } else if (onValueCommit && origin && !onMove) {
        // No restore requested: the live preview stays visible, so commit it.
        commitChange(valueRef.current, event, "item")
      }

      dragOriginRef.current = null
      lastOverIdRef.current = null
      setActiveId(null)
      onDragCancel?.(event)
    },
    [
      restoreOnCancel,
      onMove,
      onValueCommit,
      setColumns,
      onDragCancel,
      commitChange,
    ]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      lastOverIdRef.current = null
      setActiveId(null)
      onDragEnd?.(event)

      if (!over) {
        // Released over nothing. In default mode the live preview during
        // dragOver may have already moved the item, so commit the current value.
        commitChange(valueRef.current, event, "item")
        dragOriginRef.current = null
        return
      }

      // Handle item move callback
      if (onMove && !isColumn(active.id)) {
        const activeContainer = findContainer(active.id)
        const overContainer = findContainer(over.id)

        if (activeContainer && overContainer) {
          const activeIndex = columns[activeContainer].findIndex(
            (item: T) => getItemValue(item) === active.id
          )
          const overIndex = isColumn(over.id)
            ? columns[overContainer].length
            : columns[overContainer].findIndex(
                (item: T) => getItemValue(item) === over.id
              )

          onMove({
            event,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
          })
        }
        // In onMove mode the consumer owns applying the item move, so do not
        // fire onValueCommit for item moves; column reorders still commit below.
        dragOriginRef.current = null
        return
      }

      // Handle column reordering
      if (isColumn(active.id) && isColumn(over.id)) {
        const activeIndex = columnIds.indexOf(String(active.id))
        const overIndex = columnIds.indexOf(String(over.id))
        if (activeIndex !== overIndex) {
          const newOrder = arrayMove(
            Object.keys(columns),
            activeIndex,
            overIndex
          )
          const newColumns: Record<string, T[]> = {}
          newOrder.forEach((key) => {
            newColumns[key] = columns[key]
          })
          setColumns(newColumns)
          commitChange(newColumns, event, "column")
        }
        dragOriginRef.current = null
        return
      }

      // A column drag that ends over a non-column droppable is not an item move.
      if (isColumn(active.id)) {
        dragOriginRef.current = null
        return
      }

      const activeContainer = findContainer(active.id)
      const overContainer = findContainer(over.id)

      // Handle item reordering within the same column
      if (
        activeContainer &&
        overContainer &&
        activeContainer === overContainer
      ) {
        const container = activeContainer
        const activeIndex = columns[container].findIndex(
          (item: T) => getItemValue(item) === active.id
        )
        const overIndex = columns[container].findIndex(
          (item: T) => getItemValue(item) === over.id
        )

        if (activeIndex !== overIndex) {
          const newColumns = {
            ...columns,
            [container]: arrayMove(columns[container], activeIndex, overIndex),
          }
          setColumns(newColumns)
          commitChange(newColumns, event, "item")
        } else {
          // Cross-column moves are applied during dragOver, so the current
          // value is already final.
          commitChange(columns, event, "item")
        }
      } else {
        commitChange(columns, event, "item")
      }
      dragOriginRef.current = null
    },
    [
      columnIds,
      columns,
      findContainer,
      getItemValue,
      isColumn,
      setColumns,
      onMove,
      onDragEnd,
      commitChange,
    ]
  )

  const contextValue = useMemo(
    () => ({
      columns,
      setColumns,
      getItemId: getItemValue,
      columnIds,
      activeId,
      setActiveId,
      findContainer,
      isColumn,
      modifiers,
    }),
    [
      columns,
      setColumns,
      getItemValue,
      columnIds,
      activeId,
      findContainer,
      isColumn,
      modifiers,
    ]
  )

  const defaultProps = {
    "data-slot": "kanban",
    "data-dragging": activeId !== null,
    className: cn(activeId !== null && "cursor-grabbing!", className),
    children,
  }

  return (
    <KanbanContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        modifiers={modifiers}
        accessibility={accessibility}
        measuring={MEASURING_CONFIG}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {useRender({
          defaultTagName: "div",
          render,
          props: mergeProps<"div">(defaultProps, props),
        })}
      </DndContext>
    </KanbanContext.Provider>
  )
}

/** Props for the element that lays out the columns and makes them sortable. */
export type KanbanBoardProps = useRender.ComponentProps<"div">

function KanbanBoard({ className, render, ...props }: KanbanBoardProps) {
  const { columnIds } = useContext(KanbanContext)

  const defaultProps = {
    "data-slot": "kanban-board",
    className: cn("grid auto-rows-fr gap-4 sm:grid-cols-3", className),
    children: props.children,
  }

  return (
    <SortableContext items={columnIds} strategy={rectSortingStrategy}>
      {useRender({
        defaultTagName: "div",
        render,
        props: mergeProps<"div">(defaultProps, props),
      })}
    </SortableContext>
  )
}

/** Props for one sortable column; `value` is its key in the board value. */
export interface KanbanColumnProps extends useRender.ComponentProps<"div"> {
  value: string
  disabled?: boolean
}

function KanbanColumn({
  value,
  className,
  render,
  disabled,
  ...props
}: KanbanColumnProps) {
  const isOverlay = useContext(IsOverlayContext)

  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled: disabled || isOverlay,
    animateLayoutChanges,
  })

  // Hooks must run unconditionally; the derived value below is used only in the non-overlay branch.
  const { activeId, isColumn } = useContext(KanbanContext)
  const isColumnDragging = activeId ? isColumn(activeId) : false

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const defaultProps = isOverlay
    ? {
        "data-slot": "kanban-column",
        "data-value": value,
        "data-dragging": true,
        className: cn("group/kanban-column flex flex-col", className),
        children: props.children,
      }
    : {
        "data-slot": "kanban-column",
        "data-value": value,
        "data-dragging": isSortableDragging,
        "data-disabled": disabled,
        ref: setNodeRef,
        style,
        className: cn(
          "group/kanban-column flex flex-col",
          isSortableDragging && "opacity-50 z-50",
          disabled && "opacity-50",
          className
        ),
        children: props.children,
      }

  return (
    <ColumnContext.Provider
      value={
        isOverlay
          ? {
              attributes: NO_ATTRIBUTES,
              listeners: undefined,
              isDragging: true,
              disabled: false,
            }
          : { attributes, listeners, isDragging: isColumnDragging, disabled }
      }
    >
      {useRender({
        defaultTagName: "div",
        render,
        props: mergeProps<"div">(defaultProps, props),
      })}
    </ColumnContext.Provider>
  )
}

/** Props for a column's drag handle; `cursor` turns the grab cursor on or off. */
export interface KanbanColumnHandleProps extends useRender.ComponentProps<"div"> {
  cursor?: boolean
}

function KanbanColumnHandle({
  className,
  render,
  cursor = true,
  ...props
}: KanbanColumnHandleProps) {
  const { attributes, listeners, isDragging, disabled } =
    useContext(ColumnContext)

  const defaultProps = {
    "data-slot": "kanban-column-handle",
    "data-dragging": isDragging,
    "data-disabled": disabled,
    ...attributes,
    ...listeners,
    className: cn(
      "opacity-0 transition-opacity group-hover/kanban-column:opacity-100",
      cursor && (isDragging ? "cursor-grabbing!" : "cursor-grab!"),
      className
    ),
    children: props.children,
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  })
}

/** Props for one sortable card; `value` is the id `getItemValue` returns for it. */
export interface KanbanItemProps extends useRender.ComponentProps<"div"> {
  value: string
  disabled?: boolean
}

function KanbanItem({
  value,
  className,
  render,
  disabled,
  ...props
}: KanbanItemProps) {
  const isOverlay = useContext(IsOverlayContext)

  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled: disabled || isOverlay,
    animateLayoutChanges,
  })

  // Hooks must run unconditionally; the derived value below is used only in the non-overlay branch.
  const { activeId, isColumn } = useContext(KanbanContext)
  const isItemDragging = activeId ? !isColumn(activeId) : false

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const defaultProps = isOverlay
    ? {
        "data-slot": "kanban-item",
        "data-value": value,
        "data-dragging": true,
        className: cn(className),
        children: props.children,
      }
    : {
        "data-slot": "kanban-item",
        "data-value": value,
        "data-dragging": isSortableDragging,
        "data-disabled": disabled,
        ref: setNodeRef,
        style,
        ...attributes,
        className: cn(
          isSortableDragging && "opacity-50 z-50",
          disabled && "opacity-50",
          className
        ),
        children: props.children,
      }

  return (
    <ItemContext.Provider
      value={
        isOverlay
          ? { listeners: undefined, isDragging: true, disabled: false }
          : { listeners, isDragging: isItemDragging, disabled }
      }
    >
      {useRender({
        defaultTagName: "div",
        render,
        props: mergeProps<"div">(defaultProps, props),
      })}
    </ItemContext.Provider>
  )
}

/** Props for a card's drag handle. Render a card through it to make the whole card draggable. */
export interface KanbanItemHandleProps extends useRender.ComponentProps<"div"> {
  cursor?: boolean
}

function KanbanItemHandle({
  className,
  render,
  cursor = true,
  ...props
}: KanbanItemHandleProps) {
  const { listeners, isDragging, disabled } = useContext(ItemContext)

  const defaultProps = {
    "data-slot": "kanban-item-handle",
    "data-dragging": isDragging,
    "data-disabled": disabled,
    ...listeners,
    className: cn(
      cursor && (isDragging ? "cursor-grabbing!" : "cursor-grab!"),
      className
    ),
    children: props.children,
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  })
}

/** Props for the list of a column's cards; `value` names a column that must exist in the board value. */
export interface KanbanColumnContentProps extends useRender.ComponentProps<"div"> {
  value: string
}

function KanbanColumnContent({
  value,
  className,
  render,
  ...props
}: KanbanColumnContentProps) {
  const { columns, getItemId } = useContext(KanbanContext)

  const itemIds = useMemo(() => {
    const items = columns[value]
    if (!items) {
      throw new Error(
        `KanbanColumnContent: column "${value}" was not found in the Kanban value. ` +
          `Available columns: ${Object.keys(columns).join(", ") || "(none)"}.`
      )
    }
    return items.map(getItemId)
  }, [columns, getItemId, value])

  const defaultProps = {
    "data-slot": "kanban-column-content",
    className: cn("flex flex-col gap-2", className),
    children: props.children,
  }

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      {useRender({
        defaultTagName: "div",
        render,
        props: mergeProps<"div">(defaultProps, props),
      })}
    </SortableContext>
  )
}

/** Props for the copy that follows the pointer during a drag; children may be a function of the dragged id. */
export interface KanbanOverlayProps extends Omit<
  React.ComponentProps<typeof DragOverlay>,
  "children"
> {
  children?:
    | ReactNode
    | ((params: {
        value: UniqueIdentifier
        variant: "column" | "item"
      }) => ReactNode)
}

function KanbanOverlay({ children, className, ...props }: KanbanOverlayProps) {
  const { activeId, isColumn, modifiers } = useContext(KanbanContext)
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    getIsMounted,
    getIsMountedOnServer
  )

  const variant = activeId ? (isColumn(activeId) ? "column" : "item") : "item"

  const content =
    activeId && children
      ? children instanceof Function
        ? children({ value: activeId, variant })
        : children
      : null

  if (!mounted) return null

  return createPortal(
    <DragOverlay
      dropAnimation={dropAnimationConfig}
      modifiers={modifiers}
      className={cn("z-50", activeId && "cursor-grabbing", className)}
      {...props}
    >
      <IsOverlayContext.Provider value={true}>
        {content}
      </IsOverlayContext.Provider>
    </DragOverlay>,
    document.body
  )
}

export {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanColumnContent,
  KanbanOverlay,
}
