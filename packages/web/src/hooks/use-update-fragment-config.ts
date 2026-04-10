import { InferResponseType, InferRequestType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type ResponseType = InferResponseType<
  (typeof apiClient.api.fragments)[":id"]["config"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof apiClient.api.fragments)[":id"]["config"]["$patch"]
>["json"] & { fragmentId: string };

export const useUpdateFragmentConfig = () => {
  return useMutation<ResponseType, ApiError, RequestType>({
    mutationFn: async ({ fragmentId, ...json }) => {
      const response = await apiClient.api.fragments[":id"].config.$patch({
        param: { id: fragmentId },
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
