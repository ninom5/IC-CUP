import { api } from "@api/base";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "types";

const getUserByEmail = async (email: string): Promise<UserType | null> => {
  return await api.get<never, UserType>(`/user/email/${email}`);
};

export const useGetUserByEmail = (email: string) => {
  return useQuery<UserType | null>({
    queryKey: ["get-user-by-email", email],
    queryFn: () => getUserByEmail(email),
    enabled: !!email,
  });
};
