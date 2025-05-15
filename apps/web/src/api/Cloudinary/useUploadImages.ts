import { api } from "@api/base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CloudinaryFileResponseType } from "types/index";

export const uploadFiles = async (file: File) => {
  if (!file) {
    toast.error("Morate dodati dokumente");
    return null;
  }

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<File, CloudinaryFileResponseType>(
    `/cloudinary/upload/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export const useUploadImages = () => {
  return useMutation({
    mutationFn: uploadFiles,
    onError: (error) => {
      toast.error("Greška prilikom spremanja slika");
      console.error(error);
    },
  });
};
