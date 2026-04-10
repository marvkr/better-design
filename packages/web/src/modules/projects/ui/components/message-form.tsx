import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/api-error";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useGetUsageStatus } from "@/hooks/use-get-usage-status";
import { useCreateMessage } from "@/hooks/use-create-message";

import { Usage } from "./usage";

interface Props {
  projectId: string;
  showModifyButton?: boolean;
  isModifyOpen?: boolean;
  onModifyToggle?: () => void;
}

const formSchema = z.object({
  value: z.string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
})

export const MessageForm = ({
  projectId,
  showModifyButton = false,
  isModifyOpen = false,
  onModifyToggle,
}: Props) => {
  const router = useRouter();

  const { data: usage } = useGetUsageStatus();
  const createMessage = useCreateMessage(projectId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createMessage.mutateAsync(
      { value: values.value, projectId },
      {
        onSuccess: () => form.reset(),
        onError: (error) => {
          toast.error(error.message);
          if (error instanceof ApiError && error.data?.code === "TOO_MANY_REQUESTS") {
            router.push("/pricing");
          }
        },
      },
    );
  };

  const isPending = createMessage.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;
  const showUsage = !!usage;

  return (
    <Form {...form}>
      {showUsage && (
        <Usage
          points={usage.remainingPoints}
          msBeforeNext={usage.msBeforeNext}
        />
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar transition-all",
          showUsage && "rounded-t-none",
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              disabled={isPending}
              minRows={2}
              maxRows={8}
              className="pt-4 resize-none border-none w-full outline-none bg-transparent"
              placeholder="What would you like to build?"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            />
          )}
        />
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>&#8984;</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <div className="flex items-center gap-x-2">
            {showModifyButton && (
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={onModifyToggle}
                className={cn(
                  "w-auto px-3 gap-x-1.5",
                  isModifyOpen && "[&>span:nth-child(2)]:opacity-100 [&>span:nth-child(2)]:group-hover:opacity-100"
                )}
              >
                <Icon icon="tabler:adjustments-horizontal" className="size-4" />
                Modify
              </Button>
            )}
            <Button
              disabled={isButtonDisabled}
              size="icon"
              className={cn(
                isButtonDisabled && "!bg-muted-foreground"
              )}
            >
              {isPending ? (
                <Icon icon="tabler:loader-2" className="size-4 animate-spin" />
              ) : (
                <Icon icon="tabler:arrow-up" className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
