import { api } from "@api/base";
import { UserType } from "types";

export const getUserByEmail = async (
  email: string
): Promise<UserType | null> => {
  return await api.get<never, UserType>(`/user/email/${email}`);
};
