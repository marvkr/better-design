import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-6">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-card text-primary">
          <Icon icon="tabler:compass-off" className="size-7" />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
            Page not found
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Icon icon="tabler:arrow-left" className="size-4" />
            Back home
          </Link>
          <Link
            href="/design-systems"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            <Icon icon="tabler:palette" className="size-4" />
            Browse design systems
          </Link>
        </div>
      </div>
    </div>
  );
}
