import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const doesEmailExist = async (
  email: string,
  axiosInstance: AxiosInstance
): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(`/user/email/${email}`);
    if (response.status === 404) return false;

    if (response.status !== 200) throw new Error("Error getting user by email");
    console.log(response.data);

    return true;
  } catch (error: Error | any) {
    console.error(`Error getting user by email: ${error}`);
    toast.error(
      `Error getting user by email: ${error?.response?.data?.message}`
    );

    return false;
  }
};
