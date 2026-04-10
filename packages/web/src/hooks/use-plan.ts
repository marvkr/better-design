"use client";

import { authClient } from "@/lib/auth-client";

export function usePlan() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user as { plan?: string } | undefined;
  const plan = user?.plan ?? "free";
  const hasProAccess = plan === "pro";

  return {
    plan,
    hasProAccess,
    isPending,
  };
}
