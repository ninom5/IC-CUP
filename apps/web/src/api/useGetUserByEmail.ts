import { api } from "@api/base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserType } from "types";

const getUserByEmail = async (email: string): Promise<UserType | null> => {
  return await api.get(`/user/email/${email}`);
};

export const useGetUserByEmail = () => {
  return useMutation<UserType | null, Error, string>({
    mutationFn: getUserByEmail,
    onError: (error) => toast.error(`Error getting user by email: ${error}`),
  });
};
