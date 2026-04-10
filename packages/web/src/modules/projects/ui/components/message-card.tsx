import { format } from "date-fns";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { linkifyIconLibraries } from "@/lib/icon-libraries/linkify";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Message, MessageMetadata } from "@/db";
import { DotMatrix, type AgentState } from "./agent-state-indicator";

interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex justify-end pb-4 pr-2 pl-10">
      <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
        {content}
      </Card>
    </div>
  );
};


interface DesignSystemCardsProps {
  metadata: MessageMetadata;
  onSelectDesignSystem: (designSystemId: string) => void;
  isLoading?: boolean;
}

const DesignSystemCards = ({
  metadata,
  onSelectDesignSystem,
  isLoading,
}: DesignSystemCardsProps) => {
  if (metadata.type !== "recommendation") {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {metadata.recommendations.map((rec) => (
        <button
          key={rec.id}
          disabled={isLoading}
          onClick={() => onSelectDesignSystem(rec.id)}
          className={cn(
            "flex flex-col items-start text-start gap-2 border rounded-lg bg-muted p-4 hover:bg-secondary transition-colors min-w-[200px] max-w-[280px]",
            isLoading && "opacity-50 cursor-not-allowed",
          )}
        >
          <div className="flex items-center gap-2 w-full">
            <Icon icon="tabler:palette" className="size-4 shrink-0" />
            <span className="text-sm font-medium">{rec.title}</span>
            <Badge variant="secondary" className="ml-auto text-xs">
              {rec.matchScore}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {rec.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {rec.personality.slice(0, 3).map((trait) => (
              <Badge key={trait} variant="outline" className="text-xs">
                {trait}
              </Badge>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};

interface AssistantMessageProps {
  content: string;
  metadata: MessageMetadata | null;
  createdAt: Date;
  onSelectDesignSystem?: (designSystemId: string) => void;
  isSelectingDesignSystem?: boolean;
  type: Message["type"];
  agentState?: AgentState;
}

const AssistantMessage = ({
  content,
  metadata,
  createdAt,
  onSelectDesignSystem,
  isSelectingDesignSystem,
  type,
  agentState,
}: AssistantMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4",
        type === "ERROR" && "text-red-700 dark:text-red-500",
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Logo size={18} className="shrink-0" />
        <span className="text-sm font-medium">Better Design</span>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>
      <div className={cn(
        "flex flex-col gap-y-4 prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-a:text-primary prose-a:underline prose-a:underline-offset-2",
        !agentState && "pl-8.5"
      )}>
        <div className="flex gap-2 items-start">
          {agentState && (
            <div className="shrink-0 pl-2">
              <DotMatrix state={agentState} />
            </div>
          )}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a({ node: _node, href, children, ...props }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {linkifyIconLibraries(content)}
          </ReactMarkdown>
        </div>
        {metadata && onSelectDesignSystem && (
          <DesignSystemCards
            metadata={metadata}
            onSelectDesignSystem={onSelectDesignSystem}
            isLoading={isSelectingDesignSystem}
          />
        )}
      </div>
    </div>
  );
};

interface MessageCardProps {
  content: string;
  role: Message["role"];
  metadata: MessageMetadata | null;
  createdAt: Date;
  onSelectDesignSystem?: (designSystemId: string) => void;
  isSelectingDesignSystem?: boolean;
  type: Message["type"];
  agentState?: AgentState;
}

export const MessageCard = ({
  content,
  role,
  metadata,
  createdAt,
  onSelectDesignSystem,
  isSelectingDesignSystem,
  type,
  agentState,
}: MessageCardProps) => {
  if (role === "ASSISTANT") {
    return (
      <AssistantMessage
        content={content}
        metadata={metadata}
        createdAt={createdAt}
        onSelectDesignSystem={onSelectDesignSystem}
        isSelectingDesignSystem={isSelectingDesignSystem}
        type={type}
        agentState={agentState}
      />
    );
  }

  return <UserMessage content={content} />;
};
