"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJoinWaitlist } from "@/hooks/use-join-waitlist";

export function WaitlistForm() {
  const [email, setEmail] = useState("");

  const joinWaitlist = useJoinWaitlist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    joinWaitlist.mutate({ email, source: "homepage" });
  };

  if (joinWaitlist.isSuccess) {
    return (
      <div className="text-center space-y-2 p-6 rounded-xl border bg-card">
        <Icon icon="tabler:sparkles" className="size-6 text-primary mx-auto" />
        <p className="text-sm font-medium">
          You&apos;re on the list! We&apos;ll reach out when your spot is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={joinWaitlist.isPending}>
          {joinWaitlist.isPending ? (
            <Icon icon="tabler:loader-2" className="size-4 animate-spin" />
          ) : (
            "Get early access"
          )}
        </Button>
      </div>
    </form>
  );
}
