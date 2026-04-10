import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export type UsageStatusResponseType = InferResponseType<
  typeof apiClient.api.usage.status.$get,
  200
>;

export const useGetUsageStatus = () => {
  return useQuery<UsageStatusResponseType>({
    queryKey: ["usage", "status"],
    queryFn: async () => {
      const response = await apiClient.api.usage.status.$get();
      if (!response.ok) {
        const body = (await response.json()) as unknown as {
          code?: string;
          message?: string;
        };
        throw new ApiError(body.code ?? "UNKNOWN", body.message ?? "Something went wrong");
      }
      return await response.json();
    },
  });
};
