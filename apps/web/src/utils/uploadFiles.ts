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

    console.log("Files being uploaded:", file);

    if (Array.isArray(file)) {
      formData.append("pdfs", file[0]);
      formData.append("pdfs", file[1]);

      console.log("idPdf appended to formData:", formData.get("pdfs"));
      console.log("driverPdf appended to formData:", formData.get("pdfs"));
    } else {
      formData.append("file", file);
      console.log("File appended to formData:", formData.get("file"));
    }

    const formDataEntries = Array.from(formData.entries());
    console.log("FormData entries:", formDataEntries);
    console.log("Axios base URL:", axiosInstance.defaults.baseURL);

    const response = await axiosInstance.post(
      `/cloudinary/upload/${type}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    if (response.status !== 201) throw new Error("File upload failed");

    return response.data;
  } catch (error: any | Error) {
    console.error("Error uploading images:", error);
    toast.error("Error uploading files");
    return null;
  }
};
