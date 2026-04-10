"use client";

import { useEffect, useRef, useState } from "react";

export interface StreamState {
  phase: string | null;
  detail: string | null;
  files: Map<string, string>;
  agentAction: string | null;
  isComplete: boolean;
  isError: boolean;
  errorMessage: string | null;
  completeData: { messageId: string; fragmentId: string; sandboxUrl: string } | null;
}

const initialState = (): StreamState => ({
  phase: null,
  detail: null,
  files: new Map(),
  agentAction: null,
  isComplete: false,
  isError: false,
  errorMessage: null,
  completeData: null,
});

export function useProjectStream(projectId: string, enabled: boolean): StreamState {
  const [state, setState] = useState<StreamState>(initialState);
  const esRef = useRef<EventSource | null>(null);
  const lastEventIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !projectId) {
      setState(initialState());
      return;
    }

    // Reset state when starting a new stream
    setState(initialState());

    function connect() {
      const url = lastEventIdRef.current
        ? `/api/events/${projectId}/stream`
        : `/api/events/${projectId}/stream`;

      const es = new EventSource(url);
      esRef.current = es;

      es.addEventListener("step", (e: MessageEvent) => {
        lastEventIdRef.current = e.lastEventId;
        const data = JSON.parse(e.data) as { phase: string; detail: string };
        setState((prev) => ({ ...prev, phase: data.phase, detail: data.detail }));
      });

      es.addEventListener("file", (e: MessageEvent) => {
        lastEventIdRef.current = e.lastEventId;
        const data = JSON.parse(e.data) as { path: string; content: string };
        setState((prev) => {
          const files = new Map(prev.files);
          files.set(data.path, data.content);
          return { ...prev, files };
        });
      });

      es.addEventListener("agent_action", (e: MessageEvent) => {
        lastEventIdRef.current = e.lastEventId;
        const data = JSON.parse(e.data) as { action: string };
        setState((prev) => ({ ...prev, agentAction: data.action }));
      });

      es.addEventListener("complete", (e: MessageEvent) => {
        lastEventIdRef.current = e.lastEventId;
        const data = JSON.parse(e.data) as { messageId: string; fragmentId: string; sandboxUrl: string };
        setState((prev) => ({ ...prev, isComplete: true, completeData: data }));
        es.close();
      });

      es.addEventListener("error", (e: MessageEvent) => {
        // Named "error" event from server (not a connection error)
        if (e.data) {
          lastEventIdRef.current = e.lastEventId;
          const data = JSON.parse(e.data) as { message: string };
          setState((prev) => ({ ...prev, isError: true, errorMessage: data.message }));
          es.close();
          return;
        }

        // Connection error — attempt reconnect
        es.close();
        setTimeout(connect, 2000);
      });
    }

    connect();

    return () => {
      esRef.current?.close();
      esRef.current = null;
    };
  }, [projectId, enabled]);

  return state;
}
