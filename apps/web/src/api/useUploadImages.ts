import { api } from "@api/base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CloudinaryFileResponseType } from "types/index";

const uploadFiles = async (
  file: File
): Promise<CloudinaryFileResponseType | null> => {
  if (!file) {
    toast.error("File can't be empty");
    return null;
  }

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(`/cloudinary/upload/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useUploadImages = () => {
  return useMutation({
    mutationFn: uploadFiles,
    onError: (error) => {
      toast.error("Error uploading image(s)");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Image(s) uploaded successfully!");
    },
  });
};
