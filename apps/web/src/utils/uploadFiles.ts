import { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { CloudinaryFileResponseType } from "types/cloudinaryTypes";

export const uploadFiles = async (
  file: File | File[],
  axiosInstance: AxiosInstance,
  type: "image" | "raw" = "image"
): Promise<
  CloudinaryFileResponseType | CloudinaryFileResponseType[] | null
> => {
  if (!file || (Array.isArray(file) && file.length === 0)) {
    toast.error("File can't be empty");
    return null;
  }

  try {
    const formData = new FormData();

    if (Array.isArray(file)) {
      formData.append("pdfs", file[0]);
      formData.append("pdfs", file[1]);
    } else {
      formData.append("file", file);
    }

    const response = await axiosInstance.post(
      `/cloudinary/upload/${type}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 201) throw new Error("File upload failed");

    return response.data;
  } catch (error: any | Error) {
    console.error("Error uploading images:", error);
    toast.error("Error uploading files");
    return null;
  }
};
