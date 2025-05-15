import { UserProfileType } from "types";
import { api } from "@api/index";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = async (userId: string): Promise<UserProfileType> => {
  const response = await api.get<never, UserProfileType>(`/user/${userId}`);
  return response;
};

export const useFetchUserProfile = (userId: string) =>
  useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });
