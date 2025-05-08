import { LoginType } from "types";
import { api } from "./base";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (loginData: LoginType): Promise<string> => {
  return (await api.post("/auth/login", loginData)).config.data.token;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
