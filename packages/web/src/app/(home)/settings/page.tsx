"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { ApiKeysPanel } from "./api-keys";
import { McpSetupPanel } from "./mcp-setup";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-12 px-4 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <ApiKeysPanel />
      <McpSetupPanel />
    </div>
  );
}
