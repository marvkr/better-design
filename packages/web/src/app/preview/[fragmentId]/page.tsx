import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import Link from "next/link";
import type { Metadata } from "next";

import { db, fragments } from "@/db";
import { buildPreviewHTML } from "@/lib/build-preview-html";

interface Props {
  params: Promise<{ fragmentId: string }>;
}

export default async function PreviewPage({ params }: Props) {
  const { fragmentId } = await params;

  const fragment = await db.query.fragments.findFirst({
    where: eq(fragments.id, fragmentId),
  });

  if (!fragment) notFound();

  const html = buildPreviewHTML(
    fragment.files as Record<string, string>,
    fragment.config,
  );

  return (
    <div className="h-screen w-screen relative">
      <iframe
        srcDoc={html}
        className="w-full h-full border-0"
        sandbox="allow-scripts"
        title={fragment.title}
      />
      <div className="absolute bottom-4 right-4">
        <Link
          href="/"
          className="flex items-center gap-2 bg-background/90 backdrop-blur border border-border rounded-full px-4 py-2 text-sm font-medium shadow-lg hover:bg-background transition-colors"
        >
          Build yours on betterdesign.ai →
        </Link>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { fragmentId } = await params;

  const fragment = await db.query.fragments.findFirst({
    where: eq(fragments.id, fragmentId),
    columns: { title: true },
  });

  return {
    title: fragment ? `${fragment.title} — Better Design` : "Design System Preview",
    description: "A design system generated with Better Design",
  };
}
