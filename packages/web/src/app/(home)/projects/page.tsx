"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/hooks/use-get-projects";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const { data: projects, isLoading } = useGetProjects({ enabled: !!user });

  if (!isPending && !user) {
    return (
      <div className="flex flex-col items-center justify-center pt-32 gap-4">
        <p className="text-muted-foreground">Sign in to view your projects</p>
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full pt-28 pb-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : projects?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Button asChild>
                <Link href="/">Create your first project</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
