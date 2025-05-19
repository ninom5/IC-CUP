import { ReviewCardData } from "types";
import { api } from "@api/index";
import { useQuery } from "@tanstack/react-query";

const getUserReviews = async (userId: string): Promise<ReviewCardData[]> => {
  return await api.get<never, ReviewCardData[]>(`/review/user/${userId}`);
};

export const useGetUserReviews = (userId: string) =>
  useQuery({
    queryKey: ["user-reviews", userId],
    queryFn: () => getUserReviews(userId),
    enabled: !!userId,
  });
