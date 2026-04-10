"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type ApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
};

async function fetchApiKeys(): Promise<ApiKey[]> {
  const res = await apiClient.api["api-keys"].$get();
  if (!res.ok) throw new Error("Failed to fetch API keys");
  const data = await res.json();
  return data.keys as ApiKey[];
}

export function ApiKeysPanel() {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [revokeId, setRevokeId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { data: keys = [], isLoading } = useQuery({
    queryKey: ["api-keys"],
    queryFn: fetchApiKeys,
  });

  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiClient.api["api-keys"].$post({ json: { name } });
      if (!res.ok) throw new Error("Failed to create API key");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      setCreatedKey((data as { key: string }).key);
      setNewKeyName("");
    },
    onError: () => toast.error("Failed to create API key"),
  });

  const revokeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.api["api-keys"][":id"].$delete({ param: { id } });
      if (!res.ok) throw new Error("Failed to revoke API key");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      setRevokeId(null);
      toast.success("API key revoked");
    },
    onError: () => toast.error("Failed to revoke API key"),
  });

  async function handleCopy() {
    if (!createdKey) return;
    await navigator.clipboard.writeText(createdKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleCreateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newKeyName.trim()) {
      createMutation.mutate(newKeyName.trim());
    }
  }

  function handleCreateClose() {
    setCreateOpen(false);
    setCreatedKey(null);
    setNewKeyName("");
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription className="mt-1">
              Use API keys to access Better Design from Claude Code, Cursor, or any HTTP client.
            </CardDescription>
          </div>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Icon icon="tabler:plus" className="mr-1.5 h-4 w-4" />
            New key
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-md bg-muted" />
              ))}
            </div>
          ) : keys.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Icon icon="tabler:key-off" className="mb-2 h-8 w-8 opacity-40" />
              <p className="text-sm">No API keys yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between py-3"
                  data-testid="api-key-row"
                >
                  <div className="flex items-center gap-3">
                    <Icon icon="tabler:key" className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{key.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{key.keyPrefix}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground">
                        Created {format(new Date(key.createdAt), "MMM d, yyyy")}
                      </p>
                      {key.lastUsedAt && (
                        <p className="text-xs text-muted-foreground">
                          Last used {format(new Date(key.lastUsedAt), "MMM d, yyyy")}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Actions for ${key.name}`}
                        >
                          <Icon icon="tabler:dots" className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setRevokeId(key.id)}
                        >
                          <Icon icon="tabler:trash" className="mr-2 h-4 w-4" />
                          Revoke key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create key dialog */}
      <Dialog open={createOpen} onOpenChange={(open) => { if (!open) handleCreateClose(); else setCreateOpen(true); }}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Give this key a name to identify where it&apos;s used.
            </DialogDescription>
          </DialogHeader>

          {createdKey ? (
            <div className="space-y-4">
              <div className="rounded-md bg-amber-500/10 border border-amber-500/20 p-3 text-sm text-amber-600 dark:text-amber-400">
                <Icon icon="tabler:alert-triangle" className="inline mr-1.5 h-4 w-4" />
                Copy this key now — you won&apos;t see it again.
              </div>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={createdKey}
                  className="font-mono text-xs"
                  aria-label="Created API key"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopy}
                  aria-label={copied ? "API key copied" : "Copy API key"}
                >
                  <Icon icon={copied ? "tabler:check" : "tabler:copy"} className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this key in your <code className="text-xs bg-muted px-1 py-0.5 rounded">Authorization: Bearer</code> header.
              </p>
              <DialogFooter>
                <Button onClick={handleCreateClose}>Done</Button>
              </DialogFooter>
            </div>
          ) : (
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g. Claude Code, Cursor, My Agent"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  autoFocus
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCreateClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!newKeyName.trim() || createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Create key"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Revoke confirmation dialog */}
      <Dialog open={!!revokeId} onOpenChange={(open) => { if (!open) setRevokeId(null); }}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              This key will stop working immediately. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevokeId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={revokeMutation.isPending}
              onClick={() => revokeId && revokeMutation.mutate(revokeId)}
            >
              {revokeMutation.isPending ? "Revoking..." : "Revoke key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
