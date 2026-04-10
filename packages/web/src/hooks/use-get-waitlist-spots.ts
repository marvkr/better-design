import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export type WaitlistSpotsResponseType = InferResponseType<
  (typeof apiClient.api.waitlist)["spots-left"]["$get"],
  200
>;

export const useGetWaitlistSpots = () => {
  return useQuery<WaitlistSpotsResponseType>({
    queryKey: ["waitlist", "spots-left"],
    queryFn: async () => {
      const response = await apiClient.api.waitlist["spots-left"].$get();
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
