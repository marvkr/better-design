"use client";

import { Suspense, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type InviteState =
  | { status: "loading" }
  | { status: "invalid" }
  | { status: "valid"; email: string };

function SignUpInner() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("invite");

  const [invite, setInvite] = useState<InviteState>({ status: "loading" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }
    let cancelled = false;
    (async () => {
      const res = await fetch(
        `/api/invites/validate/${encodeURIComponent(token)}`,
      );
      const body = (await res.json()) as
        | { valid: true; email: string }
        | { valid: false; reason: string };
      if (cancelled) return;
      if (body.valid) {
        setInvite({ status: "valid", email: body.email });
      } else {
        setInvite({ status: "invalid" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (invite.status !== "valid") return;
    setIsLoading(true);
    setError(null);

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: invite.email,
      password: values.password,
    });

    if (error) {
      setError(error.message ?? "Sign up failed");
      setIsLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  if (invite.status === "loading") {
    return (
      <div className="flex flex-col max-w-3xl mx-auto w-full">
        <section className="space-y-6 pt-[16vh] 2xl:pt-48">
          <div className="flex flex-col items-center">
            <Loader2Icon className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </section>
      </div>
    );
  }

  if (invite.status === "invalid") {
    return (
      <div className="flex flex-col max-w-3xl mx-auto w-full">
        <section className="space-y-6 pt-[16vh] 2xl:pt-48">
          <div className="flex flex-col items-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Logo size={40} />
                </div>
                <CardTitle>Invite not valid</CardTitle>
                <CardDescription>
                  This invite link has expired or been used. Join the waitlist
                  and we&apos;ll send you a fresh one.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={() => router.push("/")}>
                  Back to waitlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Logo size={40} />
              </div>
              <CardTitle>Claim your invite</CardTitle>
              <CardDescription>
                Finish creating your account for {invite.email}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="text-sm text-destructive text-center p-2 bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        value={invite.email}
                        readOnly
                        className="cursor-not-allowed"
                      />
                    </FormControl>
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create account
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUpInner />
    </Suspense>
  );
}
