import { InferResponseType } from "hono";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { UseSuspenseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export type ProjectResponseType = InferResponseType<
  (typeof apiClient.api.projects)[":id"]["$get"],
  200
>;

export const useGetProject = (
  projectId: string,
  options?: Omit<UseSuspenseQueryOptions<ProjectResponseType>, "queryKey" | "queryFn">,
) => {
  return useSuspenseQuery<ProjectResponseType>({
    queryKey: ["projects", "getOne", projectId],
    queryFn: async () => {
      const response = await apiClient.api.projects[":id"].$get({
        param: { id: projectId },
      });
      if (!response.ok) {
        const body = (await response.json()) as unknown as {
          code?: string;
          message?: string;
        };
        throw new ApiError(body.code ?? "UNKNOWN", body.message ?? "Something went wrong");
      }
      return await response.json();
    },
    ...options,
  });
};
