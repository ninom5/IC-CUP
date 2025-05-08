import { axiosInstanceAPI } from "./base";

export const useLogin = (loginData: { email: string; password: string }) => {
  const axiosInstance = axiosInstanceAPI();

  const login = async () => {
    const response = await axiosInstance.post("/auth/login", loginData);

    if (response.status !== 201) throw new Error("Error logging in");

    return response.data?.token;
  };

  return login;
};
