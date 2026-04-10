"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/hooks/use-get-projects";

export const ProjectsList = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { data: projects } = useGetProjects({ enabled: !!user });
  if (!user) return null;

  return (
    <div className="w-full bg-card rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        {user?.name?.split(" ")[0]}&apos;s Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">No projects found</p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start p-4"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Logo size={32} />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
