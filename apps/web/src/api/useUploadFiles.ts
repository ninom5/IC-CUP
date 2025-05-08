import { api } from "@api/base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CloudinaryFileResponseType } from "types/cloudinaryTypes";

const uploadFiles = async (params: {
  file: File | File[];
  type?: "image" | "raw";
}): Promise<
  CloudinaryFileResponseType | CloudinaryFileResponseType[] | null
> => {
  const { file, type = "image" } = params;

  if (!file || (Array.isArray(file) && file.length === 0)) {
    toast.error("File can't be empty");
    return null;
  }

  try {
    const formData = new FormData();

    if (Array.isArray(file)) {
      file.forEach((f) => formData.append("pdfs", f));
    } else {
      formData.append("file", file);
    }

    const response = await api.post(`/cloudinary/upload/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201) throw new Error("File upload failed");

    return response.data;
  } catch (error: any) {
    console.error("Error uploading files:", error);
    toast.error("Error uploading files");
    return null;
  }
};

export const useUploadImages = () => {
  return useMutation({
    mutationFn: (file: File | File[]) => uploadFiles({ file, type: "image" }),
    onError: (error) => {
      toast.error("Error uploading image(s)");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Image(s) uploaded successfully!");
    },
  });
};

export const useUploadFiles = () => {
  return useMutation<
    CloudinaryFileResponseType | CloudinaryFileResponseType[] | null,
    Error,
    File | File[]
  >({
    mutationFn: (file) => uploadFiles({ file, type: "raw" }),
    onError: (error) => {
      toast.error("Error uploading file(s)");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("File(s) uploaded successfully!");
    },
  });
};
