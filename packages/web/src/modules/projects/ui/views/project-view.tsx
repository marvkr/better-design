"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Suspense, useState, useCallback, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { ErrorBoundary } from "react-error-boundary";

import type { Fragment, DesignConfig } from "@/db";
import { useGetProject } from "@/hooks/use-get-project";

const HeaderSkeleton = () => (
  <div className="p-2 flex items-center border-b bg-sidebar animate-pulse">
    <div className="flex items-center gap-2 px-2">
      <div className="size-[18px] rounded bg-muted" />
      <div className="h-4 w-32 rounded bg-muted" />
      <div className="size-4 rounded bg-muted" />
    </div>
  </div>
);

const MessagesSkeleton = () => (
  <div className="flex flex-col flex-1 min-h-0 animate-pulse">
    <div className="flex-1 p-3 space-y-4">
      <div className="flex gap-2">
        <div className="size-7 rounded-full bg-muted shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-1/2 rounded bg-muted" />
          <div className="h-3 w-3/4 rounded bg-muted" />
          <div className="h-3 w-2/3 rounded bg-muted" />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <div className="h-8 w-48 rounded-xl bg-muted" />
      </div>
      <div className="flex gap-2">
        <div className="size-7 rounded-full bg-muted shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-2/3 rounded bg-muted" />
          <div className="h-3 w-1/2 rounded bg-muted" />
        </div>
      </div>
    </div>
    <div className="p-3 pt-1">
      <div className="h-10 rounded-lg bg-muted" />
    </div>
  </div>
);
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { FileExplorer } from "@/components/file-explorer";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ProjectHeader } from "../components/project-header";
import { MessagesContainer } from "../components/messages-container";
import { DotMatrix } from "../components/agent-state-indicator/dot-matrix";
import { LivePreviewIframe } from "../components/live-preview-iframe";
import { buildPreviewHTML } from "@/lib/build-preview-html";
import { IconBrowser } from "@/components/ui/icon-browser";

const LIBRARY_ID_TO_PREFIX: Record<string, string> = {
  phosphor: "ph",
  "solar-icons": "solar",
  tabler: "tabler",
  "material-symbols": "material-symbols",
  lucide: "lucide",
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
};

interface Props {
  projectId: string;
}

