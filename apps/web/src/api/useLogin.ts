import { api } from "./base";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<string> => {
  const response = await api.post("/auth/login", loginData);

  if (response.status !== 201) throw new Error("Login failed");

  return response.data.token;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
