import { LoginType } from "types";
import { api } from "./base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export type JwtResponse = {
  access_token: string;
};

const loginUser = async (loginData: LoginType) => {
  return api.post<LoginType, JwtResponse>("/auth/login", loginData);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login-user"],
    onSuccess: (data: JwtResponse) => {
      localStorage.setItem("jwt", JSON.stringify(data));
      toast.success("Successfully logged in");
    },
    onError(error: string) {
      toast.error(`Error logging in: ${error}`);
    },
  });
};
