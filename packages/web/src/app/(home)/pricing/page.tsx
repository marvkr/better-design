"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleUpgrade = async () => {
    if (!session?.user) {
      router.push("/sign-up");
      return;
    }

    setClaiming(true);
    try {
      const res = await fetch("/api/claim-bonus", { method: "POST" });
      const data = await res.json();

      if (data.alreadyClaimed) {
        toast.info("You're already on the waitlist!");
        setClaimed(true);
      } else if (data.success) {
        toast.success("You're on the waitlist! We've added 3 bonus credits.");
        setClaimed(true);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to claim bonus");
    } finally {
      setClaiming(false);
    }
  };

  const handleGetStarted = () => {
    if (session?.user) {
      router.push("/");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 py-8 md:py-16">
        <div className="flex flex-col items-center">
          <Logo size={50} className="hidden md:block" />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-center">Pricing</h1>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          Choose the plan that fits your needs
        </p>
        <div className="grid md:grid-cols-2 gap-6 pt-8">
          {/* Free Plan */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Perfect for trying out Better Design</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold">$0</div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Icon icon="tabler:check" className="h-4 w-4 text-primary" />
                  <span className="text-sm">2 generations per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="tabler:check" className="h-4 w-4 text-primary" />
                  <span className="text-sm">Basic design systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="tabler:check" className="h-4 w-4 text-primary" />
                  <span className="text-sm">Community support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={handleGetStarted}>
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col h-full border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For serious builders</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold">
                $19
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Icon icon="tabler:check" className="h-4 w-4 text-primary" />
                  <span className="text-sm">100 generations per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="tabler:check" className="h-4 w-4 text-primary" />
                  <span className="text-sm">All design systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="tabler:check" className="h-4 w-4 text-primary" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="tabler:check" className="h-4 w-4 text-primary" />
                  <span className="text-sm">Export to code</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleUpgrade}
                disabled={claiming || claimed}
              >
                {claiming ? (
                  <>
                    <Icon icon="tabler:loader-2" className="size-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : claimed ? (
                  <>
                    <Icon icon="tabler:check" className="size-4 mr-2" />
                    You&apos;re on the waitlist!
                  </>
                ) : (
                  "Upgrade to Pro"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {claimed && (
          <div className="text-center space-y-2 p-4 rounded-lg bg-muted/50">
            <p className="text-sm font-medium">
              Thanks for your interest in Pro!
            </p>
            <p className="text-sm text-muted-foreground">
              We&apos;re not accepting payments yet — this was just to gauge interest.
              We&apos;ve added you to our waitlist and given you 3 bonus credits.
              We&apos;ll notify you when Pro launches!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
