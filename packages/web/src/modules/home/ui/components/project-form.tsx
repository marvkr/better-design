"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/api-error";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useCreateProject } from "@/hooks/use-create-project";
import { useCreateAnonymousProject } from "@/hooks/use-create-anonymous-project";

import { PROJECT_TEMPLATES } from "../../constants";

const PLACEHOLDERS = [
  "e.g. A dev tool dashboard — dark, purple accents, very Linear...",
  "e.g. A backend platform for devs, dark with green accents, Supabase vibes...",
  "e.g. A travel marketplace, warm and inviting, feels like Airbnb...",
  "e.g. A note-taking app, clean and minimal, very Notion...",
  "e.g. A payment product, polished and trustworthy, think Stripe...",
  "e.g. A deployment platform, stark black and white, very Vercel...",
]

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
});

export const ProjectForm = () => {
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  const [selectedDesignSystemId, setSelectedDesignSystemId] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createProject = useCreateProject();
  const createAnonymousProject = useCreateAnonymousProject();

  const handleError = (error: ApiError) => {
    if (error.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
      return;
    }
    if (error.data?.code === "TOO_MANY_REQUESTS") {
      if (error.message.includes("System is busy")) {
        toast.error("System is busy. Please try again in a moment.");
      } else {
        router.push(isAuthenticated ? "/pricing" : "/sign-up");
      }
      return;
    }
    toast.error(error.message);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isSessionLoading) return;
    if (isAuthenticated) {
      createProject.mutate(
        { value: values.value, designSystemId: selectedDesignSystemId },
        {
          onSuccess: (data) => router.push(`/projects/${data.id}`),
          onError: handleError,
        },
      );
    } else {
      createAnonymousProject.mutate(
        { value: values.value, designSystemId: selectedDesignSystemId },
        {
          onSuccess: (data) => router.push(`/projects/${data.id}`),
          onError: handleError,
        },
      );
    }
  };

  const isPending = createProject.isPending || createAnonymousProject.isPending || isSessionLoading;

  const onSelect = (value: string, designSystemId?: string) => {
    form.setValue("value", value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    setSelectedDesignSystemId(designSystemId);
  };

  const placeholder = useRef(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]).current;
  const [isFocused, setIsFocused] = useState(false);
  const isButtonDisabled = isPending || !form.formState.isValid;

  return (
    <>
      <Form {...form}>
        <section className="space-y-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border p-4 pt-1 rounded-xl bg-card transition-all",
            isFocused && "shadow-xs",
          )}
          suppressHydrationWarning
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                disabled={isPending}
                suppressHydrationWarning
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={2}
                maxRows={8}
                className="pt-4 resize-none border-none w-full outline-none bg-transparent placeholder:text-muted-foreground/40"
                placeholder={placeholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)(e);
                  }
                }}
              />
            )}
          />
          <div className="flex gap-x-2 items-center justify-between pt-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/40">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                <span>⌘</span>
                <span>+</span>
                <span>Enter</span>
              </kbd>
              <span>to submit</span>
            </div>
            <Button
              disabled={isButtonDisabled}
              size="icon"
              suppressHydrationWarning
              className={cn(
                isButtonDisabled && "!bg-muted-foreground",
              )}
            >
              {isPending ? (
                <Icon icon="tabler:loader-2" className="size-4 animate-spin" />
              ) : (
                <Icon icon="tabler:arrow-up" className="size-4" />
              )}
            </Button>
          </div>
        </form>
        <div className="flex items-center gap-2 overflow-x-auto max-w-3xl scrollbar-none">
          <span className="text-xs text-muted-foreground/60 shrink-0">Try in the style of:</span>
          {PROJECT_TEMPLATES.map((template) => (
            <Button
              key={template.title}
              variant="outline"
              size="sm"
              onClick={() => onSelect(template.prompt, template.designSystemId)}
            >
              <Icon icon={template.icon} className="size-4" />
              {template.title}
            </Button>
          ))}
        </div>
      </section>
      </Form>
    </>
  );
};
