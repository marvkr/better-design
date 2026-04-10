import Link from "next/link";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";

export const ProjectNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <Icon icon="tabler:file-off" className="size-12 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Project not found</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          This project doesn&apos;t exist or you don&apos;t have access to it.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <Icon icon="tabler:arrow-left" className="size-4 mr-2" />
          Back to home
        </Link>
      </Button>
    </div>
  );
};
