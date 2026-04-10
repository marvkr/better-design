import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ProjectView } from "@/modules/projects/ui/views/project-view";
import { ProjectNotFound } from "@/modules/projects/ui/components/project-not-found";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { projectId } = await params;

  return (
    <ErrorBoundary fallback={<ProjectNotFound />}>
      <Suspense fallback={<p>Loading Project...</p>}>
        <ProjectView projectId={projectId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
