import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export type ProjectsResponseType = InferResponseType<
  typeof apiClient.api.projects.$get,
  200
>;

export const useGetProjects = (
  options?: Omit<UseQueryOptions<ProjectsResponseType>, "queryKey" | "queryFn">,
) => {
  return useQuery<ProjectsResponseType>({
    queryKey: ["projects", "getMany"],
    queryFn: async () => {
      const response = await apiClient.api.projects.$get();
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
