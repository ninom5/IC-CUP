import { useQuery } from "@tanstack/react-query";
import { api } from "@api/index";
import { UserRating } from "types";

const getUserRating = async (userId: string) => {
  return api.get<never, UserRating>(`/user/${userId}/rating`);
};

export const useGetUserRating = (userId: string) =>
  useQuery({
    queryKey: ["user-rating", userId],
    queryFn: () => getUserRating(userId),
    enabled: !!userId,
  });
