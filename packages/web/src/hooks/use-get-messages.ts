import { InferResponseType } from "hono";
import { useSuspenseQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export type MessagesResponseType = InferResponseType<
  typeof apiClient.api.messages.$get,
  200
>;

export const useGetMessages = (projectId: string, isGenerating = false) => {
  return useSuspenseQuery<MessagesResponseType>({
    queryKey: ["messages", "getMany", projectId],
    queryFn: async () => {
      const response = await apiClient.api.messages.$get({ query: { projectId } });
      if (!response.ok) {
        const body = (await response.json()) as unknown as {
          code?: string;
          message?: string;
        };
        throw new ApiError(body.code ?? "UNKNOWN", body.message ?? "Something went wrong");
      }
      return await response.json();
    },
    refetchInterval: (query) => {
      if (isGenerating) return 2000;
      const data = query.state.data;
      if (!data) return false;
      const last = data[data.length - 1];
      if (last?.role === "USER") return 2000;
      return false;
    },
  });
};
