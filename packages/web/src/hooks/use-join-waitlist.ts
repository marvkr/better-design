import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type ResponseType = InferResponseType<typeof apiClient.api.waitlist.join.$post, 200>;
type RequestType = InferRequestType<typeof apiClient.api.waitlist.join.$post>["json"];

export const useJoinWaitlist = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, ApiError, RequestType>({
    mutationFn: async (json) => {
      const response = await apiClient.api.waitlist.join.$post({ json });
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
      queryClient.invalidateQueries({ queryKey: ["waitlist", "spots-left"] });
    },
  });
};