const MobileHeader = ({ projectId }: { projectId: string }) => {
  const { data: project } = useGetProject(projectId);
  const { data: session } = authClient.useSession();
  const { setTheme, theme } = useTheme();

  const showSignUpPrompt = project.isAnonymous && !session?.user;

  return (
    <div className="flex flex-col">
      {showSignUpPrompt && (
        <div className="px-3 py-2 bg-primary/10 flex items-center justify-center gap-3">
          <p className="text-xs text-primary">
            <Icon icon="tabler:info-circle" className="size-3.5 inline mr-1" />
            Sign up to save this project
          </p>
          <Button asChild size="sm" variant="default" className="h-6 text-xs">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}
      <div className="p-2 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity pl-2!"
            >
              <Logo size={18} />
              <span className="text-sm font-medium truncate max-w-[180px]">{project.name}</span>
              <Icon icon="tabler:chevron-down" className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem asChild>
              <Link href="/">
                <Icon icon="tabler:chevron-left" className="size-4" />
                <span>Go to Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <Icon icon="tabler:sun-moon" className="size-4 text-muted-foreground" />
                <span>Appearance</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-x-2">
          <UserControl />
        </div>
      </div>
    </div>
  );
};

export const ProjectView = ({ projectId }: Props) => {
  const isMobile = useIsMobile();

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const { data: project } = useGetProject(projectId);
  const [tabState, setTabState] = useState<"preview" | "code" | "icons">("preview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState<"chat" | "preview">("chat");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [livePreviewUrl, setLivePreviewUrl] = useState<string | null>(null);
  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

  const [currentConfig, setCurrentConfig] = useState<DesignConfig | null>(null);

  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!activeFragment?.files) return;
    const html = buildPreviewHTML(activeFragment.files as Record<string, string>, currentConfig);
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    setPreviewBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [activeFragment, currentConfig]);

  const handleConfigChange = useCallback((config: DesignConfig) => {
    setCurrentConfig(config);
  }, []);

  const handleGeneratingChange = useCallback((generating: boolean, step: string | null, sandboxUrl: string | null) => {
    setIsGenerating(generating);
    setCurrentStep(step);
    if (sandboxUrl) setLivePreviewUrl(sandboxUrl);
  }, []);

  const toggleSidebar = useCallback(() => {
    const panel = sidebarPanelRef.current;
    if (panel) {
      if (panel.isCollapsed()) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  }, []);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col">
        {/* Mobile header */}
        <div className="bg-sidebar border-b">
          <ErrorBoundary fallback={<p>Error</p>}>
            <Suspense fallback={<HeaderSkeleton />}>
              <MobileHeader projectId={projectId} />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Mobile content area */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {mobileView === "chat" ? (
            <div className="h-full flex flex-col bg-sidebar">
              <ErrorBoundary fallback={<p>Messages container error</p>}>
                <Suspense fallback={<MessagesSkeleton />}>
                  <MessagesContainer
                    projectId={projectId}
                    activeFragment={activeFragment}
                    setActiveFragment={setActiveFragment}
                    onConfigChange={handleConfigChange}
                    onGeneratingChange={handleGeneratingChange}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
          ) : (
            <div className="h-full flex flex-col bg-background">
              {/* Preview/Code tabs */}
              <div className="p-2 border-b bg-sidebar">
                <AnimatedTabs
                  tabs={[
                    { value: "preview", label: "Demo", icon: <Icon icon="tabler:eye" className="size-4" /> },
                    { value: "code", label: "Code", icon: <Icon icon="tabler:code" className="size-4" /> },
                    { value: "icons", label: "Icons", icon: <Icon icon="tabler:icons" className="size-4" /> },
                  ]}
                  value={tabState}
                  onValueChange={(value) => setTabState(value as "preview" | "code" | "icons")}
                />
              </div>
              <div className="flex-1 min-h-0">
                {tabState === "preview" && activeFragment && previewBlobUrl && (
                  <iframe
                    key={previewBlobUrl}
                    src={previewBlobUrl}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts"
                    title="Design system preview"
                  />
                )}
                {tabState === "code" && activeFragment && Boolean(activeFragment.files) && (
                  <FileExplorer
                    files={activeFragment.files as Record<string, string>}
                  />
                )}
                {tabState === "icons" && (
                  <div className="h-full overflow-y-auto p-4">
                    {project?.iconLibraryId ? (
                      <IconBrowser
                        prefix={LIBRARY_ID_TO_PREFIX[project.iconLibraryId] ?? project.iconLibraryId}
                        libraryName={project.iconLibraryId}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">Icon library not yet selected</p>
                      </div>
                    )}
                  </div>
                )}
                {!activeFragment && tabState === "preview" && (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">No preview available yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile bottom navigation */}
        <div className="border-t bg-sidebar p-2">
          <div className="flex gap-2">
            <Button
              variant={mobileView === "chat" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setMobileView("chat")}
            >
              <Icon icon="tabler:message" className="size-4 mr-2" />
              Chat
            </Button>
            <Button
              variant={mobileView === "preview" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setMobileView("preview")}
            >
              <Icon icon="tabler:eye" className="size-4 mr-2" />
              Preview
              {activeFragment && (
                <span className="ml-1.5 size-2 rounded-full bg-primary animate-pulse" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="h-screen">
      <ResizablePanelGroup id="project-view" direction="horizontal">
        <ResizablePanel
          ref={sidebarPanelRef}
          defaultSize={35}
          minSize={20}
          collapsible
          collapsedSize={0}
          onCollapse={() => setIsSidebarCollapsed(true)}
          onExpand={() => setIsSidebarCollapsed(false)}
          className="flex flex-col min-h-0 bg-sidebar overflow-hidden"
        >
          <div
            className={`flex flex-col flex-1 min-h-0 transition-opacity duration-200 ${
              isSidebarCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            <ErrorBoundary fallback={<p>Project header error</p>}>
              <Suspense fallback={<HeaderSkeleton />}>
                <ProjectHeader projectId={projectId} />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<p>Messages container error</p>}>
              <Suspense fallback={<MessagesSkeleton />}>
                <MessagesContainer
                  projectId={projectId}
                  activeFragment={activeFragment}
                  setActiveFragment={setActiveFragment}
                  onConfigChange={handleConfigChange}
                  onGeneratingChange={handleGeneratingChange}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors" />
        <ResizablePanel defaultSize={65} minSize={50} className="flex flex-col bg-background">
          <div className="w-full flex items-center p-2 border-b gap-x-2 bg-sidebar">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="size-8"
              title={isSidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
            >
              <Icon
                icon={isSidebarCollapsed ? "tabler:layout-sidebar" : "tabler:layout-sidebar-filled"}
                className="size-4 transition-all duration-200"
              />
            </Button>
            <AnimatedTabs
              tabs={[
                { value: "preview", label: "Demo", icon: <Icon icon="tabler:eye" className="size-4" /> },
                { value: "code", label: "Code", icon: <Icon icon="tabler:code" className="size-4" /> },
                { value: "icons", label: "Icons", icon: <Icon icon="tabler:icons" className="size-4" /> },
              ]}
              value={tabState}
              onValueChange={(value) => setTabState(value as "preview" | "code" | "icons")}
            />
            <div className="ml-auto flex items-center gap-x-2">
              <UserControl />
            </div>
          </div>
          {tabState === "preview" && activeFragment && (
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const iframe = document.querySelector<HTMLIFrameElement>('iframe[title="Design system preview"]');
                  if (iframe) iframe.src = iframe.src;
                }}
                title="Refresh"
              >
                <Icon icon="tabler:refresh" className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 justify-start text-start font-normal"
                onClick={() => {
                  navigator.clipboard.writeText(`https://better-design.com/preview/${activeFragment.id}`);
                }}
              >
                <span className="truncate text-xs">
                  {`https://better-design.com/preview/${activeFragment.id}`}
                </span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                title="Open in a new tab"
                onClick={() => window.open(`/preview/${activeFragment.id}`, "_blank")}
              >
                <Icon icon="tabler:external-link" className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                title="Open in v0"
                onClick={() => {
                  const files = activeFragment.files as Record<string, string>;
                  const globals = files?.["app/globals.css"] ?? "";
                  const page = files?.["app/page.tsx"] ?? "";
                  const msg = `I have a design system with these CSS variables:\n\n${globals}\n\nAnd this page component:\n\n${page}\n\nHelp me extend it.`;
                  window.open(`https://v0.dev/chat?q=${encodeURIComponent(msg)}`, "_blank");
                }}
              >
                <Icon icon="simple-icons:v0" className="size-3.5" />
              </Button>
            </div>
          )}
          <div className="flex-1 min-h-0 bg-background relative">
            {tabState === "preview" && activeFragment && previewBlobUrl && (
              <iframe
                key={previewBlobUrl}
                src={previewBlobUrl}
                className="w-full h-full border-0"
                sandbox="allow-scripts"
                title="Design system preview"
              />
            )}
            {tabState === "preview" && !activeFragment && isGenerating && livePreviewUrl && (
              <LivePreviewIframe src={livePreviewUrl} currentStep={currentStep} />
            )}
            {tabState === "code" && activeFragment && Boolean(activeFragment.files) && (
              <FileExplorer
                files={activeFragment.files as Record<string, string>}
              />
            )}
            {tabState === "icons" && (
              <div className="h-full overflow-y-auto p-4">
                {project?.iconLibraryId ? (
                  <IconBrowser
                    prefix={LIBRARY_ID_TO_PREFIX[project.iconLibraryId] ?? project.iconLibraryId}
                    libraryName={project.iconLibraryId}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">Icon library not yet selected</p>
                  </div>
                )}
              </div>
            )}
            {!activeFragment && !(isGenerating && livePreviewUrl) && tabState === "preview" && (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4">
                    <DotMatrix state="executing" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Building your design system</p>
                      {currentStep && (
                        <p className="text-xs text-muted-foreground mt-1">{currentStep.split(":").slice(1).join(":")}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">Submit a prompt to generate your design system</p>
                )}
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
