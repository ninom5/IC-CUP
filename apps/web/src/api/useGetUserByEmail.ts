import { api } from "@api/base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserType } from "types/userType";

const getUserByEmail = async (email: string): Promise<UserType | null> => {
  try {
    const response = await api.get(`/user/email/${email}`);

    if (response.status !== 200) throw new Error("Error getting user by email");

    return response.data;
  } catch (error: Error | any) {
    console.error(`Error getting user by email: ${error}`);
    toast.error(
      `Error getting user by email: ${error?.response?.data?.message}`
    );

    return null;
  }
};

export const useGetUserByEmail = () => {
  return useMutation<UserType | null, Error, string>({
    mutationFn: getUserByEmail,
  });
};
