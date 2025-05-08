import { LoginType } from "types";
import { api } from "./base";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (loginData: LoginType) => {
  const token = (await api.post("/auth/login", loginData)).data?.token;
  localStorage.setItem("jwt", token);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
