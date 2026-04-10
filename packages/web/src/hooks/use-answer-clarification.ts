import { InferResponseType, InferRequestType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type ResponseType = InferResponseType<
  (typeof apiClient.api.projects)[":id"]["answer-clarification"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof apiClient.api.projects)[":id"]["answer-clarification"]["$post"]
>["json"];

export const useAnswerClarification = (projectId: string) => {
  return useMutation<ResponseType, ApiError, RequestType>({
    mutationFn: async (json) => {
      const response = await apiClient.api.projects[":id"]["answer-clarification"].$post({
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
  });
};
