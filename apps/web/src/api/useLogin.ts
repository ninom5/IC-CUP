import { axiosInstanceAPI } from "./base";
import { toast } from "react-toastify";

export const useLogin = (
  loginData: { email: string; password: string },
  updateToken: () => void
) => {
  const axiosInstance = axiosInstanceAPI();

  const login = async () => {
    const response = await axiosInstance.post("/auth/login", loginData);
    const token = response.data?.token;

    if (!token) {
      toast.error("Invalid username or password");
      return;
    }

    localStorage.setItem("jwt", token);
    updateToken();
  };

  return login;
};
