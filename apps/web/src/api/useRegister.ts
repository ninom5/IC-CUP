import { RegisterDataType } from "types/registerDataType";
import { axiosInstanceAPI } from "./base";
import { toast } from "react-toastify";

export const useRegister = () => {
  const axiosInstance = axiosInstanceAPI();

  const register = async (registerData: RegisterDataType) => {
    const registerResponse = await axiosInstance.post(
      "/auth/register",
      registerData
    );
    if (registerResponse.status !== 201) throw new Error("Error registering");

    toast.success("Successfully registered. Now you can login");
  };

  return register;
};
