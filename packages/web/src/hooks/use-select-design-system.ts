import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type ResponseType = InferResponseType<
  (typeof apiClient.api.projects)[":id"]["select-design-system"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof apiClient.api.projects)[":id"]["select-design-system"]["$post"]
>["json"];

export const useSelectDesignSystem = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, ApiError, RequestType>({
    mutationFn: async (json) => {
      const response = await apiClient.api.projects[":id"]["select-design-system"].$post({
        param: { id: projectId },
        json,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", "getMany", projectId] });
    },
  });
};
