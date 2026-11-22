"use client";

// A small toast store in the style of react-hot-toast: one module-level
// state, a reducer, and a hook that subscribes a component to it. Call
// `toast()` from anywhere; render <Toaster /> once to show the queue.
import * as React from "react";

import type { ToastActionElement, ToastProps } from "./toast";

/** How many toasts show at once; a new toast pushes the oldest out. */
const TOAST_LIMIT = 1;
/** How long a dismissed toast stays mounted, so its exit can play out. */
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: ToasterToast["id"] }
  | { type: "REMOVE_TOAST"; toastId?: ToasterToast["id"] };

interface State {
  toasts: ToasterToast[];
}

let nextId = 0;

function createId() {
  nextId = (nextId + 1) % Number.MAX_SAFE_INTEGER;
  return String(nextId);
}

const removalTimers = new Map<string, ReturnType<typeof setTimeout>>();

function scheduleRemoval(toastId: string) {
  if (removalTimers.has(toastId)) return;
  removalTimers.set(
    toastId,
    setTimeout(() => {
      removalTimers.delete(toastId);
      dispatch({ type: "REMOVE_TOAST", toastId });
    }, TOAST_REMOVE_DELAY),
  );
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((item) =>
          item.id === action.toast.id ? { ...item, ...action.toast } : item,
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;
      // Closing starts the exit animation; removal follows on a timer.
      // This side effect lives here to keep dismissal a single dispatch.
      if (toastId) {
        scheduleRemoval(toastId);
      } else {
        state.toasts.forEach((item) => scheduleRemoval(item.id));
      }
      return {
        ...state,
        toasts: state.toasts.map((item) =>
          toastId === undefined || item.id === toastId
            ? { ...item, open: false }
            : item,
        ),
      };
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((item) => item.id !== action.toastId),
      };
  }
};

const listeners = new Set<(state: State) => void>();

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

type Toast = Omit<ToasterToast, "id">;

function toast(props: Toast) {
  const id = createId();

  const update = (next: ToasterToast) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...next, id } });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, dismiss, update };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.add(setState);
    // Catch anything dispatched between the first render and this effect.
    setState(memoryState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
