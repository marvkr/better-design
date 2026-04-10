"use client";

import { useState, useRef, useCallback, useEffect } from "react";

import { DotMatrix } from "./agent-state-indicator";

interface Props {
  src: string;
  currentStep?: string | null;
}

const RETRY_INTERVAL = 3000;

export const LivePreviewIframe = ({ src, currentStep }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const retrySrc = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || loaded) return;
    // Re-assign src to force a reload attempt
    iframe.src = src;
  }, [src, loaded]);

  const handleLoad = useCallback(() => {
    // The iframe fires onLoad even for error pages from the sandbox proxy.
    // We consider it loaded — the error page is the sandbox's own, not ours.
    setLoaded(true);
    if (retryTimer.current) {
      clearTimeout(retryTimer.current);
      retryTimer.current = null;
    }
  }, []);

  const handleError = useCallback(() => {
    if (loaded) return;
    retryTimer.current = setTimeout(retrySrc, RETRY_INTERVAL);
  }, [loaded, retrySrc]);

  // Poll-retry: if the iframe hasn't loaded after RETRY_INTERVAL, try again
  useEffect(() => {
    if (loaded) return;

    const interval = setInterval(() => {
      retrySrc();
    }, RETRY_INTERVAL);

    return () => clearInterval(interval);
  }, [loaded, retrySrc]);

  // Reset when src changes
  useEffect(() => {
    setLoaded(false);
  }, [src]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, []);

  const stepLabel = currentStep?.includes(":")
    ? currentStep.split(":").slice(1).join(":")
    : "Building your design system...";

  return (
    <div className="h-full relative">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background z-10">
          <DotMatrix state="executing" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Building your design system</p>
            <p className="text-xs text-muted-foreground mt-1">{stepLabel}</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="h-full w-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        src={src}
        onLoad={handleLoad}
        onError={handleError}
        title="Live design system preview"
      />
      {loaded && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur border border-border rounded-full px-4 py-2 flex items-center gap-2 text-xs shadow-lg">
          <DotMatrix state="executing" />
          <span className="text-foreground font-medium">{stepLabel}</span>
        </div>
      )}
    </div>
  );
};
