import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { Fragment, DesignConfig } from "@/db";
import type { AgentState } from "./agent-state-indicator";
import { useGetMessages } from "@/hooks/use-get-messages";
import { useGetProject } from "@/hooks/use-get-project";
import { useSelectDesignSystem } from "@/hooks/use-select-design-system";
import { useAnswerClarification } from "@/hooks/use-answer-clarification";
import { useProjectStream } from "@/hooks/use-project-stream";

import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { MessageLoading } from "./message-loading";
import { ModifyControls } from "./modify-controls";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
  onConfigChange: (config: DesignConfig) => void;
  onGeneratingChange?: (isGenerating: boolean, currentStep: string | null, sandboxUrl: string | null) => void;
}

export const MessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
  onConfigChange,
  onGeneratingChange,
}: Props) => {
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);
  const [isModifyOpen, setIsModifyOpen] = useState(false);

  // Get project first so we can pass isGenerating to useGetMessages
  const { data: project } = useGetProject(projectId, {
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.designSystemStatus === "GENERATING") return 5000;
      return false;
    },
  });

  const isGenerating = project.designSystemStatus === "GENERATING";

  const { data: messages } = useGetMessages(projectId, isGenerating);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "USER";

  const stream = useProjectStream(projectId, isGenerating || isLastMessageUser);

  const selectDesignSystem = useSelectDesignSystem(projectId);
  const answerClarification = useAnswerClarification(projectId);

  const handleAnswerClarification = (answer: string) => {
    answerClarification.mutate({ answer });
  };

  const handleSelectDesignSystem = (designSystemId: string) => {
    selectDesignSystem.mutate({ designSystemId });
  };

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role === "ASSISTANT",
    );

    if (
      lastAssistantMessage?.fragment &&
      lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
      setActiveFragment(lastAssistantMessage.fragment as unknown as Fragment);
      lastAssistantMessageIdRef.current = lastAssistantMessage.id;
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  useEffect(() => {
    onGeneratingChange?.(isGenerating || isLastMessageUser, project.currentStep ?? null, project.sandboxUrl ?? null);
  }, [isGenerating, isLastMessageUser, project.currentStep, project.sandboxUrl, onGeneratingChange]);

  // When stream completes, invalidate queries to fetch final messages
  useEffect(() => {
    if (stream.isComplete || stream.isError) {
      queryClient.invalidateQueries({ queryKey: ["messages", "getMany", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects", "getOne", projectId] });
    }
  }, [stream.isComplete, stream.isError, queryClient, projectId]);

  // Fallback: when project transitions from GENERATING → done, refetch messages
  const prevStatusRef = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (
      prevStatusRef.current === "GENERATING" &&
      project.designSystemStatus !== "GENERATING"
    ) {
      queryClient.invalidateQueries({ queryKey: ["messages", "getMany", projectId] });
    }
    prevStatusRef.current = project.designSystemStatus;
  }, [project.designSystemStatus, queryClient, projectId]);

  // Also poll project when last message is USER (Inngest job may not have started yet)
  useEffect(() => {
    if (!isLastMessageUser) return;
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["projects", "getOne", projectId] });
    }, 3000);
    return () => clearInterval(interval);
  }, [isLastMessageUser, queryClient, projectId]);

  // Determine agent state for each message
  const getMessageAgentState = (
    message: (typeof messages)[number],
  ): AgentState | undefined => {
    if (message.role === "ASSISTANT" && message.fragment) {
      return "success";
    }
    if (message.type === "ERROR") {
      return "error";
    }
    return undefined;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              metadata={message.metadata}
              createdAt={new Date(message.createdAt)}
              onSelectDesignSystem={handleSelectDesignSystem}
              isSelectingDesignSystem={selectDesignSystem.isPending}
              type={message.type}
              agentState={getMessageAgentState(message)}
            />
          ))}
          {(isLastMessageUser || isGenerating) && (
            <MessageLoading
              currentStep={stream.phase ? `${stream.phase}:${stream.detail ?? ""}` : project.currentStep}
              files={stream.files}
              onAnswer={handleAnswerClarification}
            />
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-sidebar pointer-events-none" />
        {activeFragment && isModifyOpen && (
          <ModifyControls
            fragment={activeFragment}
            onConfigChange={onConfigChange}
          />
        )}
        <MessageForm
          projectId={projectId}
          showModifyButton={!!activeFragment}
          isModifyOpen={isModifyOpen}
          onModifyToggle={() => setIsModifyOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
};
