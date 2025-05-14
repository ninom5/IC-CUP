import { CloudinaryFileResponseType } from "types";
import { api } from "./base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const uploadDocumentsForProfile = async (files: File[]) => {
  if (!Array.isArray(files) || files.length === 0) {
    toast.error("Morate odabrati barem jedan dokument.");
    return null;
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("pdfs", file));

  const response = await api.post<File[], CloudinaryFileResponseType[]>(
    "/cloudinary/upload/raw-one-or-more",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export const useUploadDocumentsForProfile = () => {
  return useMutation<CloudinaryFileResponseType[] | null, Error, File[]>({
    mutationFn: uploadDocumentsForProfile,
    onError: () => {
      toast.error("Greška pri uploadu dokumenata.");
    },
    onSuccess: () => {
      toast.success("Dokument(i) uspješno spremljeni.");
    },
  });
};
