import { axiosInstanceAPI } from "./base";
import { toast } from "react-toastify";

export const useLogin = (
  loginData: { email: string; password: string },
  updateToken: () => void
) => {
  const axiosInstance = axiosInstanceAPI();

  const login = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      if (response.status !== 201) throw new Error("Error logging in");
      const token = response.data?.token;

      if (!token) {
        toast.error("Invalid username or password");
        return;
      }

      localStorage.setItem("jwt", token);
      updateToken();
    } catch (error: Error | any) {
      console.error(`Error trying to log in: ${error}`);

      toast.error(`Error trying to login: ${error.response?.data?.message}`);
    }
  };

  return login;
};
